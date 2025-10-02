import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Service } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Icon } from '../common/Icon';

interface EditServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: Service;
    onSave: (service: Service) => void;
    onDelete: (serviceId: string) => void;
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        {...props}
        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
     <textarea 
        {...props}
        rows={3}
        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
);

const Label: React.FC<{htmlFor: string, children: React.ReactNode}> = ({htmlFor, children}) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1">{children}</label>
)


const EditServiceModal: React.FC<EditServiceModalProps> = ({ isOpen, onClose, service, onSave, onDelete }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Service>(service);

    useEffect(() => {
        setFormData(service);
    }, [service]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'duration' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleDelete = () => {
        if (window.confirm(t('portfolio.deleteConfirm'))) {
            onDelete(service.id);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('portfolio.editService')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">{t('portfolio.serviceName')}</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="description">{t('portfolio.serviceDescription')}</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="category">{t('portfolio.serviceCategory')}</Label>
                    <Input id="category" name="category" value={formData.category || ''} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="duration">{t('portfolio.duration')} ({t('portfolio.minutes')})</Label>
                        <Input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="price">{t('portfolio.price')} ({t('portfolio.currency')})</Label>
                        <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 mt-2 border-t">
                    <Button type="button" variant="outline" onClick={handleDelete} className="!border-red-500 !text-red-500 hover:!bg-red-50 !px-4 !py-2">
                         <Icon name="trash" className="w-4 h-4 mr-2" />
                        {t('portfolio.deleteService')}
                    </Button>
                    <Button type="submit">
                        {t('portfolio.saveChanges')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditServiceModal;
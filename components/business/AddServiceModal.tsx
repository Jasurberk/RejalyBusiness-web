import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Service } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface AddServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (service: Omit<Service, 'id'>) => void;
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

const initialServiceState: Omit<Service, 'id'> = {
    name: '',
    description: '',
    category: '',
    duration: 30,
    price: 50000,
};

const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, onClose, onAdd }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState(initialServiceState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'duration' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        setFormData(initialServiceState); // Reset form
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('portfolio.addServiceTitle')}>
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
                        <Input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} required min="0" />
                    </div>
                    <div>
                        <Label htmlFor="price">{t('portfolio.price')} ({t('portfolio.currency')})</Label>
                        <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" />
                    </div>
                </div>
                
                <div className="flex justify-end pt-4 mt-2 border-t">
                    <Button type="submit">
                        {t('portfolio.addService')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddServiceModal;
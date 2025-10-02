import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Client } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface AddClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (client: Omit<Client, 'id' | 'avatarUrl' | 'firstAppointment' | 'lastAppointment' | 'totalAppointments'>) => void;
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        {...props}
        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
);

const Label: React.FC<{htmlFor: string, children: React.ReactNode}> = ({htmlFor, children}) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1">{children}</label>
)

type FormData = Omit<Client, 'id' | 'avatarUrl' | 'firstAppointment' | 'lastAppointment' | 'totalAppointments'>;

const initialClientState: FormData = {
    name: '',
    surname: '',
    phone: '',
    email: '',
};

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onAdd }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>(initialClientState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        setFormData(initialClientState); // Reset form
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('portfolio.addClient')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">{t('portfolio.clientFirstName')}</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                     <div>
                        <Label htmlFor="surname">{t('portfolio.clientSurname')}</Label>
                        <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <Label htmlFor="phone">{t('portfolio.clientPhone')}</Label>
                    <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                 <div>
                    <Label htmlFor="email">{t('portfolio.clientEmail')}</Label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex justify-end pt-4 mt-2 border-t">
                    <Button type="submit">
                        {t('portfolio.add')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddClientModal;
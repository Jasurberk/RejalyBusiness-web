import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../common/Modal';
import Button from '../common/Button';

const PasswordInput: React.FC<{ id: string, name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ id, name, label, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1">
            <input
                type="password"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                required
                className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
    </div>
);

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("New passwords do not match!");
            return;
        }
        console.log("Changing password...");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('profile.settings.changePasswordTitle')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <PasswordInput id="current-password" name="current" label={t('profile.settings.currentPassword')} value={passwords.current} onChange={handleChange} />
                <PasswordInput id="new-password" name="new" label={t('profile.settings.newPassword')} value={passwords.new} onChange={handleChange} />
                <PasswordInput id="confirm-password" name="confirm" label={t('profile.settings.confirmPassword')} value={passwords.confirm} onChange={handleChange} />
                <div className="flex justify-end pt-4 mt-2 border-t space-x-2">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        {t('common.cancel')}
                    </Button>
                    <Button type="submit">
                        {t('profile.settings.saveChanges')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ChangePasswordModal;
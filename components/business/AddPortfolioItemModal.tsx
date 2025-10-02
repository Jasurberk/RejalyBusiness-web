import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { PortfolioItem } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface AddPortfolioItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (item: Omit<PortfolioItem, 'id'>) => void;
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

type FormData = Omit<PortfolioItem, 'id'>;

const initialState: FormData = {
    imageUrl: '',
    caption: ''
};

const AddPortfolioItemModal: React.FC<AddPortfolioItemModalProps> = ({ isOpen, onClose, onAdd }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            ...formData,
            // Simulate image upload with a random picsum photo if URL is empty
            imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Math.random()}/500/600`
        });
        setFormData(initialState);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('portfolio.addPortfolioItem')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="imageUrl">{t('portfolio.imageUrl')}</Label>
                    <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
                </div>
                <div>
                    <Label htmlFor="caption">{t('portfolio.caption')}</Label>
                    <Input id="caption" name="caption" value={formData.caption} onChange={handleChange} required />
                </div>
                <div className="flex justify-end pt-4 mt-2 border-t">
                    <Button type="submit">
                        {t('portfolio.upload')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddPortfolioItemModal;
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { PortfolioItem } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Icon } from '../common/Icon';

interface EditPortfolioItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: PortfolioItem;
    onSave: (item: PortfolioItem) => void;
    onDelete: (itemId: string) => void;
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

const EditPortfolioItemModal: React.FC<EditPortfolioItemModalProps> = ({ isOpen, onClose, item, onSave, onDelete }) => {
    const { t } = useTranslation();
    const [caption, setCaption] = useState(item.caption);

    useEffect(() => {
        setCaption(item.caption);
    }, [item]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...item, caption });
    };

    const handleDelete = () => {
        if (window.confirm(t('portfolio.deletePortfolioConfirm'))) {
            onDelete(item.id);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('portfolio.editPortfolioItem')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <img src={item.imageUrl} alt={item.caption} className="rounded-lg w-full max-h-64 object-contain mb-4 bg-slate-100" />
                <div>
                    <Label htmlFor="caption">{t('portfolio.caption')}</Label>
                    <Input id="caption" name="caption" value={caption} onChange={(e) => setCaption(e.target.value)} required />
                </div>
                
                <div className="flex justify-between items-center pt-4 mt-2 border-t">
                    <Button type="button" variant="outline" onClick={handleDelete} className="!border-red-500 !text-red-500 hover:!bg-red-50 !px-4 !py-2">
                         <Icon name="trash" className="w-4 h-4 mr-2" />
                        {t('portfolio.deletePortfolioItem')}
                    </Button>
                    <Button type="submit">
                        {t('portfolio.saveChanges')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditPortfolioItemModal;
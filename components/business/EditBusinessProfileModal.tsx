import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Business } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Icon } from '../common/Icon';

// Reusable form components
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        {...props}
        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
     <textarea 
        {...props}
        rows={4}
        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
);

const Label: React.FC<{htmlFor: string, children: React.ReactNode}> = ({htmlFor, children}) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1">{children}</label>
)

interface EditBusinessProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    business: Business;
    onSave: (business: Business) => void;
}

const EditBusinessProfileModal: React.FC<EditBusinessProfileModalProps> = ({ isOpen, onClose, business, onSave }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Business>(business);

    useEffect(() => {
        setFormData(business);
    }, [business, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [name]: value,
            },
        }));
    };

    const handleWorkingHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            workingHours: {
                ...prev.workingHours,
                [name]: value,
            },
        }));
    };

    const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, coverPhotoUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('profile.business.editModal.title')} size="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="max-h-[65vh] overflow-y-auto p-1 pr-4 space-y-6">
                    {/* Cover Photo Uploader */}
                    <fieldset>
                        <legend className="text-lg font-medium text-slate-900 mb-2">{t('profile.business.editModal.coverPhoto')}</legend>
                        <div className="relative group h-40 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${formData.coverPhotoUrl})` }}>
                            <label htmlFor="cover-photo-upload" className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                                <Icon name="edit" className="w-6 h-6 mb-1" />
                                <span className="font-semibold text-sm">{t('profile.business.editModal.changeCoverPhoto')}</span>
                            </label>
                            <input 
                                id="cover-photo-upload" 
                                type="file" 
                                className="hidden" 
                                accept="image/png, image/jpeg, image/webp" 
                                onChange={handleCoverPhotoChange} 
                            />
                        </div>
                    </fieldset>

                    {/* General Info */}
                    <fieldset>
                        <legend className="text-lg font-medium text-slate-900 mb-2">{t('profile.business.editModal.generalInfo')}</legend>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">{t('profile.business.editModal.businessName')}</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                             <div>
                                <Label htmlFor="description">{t('profile.business.editModal.description')}</Label>
                                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                            </div>
                        </div>
                    </fieldset>

                    {/* Contact Info */}
                    <fieldset>
                        <legend className="text-lg font-medium text-slate-900 mb-2">{t('profile.business.contactInfo')}</legend>
                         <div className="space-y-4">
                            <div>
                                <Label htmlFor="address">{t('profile.business.address')}</Label>
                                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="phone">{t('profile.business.phone')}</Label>
                                    <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="email">{t('profile.business.email')}</Label>
                                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    
                     {/* Social Media */}
                    <fieldset>
                        <legend className="text-lg font-medium text-slate-900 mb-2">{t('profile.business.socialMedia')}</legend>
                         <div className="space-y-4">
                            <div>
                                <Label htmlFor="instagram">{t('profile.business.editModal.instagramUrl')}</Label>
                                <Input id="instagram" name="instagram" value={formData.socialMedia.instagram || ''} onChange={handleSocialChange} placeholder="https://instagram.com/..."/>
                            </div>
                            <div>
                                <Label htmlFor="facebook">{t('profile.business.editModal.facebookUrl')}</Label>
                                <Input id="facebook" name="facebook" value={formData.socialMedia.facebook || ''} onChange={handleSocialChange} placeholder="https://facebook.com/..."/>
                            </div>
                             <div>
                                <Label htmlFor="telegram">{t('profile.business.editModal.telegramUrl')}</Label>
                                <Input id="telegram" name="telegram" value={formData.socialMedia.telegram || ''} onChange={handleSocialChange} placeholder="https://t.me/..."/>
                            </div>
                        </div>
                    </fieldset>

                     {/* Working Hours */}
                    <fieldset>
                        <legend className="text-lg font-medium text-slate-900 mb-2">{t('profile.business.workingHours')}</legend>
                         <div className="space-y-4">
                            {Object.keys(formData.workingHours).map(day => (
                                <div key={day} className="grid grid-cols-2 gap-4 items-center">
                                    <label htmlFor={`hours-${day}`} className="font-medium text-sm text-slate-700">{day}</label>
                                    <Input 
                                        id={`hours-${day}`} 
                                        name={day} 
                                        value={formData.workingHours[day]}
                                        onChange={handleWorkingHoursChange} 
                                        placeholder="e.g. 9:00 AM - 9:00 PM or Closed"
                                    />
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 mt-2 border-t">
                    <Button type="button" variant="secondary" onClick={onClose} className="mr-3">
                        {t('common.cancel')}
                    </Button>
                    <Button type="submit">
                        {t('portfolio.saveChanges')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditBusinessProfileModal;
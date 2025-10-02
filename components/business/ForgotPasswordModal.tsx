import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Icon } from '../common/Icon';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    phone?: string;
}

const maskEmail = (email: string): string => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const [name, domain] = parts;
    if (name.length <= 3) {
        return `${name[0]}**@${domain}`;
    }
    return `${name.substring(0, 2)}****${name.substring(name.length - 1)}@${domain}`;
};

const maskPhone = (phone: string): string => {
    const cleaned = phone.replace(/\s/g, ''); // +998901234567
    if (cleaned.length < 8) return '****'; 
    const countryCode = cleaned.substring(0, 4); // +998
    const operator = cleaned.substring(4, 6); // 90
    const lastDigits = cleaned.substring(cleaned.length - 2); // 67
    return `${countryCode} ${operator} *** ** ${lastDigits}`;
};


const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, email, phone }) => {
    const { t } = useTranslation();
    const [isSent, setIsSent] = useState(false);
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [sentTo, setSentTo] = useState<'email' | 'phone' | null>(null);

    const handleSendLink = () => {
        console.log(`Sending reset link to ${method}: ${method === 'email' ? email : phone}`);
        setSentTo(method);
        setIsSent(true);
        setTimeout(() => {
            onClose();
            // Reset state for next time modal opens, after close animation
            setTimeout(() => {
                setIsSent(false);
                setSentTo(null);
            }, 300); 
        }, 2000);
    };

    const handleClose = () => {
        setIsSent(false);
        setSentTo(null);
        setMethod('email'); // Reset to default
        onClose();
    }
    
    const MethodOption: React.FC<{ type: 'email' | 'phone', value: string }> = ({ type, value }) => (
        <div 
            onClick={() => setMethod(type)} 
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${method === type ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-300 hover:border-slate-400'}`}
        >
            <div className="flex-shrink-0">
                <Icon name={type === 'email' ? 'message-square' : 'phone'} className={`w-6 h-6 ${method === type ? 'text-blue-600' : 'text-slate-500'}`} />
            </div>
            <div className="ml-3 flex-grow">
                <p className="font-semibold text-slate-800">{t(`profile.settings.${type}Option`)}</p>
                <p className="text-sm text-slate-500">{type === 'email' ? maskEmail(value) : maskPhone(value)}</p>
            </div>
            <div className="ml-auto">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === type ? 'border-blue-600 bg-blue-600' : 'border-slate-400'}`}>
                    {method === type && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
            </div>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={t('profile.settings.forgotPasswordTitle')}>
            {isSent ? (
                <div className="text-center py-4">
                    <p className="text-lg font-medium text-green-600">{t('profile.settings.resetLinkSent')}</p>
                    <p className="text-slate-500 mt-2">
                         {sentTo === 'email' ? t('profile.settings.checkYourEmail') : t('profile.settings.checkYourPhone')}
                    </p>
                </div>
            ) : (
                <div>
                    <p className="text-sm text-slate-600 mb-4">
                        {t('profile.settings.forgotPasswordChooseMethod')}
                    </p>
                    <div className="space-y-3">
                        <MethodOption type="email" value={email} />
                        {phone && <MethodOption type="phone" value={phone} />}
                    </div>
                    <div className="flex justify-end pt-6 mt-4 border-t space-x-2">
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            {t('common.cancel')}
                        </Button>
                        <Button onClick={handleSendLink}>
                            {t('profile.settings.sendResetLink')}
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ForgotPasswordModal;
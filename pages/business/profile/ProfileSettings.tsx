import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { Icon } from '../../../components/common/Icon';
import ChangePasswordModal from '../../../components/business/ChangePasswordModal';
import ForgotPasswordModal from '../../../components/business/ForgotPasswordModal';

const InfoRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 text-sm text-slate-900">{value || 'N/A'}</dd>
    </div>
);

const SettingsActionRow: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors text-left group"
    >
        <span className="font-medium text-slate-700">{label}</span>
        <Icon name="chevron-down" className="w-5 h-5 text-slate-400 -rotate-90 group-hover:text-slate-600 transition-colors" />
    </button>
);


const ProfileSettings: React.FC = () => {
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);

    if (!currentUser) return null;

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-800">{t('profile.settings.title')}</h1>
            
            {/* Personal Information Card */}
            <Card className="!shadow-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <img className="w-20 h-20 rounded-full object-cover" src={currentUser.avatarUrl} alt={`${currentUser.name} ${currentUser.surname}`} />
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{currentUser.name} {currentUser.surname}</h2>
                                <p className="text-slate-500">{currentUser.role === 'business' ? 'Business Owner' : 'User'}</p>
                            </div>
                        </div>
                        <Button variant="outline" className="!px-3 !py-1 !text-sm">
                            <Icon name="edit" className="w-4 h-4 mr-1.5" />
                            {t('profile.settings.edit')}
                        </Button>
                    </div>

                    <div className="border-t pt-6">
                         <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            <InfoRow label={t('profile.settings.phone')} value={currentUser.phone} />
                            <InfoRow label={t('profile.settings.email')} value={currentUser.email} />
                            <InfoRow label={t('profile.settings.birthday')} value={currentUser.birthday} />
                            <InfoRow label={t('profile.settings.gender')} value={currentUser.gender ? t(`profile.settings.genders.${currentUser.gender}`) : 'N/A'} />
                        </dl>
                    </div>
                </div>
            </Card>

            {/* Security Card */}
             <Card className="!shadow-lg">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">{t('profile.settings.security')}</h2>
                    <div className="divide-y divide-slate-200 -mx-4">
                        <SettingsActionRow 
                            label={t('profile.settings.changePassword')} 
                            onClick={() => setChangePasswordModalOpen(true)}
                        />
                        <SettingsActionRow 
                            label={t('profile.settings.forgotPassword')}
                            onClick={() => setForgotPasswordModalOpen(true)}
                        />
                    </div>
                </div>
            </Card>

            <ChangePasswordModal 
                isOpen={isChangePasswordModalOpen}
                onClose={() => setChangePasswordModalOpen(false)}
            />
            <ForgotPasswordModal
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setForgotPasswordModalOpen(false)}
                email={currentUser.email}
                phone={currentUser.phone}
            />
        </div>
    );
};

export default ProfileSettings;
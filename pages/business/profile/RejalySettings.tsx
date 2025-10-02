import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../../components/common/Card';
import { Icon } from '../../../components/common/Icon';
import type { IconName } from '../../../types';

const SettingsItem: React.FC<{ icon: IconName; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50">
    <div className="flex-shrink-0 mt-1">
        <Icon name={icon} className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h3 className="text-md font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  </div>
);

const RejalySettings: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-800">{t('profile.rejaly.title')}</h1>
            
            <Card className="!shadow-lg">
                <div className="p-4">
                    <div className="divide-y divide-slate-200">
                        <SettingsItem
                            icon="credit-card"
                            title={t('profile.rejaly.payments.title')}
                            description={t('profile.rejaly.payments.description')}
                        />
                        <SettingsItem
                            icon="calendar"
                            title={t('profile.rejaly.calendar.title')}
                            description={t('profile.rejaly.calendar.description')}
                        />
                        <SettingsItem
                            icon="file-text"
                            title={t('profile.rejaly.agreement.title')}
                            description={t('profile.rejaly.agreement.description')}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RejalySettings;

import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../../components/common/Card';
import { Icon } from '../../../components/common/Icon';
import type { IconName } from '../../../types';

const SupportItem: React.FC<{ icon: IconName; title: string; description: string }> = ({ icon, title, description }) => (
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

const SupportHelp: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-800">{t('profile.support.title')}</h1>
            
            <Card className="!shadow-lg">
                 <div className="p-4">
                    <div className="divide-y divide-slate-200">
                        <SupportItem
                            icon="help-circle"
                            title={t('profile.support.faq.title')}
                            description={t('profile.support.faq.description')}
                        />
                        <SupportItem
                            icon="message-square"
                            title={t('profile.support.contact.title')}
                            description={t('profile.support.contact.description')}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SupportHelp;

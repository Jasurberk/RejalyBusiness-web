import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { IconName } from '../../types';
import { Icon } from '../../components/common/Icon';
import BusinessProfile from './profile/BusinessProfile';
import ProfileSettings from './profile/ProfileSettings';
import RejalySettings from './profile/RejalySettings';
import SupportHelp from './profile/SupportHelp';

type ProfileTab = 'business' | 'settings' | 'rejaly' | 'support';

const ProfilePage: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<ProfileTab>('business');

    const navItems: { id: ProfileTab; label: string; icon: IconName }[] = [
        { id: 'business', label: t('profile.nav.businessProfile'), icon: 'user' },
        { id: 'settings', label: t('profile.nav.profileSettings'), icon: 'settings' },
        { id: 'rejaly', label: t('profile.nav.rejalySettings'), icon: 'sliders' },
        { id: 'support', label: t('profile.nav.support'), icon: 'life-buoy' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'business': return <BusinessProfile />;
            case 'settings': return <ProfileSettings />;
            case 'rejaly': return <RejalySettings />;
            case 'support': return <SupportHelp />;
            default: return <BusinessProfile />;
        }
    };

    return (
        <div className="bg-slate-100 min-h-[calc(100vh-64px)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-1/4 lg:w-1/5 md:sticky md:top-24">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <nav className="flex flex-col space-y-2">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                                            activeTab === item.id
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        <Icon name={item.icon} className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow w-full md:w-3/4 lg:w-4/5">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

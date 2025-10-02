import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import type { IconName } from '../../types';

interface HomePageProps {
    onGetStartedClick: () => void;
}

const FeatureCard: React.FC<{ icon: IconName; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
        <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-100 text-blue-600 rounded-full p-4">
                <Icon name={icon} className="w-8 h-8" />
            </div>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{children}</p>
    </div>
);

const ServiceCard: React.FC<{ icon: IconName, name: string }> = ({ icon, name }) => (
     <div className="bg-slate-100 p-4 rounded-lg flex items-center space-x-4 transition-transform hover:scale-105">
        <Icon name={icon} className="w-7 h-7 text-blue-600"/>
        <span className="font-semibold text-slate-700">{name}</span>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ onGetStartedClick }) => {
    const { t } = useTranslation();

    const serviceCategories: { name: string; icon: IconName }[] = [
        { name: t('home.services.barber'), icon: 'scissors' },
        { name: t('home.services.hairSalon'), icon: 'scissors' },
        { name: t('home.services.nailSalon'), icon: 'nail-polish' },
        { name: t('home.services.spa'), icon: 'spa' },
        { name: t('home.services.dentist'), icon: 'tooth' },
        { name: t('home.services.football'), icon: 'soccer-ball' },
        { name: t('home.services.gaming'), icon: 'gamepad' },
        { name: t('home.services.others'), icon: 'plus-circle' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center bg-fixed"
                style={{backgroundImage: "url('https://picsum.photos/seed/home_hero/1920/1080')"}}
            >
                <div className="absolute inset-0 bg-slate-900 bg-opacity-60"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 md:py-32">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                        {t('home.heroTitle')}
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-200">
                        {t('home.heroSubtitle')}
                    </p>
                    <div className="mt-10">
                        <Button onClick={onGetStartedClick} className="!px-10 !py-4 !text-lg">
                            {t('home.getStarted')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard icon="calendar" title={t('home.features.scheduling.title')}>
                            {t('home.features.scheduling.description')}
                        </FeatureCard>
                         <FeatureCard icon="user" title={t('home.features.clients.title')}>
                            {t('home.features.clients.description')}
                        </FeatureCard>
                         <FeatureCard icon="star" title={t('home.features.growth.title')}>
                            {t('home.features.growth.description')}
                        </FeatureCard>
                    </div>
                </div>
            </div>
            
            {/* Service Categories Section */}
            <div className="py-20 bg-white">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold text-slate-800">{t('home.services.title')}</h2>
                         <p className="mt-2 text-slate-500 max-w-xl mx-auto">{t('home.services.subtitle')}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {serviceCategories.map((service, index) => (
                            <ServiceCard key={index} name={service.name} icon={service.icon} />
                        ))}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default HomePage;
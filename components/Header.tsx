import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Icon } from './common/Icon';
import LanguageSwitcher from './common/LanguageSwitcher';
import Button from './common/Button';
import { MOCK_BUSINESS_DATA } from '../constants';

interface HeaderProps {
    onLogoClick: () => void;
    onDashboardClick: () => void;
    onScheduleClick: () => void;
    onPortfolioClick: () => void;
    onProfileClick: () => void;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onDashboardClick, onScheduleClick, onPortfolioClick, onProfileClick, onLoginClick }) => {
    const { currentUser, logout } = useAuth();
    const { t } = useTranslation();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const BusinessNav: React.FC = () => (
        <div className="hidden md:flex items-center space-x-6">
            <button onClick={onDashboardClick} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                {t('header.dashboard')}
            </button>
            <button onClick={onScheduleClick} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                {t('header.mySchedule')}
            </button>
            <button onClick={onPortfolioClick} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                {t('header.myPortfolio')}
            </button>
        </div>
    );

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={onLogoClick}>
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-blue-600 leading-tight">Rejaly.uz</span>
                                <span className="text-sm font-medium text-slate-500 tracking-wider -mt-1">Business</span>
                            </div>
                        </button>
                    </div>

                    {currentUser && <BusinessNav />}

                    <div className="flex items-center space-x-2 md:space-x-4">
                        <LanguageSwitcher />
                        
                        {currentUser ? (
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
                                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                                    <div className="hidden md:flex flex-col items-start text-left">
                                      <span className="font-medium text-slate-700 text-sm leading-tight">{currentUser.name} {currentUser.surname}</span>
                                      <span className="text-xs text-slate-500 leading-tight">{MOCK_BUSINESS_DATA.name}</span>
                                    </div>
                                    <Icon name="chevron-down" className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg transition-all duration-200 z-20 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                    <div className="px-4 py-3 border-b md:hidden">
                                        <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.name} {currentUser.surname}</p>
                                        <p className="text-xs text-slate-500 truncate">{MOCK_BUSINESS_DATA.name}</p>
                                    </div>
                                    <div className="py-1">
                                        <div className="md:hidden">
                                            <button onClick={onDashboardClick} className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">{t('header.dashboard')}</button>
                                            <button onClick={onScheduleClick} className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">{t('header.mySchedule')}</button>
                                            <button onClick={onPortfolioClick} className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">{t('header.myPortfolio')}</button>
                                        </div>
                                        <button onClick={onProfileClick} className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">{t('header.myProfile')}</button>
                                    </div>
                                    <div className="py-1 border-t">
                                        <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-slate-100">{t('header.logout')}</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                           <Button onClick={onLoginClick} variant="outline" className="hidden md:block !py-1.5 !px-4">
                                {t('header.login')}
                           </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
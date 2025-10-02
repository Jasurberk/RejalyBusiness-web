import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';

const languages = {
    en: { nativeName: 'English' },
    ru: { nativeName: 'Русский' },
    uz: { nativeName: 'O‘zbekcha' }
};

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const currentLang = i18n.resolvedLanguage || 'en';

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Change language"
            >
                <Icon name="globe" className="w-5 h-5" />
                <span className="font-semibold text-sm">{currentLang.toUpperCase()}</span>
            </button>
            {isOpen && (
                 <div 
                    className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-20"
                    onMouseLeave={() => setIsOpen(false)}
                 >
                    {Object.keys(languages).map((lng) => (
                        <button
                            key={lng}
                            type="button"
                            onClick={() => changeLanguage(lng)}
                            disabled={i18n.resolvedLanguage === lng}
                            className={`w-full text-left px-4 py-2 text-sm ${i18n.resolvedLanguage === lng ? 'font-semibold text-blue-600' : 'text-slate-700'} hover:bg-slate-100 disabled:bg-slate-100 disabled:cursor-default`}
                        >
                            {languages[lng as keyof typeof languages].nativeName}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
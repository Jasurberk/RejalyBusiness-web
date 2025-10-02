
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-blue-600">Rejaly</h3>
            <p className="text-slate-500 mt-1">{t('footer.subtitle')}</p>
          </div>
          <div className="flex space-x-6 text-slate-500">
            <a href="#" className="hover:text-blue-600">{t('footer.about')}</a>
            <a href="#" className="hover:text-blue-600">{t('footer.careers')}</a>
            <a href="#" className="hover:text-blue-600">{t('footer.press')}</a>
            <a href="#" className="hover:text-blue-600">{t('footer.contact')}</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
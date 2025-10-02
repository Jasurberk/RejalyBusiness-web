import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../../components/common/Icon';
import type { IconName } from '../../types';

interface AuthModalProps {
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input 
        {...props}
        className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
);

const SocialButton: React.FC<{ icon: IconName; children: React.ReactNode }> = ({ icon, children }) => (
  <button className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
      <Icon name={icon} className="w-5 h-5 mr-2" />
      <span className="font-semibold text-sm">{children}</span>
  </button>
);


const LoginForm: React.FC<{setView: (view: 'signup') => void}> = ({setView}) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('business@rejaly.uz');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const { login } = useAuth();
    // This is a bit of a hack to get onClose, but it's okay for now.
    // In a real app this would be in context or passed down.
    const { onClose } = React.useContext(AuthModalContext);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      const success = login(email);
      if (success) {
        onClose();
      } else {
        setError(t('auth.error'));
      }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="mb-6 text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{t('auth.signInTitle')}</h2>
                <p className="mt-2 text-sm text-slate-500">
                {t('auth.businessSignInPrompt')}
                </p>
            </div>
        
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</p>}
                
                <div>
                    <InputField id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('auth.emailLabel')} />
                </div>
                <div>
                    <InputField id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.passwordLabel')} />
                </div>
                
                <div>
                    <Button type="submit" className="w-full justify-center !py-3 !mt-2">
                    {t('auth.signIn')}
                    </Button>
                </div>
            </form>

            <div className="flex items-center my-6">
                <hr className="flex-grow border-slate-200" />
                <span className="mx-4 text-xs font-medium text-slate-400 uppercase">{t('auth.or')}</span>
                <hr className="flex-grow border-slate-200" />
            </div>

            <div className="space-y-3">
                <SocialButton icon="google">{t('auth.continueWithGoogle')}</SocialButton>
                <SocialButton icon="apple">{t('auth.continueWithApple')}</SocialButton>
                <SocialButton icon="facebook">{t('auth.continueWithMeta')}</SocialButton>
            </div>
            
             <p className="text-center text-sm text-slate-500 mt-6">
                {t('auth.noAccount')}{' '}
                <button onClick={() => setView('signup')} className="font-semibold text-blue-600 hover:underline">
                    {t('auth.signUp')}
                </button>
            </p>
        </div>
    )
}

const SignupForm: React.FC<{setView: (view: 'login') => void}> = ({setView}) => {
    const { t } = useTranslation();
    const { onClose } = React.useContext(AuthModalContext);
    const serviceCategories = ['barber', 'hairSalon', 'nailSalon', 'spa', 'dentist', 'football', 'gaming', 'others'];
    
    const handleSignupSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Placeholder for signup logic
      console.log("Signing up...");
      onClose(); // Close on success for now
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-6 text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{t('auth.signUpTitle')}</h2>
                <p className="mt-2 text-sm text-slate-500">{t('auth.signUpSubtitle')}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
                <SocialButton icon="google">{t('auth.google')}</SocialButton>
                <SocialButton icon="apple">{t('auth.apple')}</SocialButton>
                <SocialButton icon="facebook">{t('auth.meta')}</SocialButton>
            </div>
            
            <div className="flex items-center my-6">
                <hr className="flex-grow border-slate-200" />
                <span className="mx-4 text-xs font-medium text-slate-400 uppercase">{t('auth.or')}</span>
                <hr className="flex-grow border-slate-200" />
            </div>
            
            <form onSubmit={handleSignupSubmit} className="space-y-4">
                <InputField name="businessName" placeholder={t('auth.businessName')} required />
                <InputField name="businessAddress" placeholder={t('auth.businessAddress')} required />
                
                <select name="serviceType" defaultValue="" required className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option value="" disabled>{t('auth.selectServiceType')}</option>
                    {serviceCategories.map(cat => (
                        <option key={cat} value={cat}>{t(`home.services.${cat}`)}</option>
                    ))}
                </select>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField name="name" placeholder={t('auth.yourName')} required />
                    <InputField name="surname" placeholder={t('auth.yourSurname')} required />
                </div>
                
                <InputField type="email" name="email" placeholder={t('auth.emailLabel')} required />
                <InputField type="tel" name="phone" placeholder={t('auth.phoneNumber')} required />
                
                <div className="relative">
                    <InputField type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} name="birthday" placeholder={t('auth.birthday')} required className="placeholder-slate-400"/>
                </div>


                <Button type="submit" className="w-full justify-center !py-3 !mt-2">
                    {t('auth.signUp')}
                </Button>
            </form>
            <p className="text-center text-sm text-slate-500 mt-6">
                {t('auth.hasAccount')}{' '}
                <button onClick={() => setView('login')} className="font-semibold text-blue-600 hover:underline">
                {t('auth.signIn')}
                </button>
            </p>
        </div>
    );
}

const AuthModalContext = React.createContext({ onClose: () => {} });

const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView);
  
  const handleEsc = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  return (
    <AuthModalContext.Provider value={{onClose}}>
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
          {/* Left Panel - Image */}
          <div 
            className="hidden md:block w-1/2 bg-cover bg-center" 
            style={{backgroundImage: "url('https://picsum.photos/seed/auth_bg/800/1200')"}}
          />

          {/* Right Panel - Form */}
          <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 relative flex flex-col overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
              <Icon name="x" className="w-6 h-6" />
            </button>
            <div className="my-auto w-full">
              {view === 'login' ? <LoginForm setView={setView} /> : <SignupForm setView={setView} />}
            </div>
          </div>
        </div>
      </div>
    </AuthModalContext.Provider>
  );
};

export default AuthModal;
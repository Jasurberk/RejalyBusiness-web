import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { BusinessPage } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardPage from './pages/business/DashboardPage';
import SchedulePage from './pages/business/SchedulePage';
import PortfolioPage from './pages/business/PortfolioPage';
import ProfilePage from './pages/business/ProfilePage';
import AuthModal from './pages/auth/AuthModal';
import HomePage from './pages/user/HomePage';

const AppContent: React.FC = () => {
    const { currentUser } = useAuth();
    const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; view: 'login' | 'signup' }>({ isOpen: false, view: 'login' });
    const { t } = useTranslation();

    const [businessPage, setBusinessPage] = useState<BusinessPage>('dashboard');
    const [view, setView] = useState<'home' | 'business'>('home');

    useEffect(() => {
        if (currentUser) {
            // When user logs in, default to business view.
            setView('business');
        } else {
            // When user logs out, go to home view.
            setView('home');
        }
    }, [currentUser]);

    const navigateToDashboard = useCallback(() => {
        setBusinessPage('dashboard');
        setView('business');
    }, []);
    const navigateToSchedule = useCallback(() => {
        setBusinessPage('schedule');
        setView('business');
    }, []);
    const navigateToPortfolio = useCallback(() => {
        setBusinessPage('portfolio');
        setView('business');
    }, []);
    const navigateToProfile = useCallback(() => {
        setBusinessPage('profile');
        setView('business');
    }, []);

    const openLoginModal = useCallback(() => setAuthModalState({ isOpen: true, view: 'login' }), []);
    const openSignupModal = useCallback(() => setAuthModalState({ isOpen: true, view: 'signup' }), []);
    const closeAuthModal = useCallback(() => setAuthModalState(prev => ({ ...prev, isOpen: false })), []);

    const handleLogoClick = useCallback(() => {
        setView('home');
    }, []);


    const renderBusinessPages = () => {
        switch (businessPage) {
            case 'schedule':
                return <SchedulePage />;
            case 'portfolio':
                return <PortfolioPage />;
            case 'profile':
                return <ProfilePage />;
            case 'dashboard':
            default:
                return <DashboardPage />;
        }
    };

    const shouldShowBusinessPages = currentUser && view === 'business';

    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-800">
            <Header
                onLogoClick={handleLogoClick}
                onDashboardClick={navigateToDashboard}
                onScheduleClick={navigateToSchedule}
                onPortfolioClick={navigateToPortfolio}
                onProfileClick={navigateToProfile}
                onLoginClick={openLoginModal}
            />
            <main className="flex-grow">
                {shouldShowBusinessPages ? renderBusinessPages() : <HomePage onGetStartedClick={openSignupModal} />}
            </main>
            <Footer />
            {authModalState.isOpen && <AuthModal onClose={closeAuthModal} initialView={authModalState.view} />}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
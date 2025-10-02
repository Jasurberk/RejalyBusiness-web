
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { MOCK_APPOINTMENTS } from '../../constants';
import StatCard from '../../components/business/StatCard';
import { Icon } from '../../components/common/Icon';
import Card from '../../components/common/Card';

const DashboardPage: React.FC = () => {
    const { currentUser } = useAuth();
    const { t } = useTranslation();
    
    return (
        <div className="bg-slate-100 min-h-[calc(100vh-64px)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{t('dashboard.welcome', { name: currentUser?.name })}</h1>
                <p className="text-slate-600 mb-8">{t('dashboard.subtitle')}</p>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard title={t('dashboard.statCards.appointments')} value={MOCK_APPOINTMENTS.filter(a => a.date === 'Today').length.toString()} icon={<Icon name="calendar" />} />
                    <StatCard title={t('dashboard.statCards.revenue')} value="260,000 UZS" icon={<Icon name="user" />} />
                    <StatCard title={t('dashboard.statCards.newClients')} value="1" icon={<Icon name="star" />} />
                </div>
                
                {/* Upcoming Appointments */}
                <Card className="!shadow-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">{t('dashboard.upcomingAppointments.title')}</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3">{t('dashboard.upcomingAppointments.time')}</th>
                                        <th className="px-6 py-3">{t('dashboard.upcomingAppointments.client')}</th>
                                        <th className="px-6 py-3">{t('dashboard.upcomingAppointments.service')}</th>
                                        <th className="px-6 py-3">{t('dashboard.upcomingAppointments.specialist')}</th>
                                        <th className="px-6 py-3">{t('dashboard.upcomingAppointments.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_APPOINTMENTS.filter(a => a.status === 'upcoming').map(appointment => (
                                        <tr key={appointment.id} className="border-b hover:bg-slate-100 odd:bg-white even:bg-slate-50/50">
                                            <td className="px-6 py-4 font-medium text-slate-900">{appointment.time}</td>
                                            <td className="px-6 py-4">{appointment.clientName}</td>
                                            <td className="px-6 py-4">{appointment.serviceName}</td>
                                            <td className="px-6 py-4">{appointment.staffName}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <button className="font-medium text-blue-600 hover:underline text-sm">{t('dashboard.upcomingAppointments.details')}</button>
                                                    <button className="font-medium text-red-600 hover:underline text-sm">{t('dashboard.upcomingAppointments.cancel')}</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
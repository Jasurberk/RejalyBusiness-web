import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MOCK_APPOINTMENTS, MOCK_BUSINESS_DATA, MOCK_CLIENTS } from '../../constants';
import { Icon } from '../../components/common/Icon';
import Button from '../../components/common/Button';
import AddAppointmentModal from '../../components/business/AddAppointmentModal';
import type { Appointment, Service } from '../../types';

type ViewMode = 'day' | 'month';

// Helper to get consistent colors for services
const serviceColorNames: { [key: string]: string } = {
    'Hair': 'blue',
    'Beard': 'green',
    'Combo': 'purple',
    'default': 'slate'
};

const colorClassMap: { [key: string]: { bg: string; border: string; text: string; subtext: string } } = {
    blue: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', subtext: 'text-blue-600' },
    green: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800', subtext: 'text-green-600' },
    purple: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-800', subtext: 'text-purple-600' },
    slate: { bg: 'bg-slate-100', border: 'border-slate-500', text: 'text-slate-800', subtext: 'text-slate-600' },
};

const getServiceColorName = (serviceName: string, services: Service[]): string => {
    const service = services.find(s => s.name === serviceName);
    const category = service?.category;
    if (category && serviceColorNames[category]) {
        return serviceColorNames[category];
    }
    return serviceColorNames['default'];
};

const MonthView: React.FC<{
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    setViewMode: (mode: ViewMode) => void;
    appointments: Appointment[];
}> = ({ currentDate, setCurrentDate, setViewMode, appointments }) => {
    const { t, i18n } = useTranslation();
    const [displayDate, setDisplayDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

    const goToPreviousMonth = () => setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const goToNextMonth = () => setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    
    const appointmentsByDay = useMemo(() => {
        return appointments.reduce((acc, app) => {
            const date = app.date;
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [appointments]);

    const handleDayClick = (day: number) => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
        setCurrentDate(newDate);
        setViewMode('day');
    };

    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays = [];
    // Previous month's days
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(<div key={`prev-${i}`} className="p-2 border bg-slate-50 text-slate-400">
            {daysInPrevMonth - firstDayOfMonth + 1 + i}
        </div>);
    }
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = new Date(year, month, day).toISOString().split('T')[0];
        const appointmentCount = appointmentsByDay[dateStr] || 0;
        const isToday = new Date(year, month, day).toDateString() === new Date().toDateString();

        calendarDays.push(
            <button key={day} onClick={() => handleDayClick(day)} className="p-2 border text-left align-top hover:bg-blue-50 transition-colors">
                <span className={`font-semibold ${isToday ? 'text-blue-600' : ''}`}>{day}</span>
                {appointmentCount > 0 && (
                     <div className="text-xs mt-1 text-green-700">
                         {t('schedule.appointmentCount', { count: appointmentCount, lng: i18n.language })}
                    </div>
                )}
            </button>
        );
    }
    // Next month's days
    const totalCells = 42; // 6 weeks for consistency
    const remainingCells = totalCells - calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
        calendarDays.push(<div key={`next-${i}`} className="p-2 border bg-slate-50 text-slate-400">{i}</div>);
    }

    return (
        <div>
            <div className="flex items-center justify-between p-4 border-b">
                <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-slate-100"><Icon name="arrow-left" className="w-5 h-5" /></button>
                <h2 className="font-semibold text-lg">{displayDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</h2>
                <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-slate-100"><Icon name="arrow-left" className="w-5 h-5 rotate-180" /></button>
            </div>
            <div className="grid grid-cols-7 text-center font-medium text-sm text-slate-600 border-b">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 h-[calc(6*80px)]">{calendarDays}</div>
        </div>
    );
};


const SchedulePage: React.FC = () => {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<ViewMode>('day');
    const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const goToPreviousDay = () => setCurrentDate(prev => { const d = new Date(prev); d.setDate(d.getDate() - 1); return d; });
    const goToNextDay = () => setCurrentDate(prev => { const d = new Date(prev); d.setDate(d.getDate() + 1); return d; });
    const goToToday = () => setCurrentDate(new Date());

    const timeToMinutes = (time: string): number => {
        const [hourMinute, period] = time.split(' ');
        let [hourStr, minuteStr] = hourMinute.split(':');
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);

        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        return hour * 60 + minute;
    }

    const handleAddAppointment = (newAppointment: Appointment) => {
        setAppointments(prev => [...prev, newAppointment].sort((a,b) => timeToMinutes(a.time) - timeToMinutes(b.time)));
        setAddModalOpen(false);
    };

    const ViewModeButton: React.FC<{ mode: ViewMode, label: string }> = ({ mode, label }) => (
        <button
            onClick={() => setViewMode(mode)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === mode ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
        >
            {t(`schedule.${label}`)}
        </button>
    );
    
    const dailyAppointments = useMemo(() => {
        const currentDayString = currentDate.toISOString().split('T')[0];
         return appointments
            .filter(a => a.date === currentDayString)
            .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    }, [appointments, currentDate]);

    return (
        <div className="bg-slate-100 min-h-[calc(100vh-64px)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">{t('schedule.title')}</h1>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <div className="flex items-center space-x-2 bg-white p-1 rounded-lg shadow-sm">
                            <ViewModeButton mode="day" label="day" />
                            <ViewModeButton mode="month" label="month" />
                        </div>
                         <Button onClick={() => setAddModalOpen(true)} className="!py-2 !px-4">
                            <Icon name="plus-circle" className="w-4 h-4 mr-2" />
                            {t('schedule.addAppointment')}
                        </Button>
                    </div>
                </div>

                {/* Calendar View */}
                <div className="bg-white rounded-lg shadow-lg">
                    {viewMode === 'day' && (
                        <>
                            <div className="flex items-center justify-between p-4 border-b">
                                <button onClick={goToPreviousDay} className="p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Previous day">
                                    <Icon name="arrow-left" className="w-5 h-5" />
                                </button>
                                <button onClick={goToToday} className="px-4 py-2 text-md font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                                    {currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                </button>
                                <button onClick={goToNextDay} className="p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Next day">
                                    <Icon name="arrow-left" className="w-5 h-5 rotate-180" />
                                </button>
                            </div>
                            <div className="flex" style={{ minHeight: 'calc(14 * 60px)' }}>
                                {/* Time Gutter */}
                                <div className="w-16 border-r text-sm text-center text-slate-500 flex-shrink-0">
                                    {Array.from({ length: 14 }, (_, i) => (
                                        <div key={i} className="h-[60px] relative -top-3 pt-3 border-b">
                                            <span className="bg-white px-1">
                                                {(i + 8) % 12 === 0 ? 12 : (i + 8) % 12} {i+8 >= 12 ? 'PM' : 'AM'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {/* Events */}
                                <div className="flex-1 grid grid-cols-1 relative">
                                    {Array.from({ length: 14 }, (_, i) => ( // Hour lines
                                        <div key={i} className="border-b h-[60px] border-slate-200"></div>
                                    ))}
                                    
                                    {dailyAppointments.length > 0 ? dailyAppointments.map(app => {
                                        const service = MOCK_BUSINESS_DATA.services.find(s => s.name === app.serviceName);
                                        const duration = service?.duration || 60;
                                        const top = (timeToMinutes(app.time) - (8 * 60));
                                        const height = duration;
                                        const colorName = getServiceColorName(app.serviceName, MOCK_BUSINESS_DATA.services);
                                        const colorClasses = colorClassMap[colorName];

                                        return (
                                            <div
                                                key={app.id}
                                                className={`absolute left-2 right-2 border-l-4 rounded-r-lg p-2 ${colorClasses.bg} ${colorClasses.border}`}
                                                style={{ top: `${top}px`, height: `${height}px` }}
                                            >
                                                <p className={`font-semibold text-sm ${colorClasses.text}`}>{app.serviceName}</p>
                                                <p className={`text-xs ${colorClasses.subtext}`}>{app.clientName} with {app.staffName}</p>
                                            </div>
                                        );
                                    }) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <p className="text-slate-500">{t('schedule.noAppointments')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                     {viewMode === 'month' && (
                        <MonthView
                           currentDate={currentDate}
                           setCurrentDate={setCurrentDate}
                           setViewMode={setViewMode}
                           appointments={appointments}
                        />
                     )}
                </div>
            </div>
            {isAddModalOpen && (
                <AddAppointmentModal 
                    isOpen={isAddModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onAdd={handleAddAppointment}
                    clients={MOCK_CLIENTS}
                    services={MOCK_BUSINESS_DATA.services}
                    staff={MOCK_BUSINESS_DATA.staff}
                />
            )}
        </div>
    );
};

export default SchedulePage;
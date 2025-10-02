import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Client, Service, Staff, Appointment } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface AddAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (appointment: Appointment) => void;
    clients: Client[];
    services: Service[];
    staff: Staff[];
}

const Label: React.FC<{htmlFor: string, children: React.ReactNode}> = ({htmlFor, children}) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1">{children}</label>
)

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({ isOpen, onClose, onAdd, clients, services, staff }) => {
    const { t } = useTranslation();
    const [selectedClientId, setSelectedClientId] = useState<string>('');
    const [clientSearch, setClientSearch] = useState('');
    const [isClientListOpen, setClientListOpen] = useState(false);
    const [serviceId, setServiceId] = useState<string>('');
    const [staffId, setStaffId] = useState<string>('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState('09:00');

    const filteredClients = useMemo(() => {
        if (!clientSearch) return clients; // show all if search is empty
        return clients.filter(c => 
            `${c.name} ${c.surname}`.toLowerCase().includes(clientSearch.toLowerCase()) ||
            c.phone.includes(clientSearch)
        );
    }, [clientSearch, clients]);

    const handleClientSelect = (client: Client) => {
        setSelectedClientId(client.id);
        setClientSearch(`${client.name} ${client.surname}`);
        setClientListOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClientId || !serviceId || !staffId) {
            alert("Please fill all fields"); // Simple validation
            return;
        }

        const client = clients.find(c => c.id === selectedClientId);
        const service = services.find(s => s.id === serviceId);
        const staffMember = staff.find(s => s.id === staffId);
        
        if (!client || !service || !staffMember) return;

        // Convert 24h time to 12h format for display consistency
        const [hour, minute] = time.split(':');
        const hourNum = parseInt(hour);
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum % 12 === 0 ? 12 : hourNum % 12;
        const displayTime = `${displayHour}:${minute} ${ampm}`;

        const newAppointment: Appointment = {
            id: `a${new Date().getTime()}`,
            clientName: `${client.name} ${client.surname}`,
            serviceName: service.name,
            staffName: staffMember.name,
            date: date,
            time: displayTime,
            status: 'upcoming',
        };

        onAdd(newAppointment);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('schedule.addAppointmentTitle')}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Client Search */}
                <div className="relative">
                    <Label htmlFor="client">{t('schedule.searchOrSelectClient')}</Label>
                    <input
                        id="client"
                        type="text"
                        value={clientSearch}
                        onChange={(e) => {
                            setClientSearch(e.target.value);
                            if (selectedClientId) setSelectedClientId(''); // Clear selection if user types again
                        }}
                        onFocus={() => setClientListOpen(true)}
                        onBlur={() => setTimeout(() => setClientListOpen(false), 150)} // Delay to allow click
                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm"
                        placeholder={t('schedule.searchOrSelectClient')}
                        autoComplete="off"
                    />
                    {isClientListOpen && (
                        <div className="absolute z-10 w-full bg-white border border-slate-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                            {filteredClients.length > 0 ? filteredClients.map(client => (
                                <button
                                    type="button"
                                    key={client.id}
                                    onClick={() => handleClientSelect(client)}
                                    className="w-full text-left px-3 py-2 hover:bg-slate-100"
                                >
                                    {client.name} {client.surname} - {client.phone}
                                </button>
                            )) : <div className="px-3 py-2 text-slate-500">No clients found.</div>}
                        </div>
                    )}
                </div>

                {/* Service Select */}
                <div>
                    <Label htmlFor="service">{t('schedule.selectService')}</Label>
                    <select id="service" value={serviceId} onChange={e => setServiceId(e.target.value)} required className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm">
                        <option value="" disabled>{t('schedule.selectService')}</option>
                        {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>

                 {/* Staff Select */}
                 <div>
                    <Label htmlFor="staff">{t('schedule.selectStaff')}</Label>
                    <select id="staff" value={staffId} onChange={e => setStaffId(e.target.value)} required className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm">
                        <option value="" disabled>{t('schedule.selectStaff')}</option>
                        {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="date">{t('schedule.date')}</Label>
                        <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                    </div>
                     <div>
                        <Label htmlFor="time">{t('schedule.time')}</Label>
                        <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                    </div>
                </div>

                <div className="flex justify-end pt-4 mt-2 border-t">
                    <Button type="submit">
                        {t('schedule.bookAppointment')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddAppointmentModal;
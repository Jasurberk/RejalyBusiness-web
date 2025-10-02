import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MOCK_BUSINESS_DATA, MOCK_CLIENTS, MOCK_PORTFOLIO_ITEMS, MOCK_APPOINTMENTS } from '../../constants';
import type { Client, Service, PortfolioItem } from '../../types';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Icon } from '../../components/common/Icon';
import Modal from '../../components/common/Modal';
import EditServiceModal from '../../components/business/EditServiceModal';
import AddServiceModal from '../../components/business/AddServiceModal';
import AddClientModal from '../../components/business/AddClientModal';
import AddPortfolioItemModal from '../../components/business/AddPortfolioItemModal';
import EditPortfolioItemModal from '../../components/business/EditPortfolioItemModal';

type Tab = 'services' | 'clients' | 'portfolio';
type ClientSortKey = 'name_asc' | 'surname_asc' | 'last_visit_desc' | 'visits_desc';

const PortfolioPage: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<Tab>('services');
    
    // State for data
    const [services, setServices] = useState<Service[]>(MOCK_BUSINESS_DATA.services);
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(MOCK_PORTFOLIO_ITEMS);

    // State for modals
    const [isAddServiceModalOpen, setAddServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isAddClientModalOpen, setAddClientModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isAddPortfolioModalOpen, setAddPortfolioModalOpen] = useState(false);
    const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);

    // State for sorting
    const [clientSortKey, setClientSortKey] = useState<ClientSortKey>('name_asc');

    // Handlers for Services
    const handleAddService = (newService: Omit<Service, 'id'>) => {
        const serviceToAdd: Service = { ...newService, id: `s${new Date().getTime()}` };
        setServices(prev => [serviceToAdd, ...prev]);
        setAddServiceModalOpen(false);
    };
    const handleUpdateService = (updatedService: Service) => {
        setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
        setEditingService(null);
    };
    const handleDeleteService = (serviceId: string) => {
        setServices(services.filter(s => s.id !== serviceId));
        setEditingService(null);
    };

    // Handlers for Clients
    const handleAddClient = (newClient: Omit<Client, 'id' | 'firstAppointment' | 'lastAppointment' | 'totalAppointments' | 'avatarUrl'>) => {
        const clientToAdd: Client = {
            ...newClient,
            id: `c${new Date().getTime()}`,
            avatarUrl: `https://picsum.photos/seed/client_${Math.random()}/100/100`,
            firstAppointment: new Date().toISOString().split('T')[0],
            lastAppointment: new Date().toISOString().split('T')[0],
            totalAppointments: 0
        };
        setClients(prev => [clientToAdd, ...prev]);
        setAddClientModalOpen(false);
    };

    // Handlers for Portfolio
    const handleAddPortfolioItem = (newItem: Omit<PortfolioItem, 'id'>) => {
        const itemToAdd: PortfolioItem = { ...newItem, id: `p${new Date().getTime()}`};
        setPortfolioItems(prev => [itemToAdd, ...prev]);
        setAddPortfolioModalOpen(false);
    };
    const handleUpdatePortfolioItem = (updatedItem: PortfolioItem) => {
        setPortfolioItems(items => items.map(item => item.id === updatedItem.id ? updatedItem : item));
        setEditingPortfolioItem(null);
    };
    const handleDeletePortfolioItem = (itemId: string) => {
        setPortfolioItems(items => items.filter(item => item.id !== itemId));
        setEditingPortfolioItem(null);
    };

    const sortedClients = useMemo(() => {
        return [...clients].sort((a, b) => {
            switch (clientSortKey) {
                case 'surname_asc':
                    return a.surname.localeCompare(b.surname);
                case 'last_visit_desc':
                    return new Date(b.lastAppointment).getTime() - new Date(a.lastAppointment).getTime();
                case 'visits_desc':
                    return b.totalAppointments - a.totalAppointments;
                case 'name_asc':
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    }, [clients, clientSortKey]);

    const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-semibold rounded-md transition-colors ${
                activeTab === tabName
                    ? 'text-blue-600 bg-blue-100'
                    : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
            {label}
        </button>
    );

    const renderServices = () => {
        const servicesByCategory: { [key: string]: Service[] } = services.reduce((acc, service) => {
            const category = service.category || t('portfolio.uncategorized');
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(service);
            return acc;
        }, {} as { [key: string]: Service[] });

        return (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800">{t('portfolio.services')}</h3>
                    <Button onClick={() => setAddServiceModalOpen(true)}>{t('portfolio.addService')}</Button>
                </div>
                {Object.keys(servicesByCategory).length === 0 ? (
                    <p className="text-slate-500 text-center py-8">{t('portfolio.noServices')}</p>
                ) : Object.entries(servicesByCategory).map(([category, services]) => (
                    <div key={category}>
                        <h4 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.map(service => (
                                <Card key={service.id} className="!shadow-md border flex flex-col justify-between">
                                    <div className="p-5">
                                        <div className="flex justify-between items-start">
                                            <h5 className="text-lg font-bold text-slate-800 pr-4">{service.name}</h5>
                                            <div className="flex space-x-1 flex-shrink-0">
                                                <button onClick={() => setEditingService(service)} className="p-1.5 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-200 transition-colors" aria-label={t('portfolio.edit')}>
                                                    <Icon name="edit" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-600 min-h-[40px]">{service.description}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 border-t flex items-center justify-between text-sm">
                                        <div className="flex items-center text-slate-600">
                                            <Icon name="clock" className="w-4 h-4 mr-1.5 text-slate-500" />
                                            <span>{service.duration} {t('portfolio.minutes')}</span>
                                        </div>
                                        <div className="font-bold text-slate-800">
                                            {service.price.toLocaleString()} {t('portfolio.currency')}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderClients = () => (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">{t('portfolio.clients')}</h3>
                <Button onClick={() => setAddClientModalOpen(true)}>{t('portfolio.addClient')}</Button>
            </div>
            <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-grow">
                    <Icon name="search" className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder={t('portfolio.searchClients')} className="w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-50" />
                </div>
                <div className="flex items-center">
                    <label htmlFor="client-sort" className="text-sm font-medium text-slate-600 mr-2 whitespace-nowrap">{t('portfolio.sortBy')}:</label>
                    <select
                        id="client-sort"
                        value={clientSortKey}
                        onChange={(e) => setClientSortKey(e.target.value as ClientSortKey)}
                        className="py-2 pl-3 pr-8 border rounded-lg bg-slate-50 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="name_asc">{t('portfolio.sortOptions.name_asc')}</option>
                        <option value="surname_asc">{t('portfolio.sortOptions.surname_asc')}</option>
                        <option value="last_visit_desc">{t('portfolio.sortOptions.last_visit_desc')}</option>
                        <option value="visits_desc">{t('portfolio.sortOptions.visits_desc')}</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedClients.map(client => (
                    <Card key={client.id} className="!shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                        <button onClick={() => setSelectedClient(client)} className="w-full text-left p-4">
                            <div className="flex items-center space-x-4">
                                <img src={client.avatarUrl} alt={`${client.name} ${client.surname}`} className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-bold text-slate-800">{client.name} {client.surname}</p>
                                    <p className="text-sm text-slate-500">{client.phone}</p>
                                </div>
                            </div>
                        </button>
                    </Card>
                ))}
            </div>
        </div>
    );

    const renderPortfolio = () => (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">{t('portfolio.portfolio')}</h3>
                <Button onClick={() => setAddPortfolioModalOpen(true)}>{t('portfolio.uploadWork')}</Button>
            </div>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {portfolioItems.map(item => (
                    <div key={item.id} className="break-inside-avoid group relative">
                         <img src={item.imageUrl} alt={item.caption} className="rounded-lg shadow-md w-full" />
                         <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <button onClick={() => setEditingPortfolioItem(item)} className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70">
                                <Icon name="edit" className="w-5 h-5" />
                            </button>
                         </div>
                         <p className="mt-2 text-sm text-slate-600">{item.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
    const ClientDetailModal: React.FC = () => {
        if (!selectedClient) return null;
        const clientAppointments = MOCK_APPOINTMENTS.filter(a => a.clientName === `${selectedClient.name} ${selectedClient.surname}`);

        return (
            <Modal isOpen={!!selectedClient} onClose={() => setSelectedClient(null)} title={t('portfolio.clientDetails')} size="lg">
                <div className="flex flex-col md:flex-row md:space-x-6">
                    <div className="md:w-1/3 text-center">
                        <img src={selectedClient.avatarUrl} alt={`${selectedClient.name} ${selectedClient.surname}`} className="w-24 h-24 rounded-full mx-auto" />
                        <h3 className="text-lg font-bold mt-3">{selectedClient.name} {selectedClient.surname}</h3>
                        <p className="text-sm text-slate-500">{selectedClient.email}</p>
                        <p className="text-sm text-slate-500">{selectedClient.phone}</p>
                    </div>
                    <div className="md:w-2/3 mt-6 md:mt-0">
                         <h4 className="font-semibold text-slate-800 mb-3">{t('portfolio.appointmentHistory')}</h4>
                         <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                             {clientAppointments.map(app => (
                                <div key={app.id} className="bg-slate-50 p-3 rounded-lg">
                                    <p className="font-semibold">{app.serviceName}</p>
                                    <p className="text-sm text-slate-600">{app.date} at {app.time} with {app.staffName}</p>
                                </div>
                             ))}
                         </div>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">{t('portfolio.title')}</h1>
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="border-b border-slate-200 p-2">
                        <nav className="flex space-x-2">
                            <TabButton tabName="services" label={t('portfolio.services')} />
                            <TabButton tabName="clients" label={t('portfolio.clients')} />
                            <TabButton tabName="portfolio" label={t('portfolio.portfolio')} />
                        </nav>
                    </div>
                    <div className="p-6">
                        {activeTab === 'services' && renderServices()}
                        {activeTab === 'clients' && renderClients()}
                        {activeTab === 'portfolio' && renderPortfolio()}
                    </div>
                </div>
                {/* Service Modals */}
                {isAddServiceModalOpen && (
                    <AddServiceModal
                        isOpen={isAddServiceModalOpen}
                        onClose={() => setAddServiceModalOpen(false)}
                        onAdd={handleAddService}
                    />
                )}
                {editingService && (
                    <EditServiceModal
                        isOpen={!!editingService}
                        onClose={() => setEditingService(null)}
                        service={editingService}
                        onSave={handleUpdateService}
                        onDelete={handleDeleteService}
                    />
                )}
                {/* Client Modals */}
                {isAddClientModalOpen && (
                    <AddClientModal
                        isOpen={isAddClientModalOpen}
                        onClose={() => setAddClientModalOpen(false)}
                        onAdd={handleAddClient}
                    />
                )}
                <ClientDetailModal />
                {/* Portfolio Modals */}
                {isAddPortfolioModalOpen && (
                    <AddPortfolioItemModal
                        isOpen={isAddPortfolioModalOpen}
                        onClose={() => setAddPortfolioModalOpen(false)}
                        onAdd={handleAddPortfolioItem}
                    />
                )}
                {editingPortfolioItem && (
                    <EditPortfolioItemModal
                        isOpen={!!editingPortfolioItem}
                        onClose={() => setEditingPortfolioItem(null)}
                        item={editingPortfolioItem}
                        onSave={handleUpdatePortfolioItem}
                        onDelete={handleDeletePortfolioItem}
                    />
                )}
            </div>
        </div>
    );
};

export default PortfolioPage;
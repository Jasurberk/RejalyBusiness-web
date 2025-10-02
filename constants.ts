import type { Business, Appointment, User, Review, Client, PortfolioItem } from './types';

// This is now the single source of truth for the logged-in business's data.
export const MOCK_BUSINESS_DATA: Business = {
    id: 'b1',
    name: 'Toshkent Barber Club',
    category: 'Barber',
    address: '123 Amir Temur Ave, Tashkent',
    rating: 4.8,
    reviewCount: 256,
    imageUrl: 'https://picsum.photos/seed/business_logo/600/600',
    coverPhotoUrl: 'https://picsum.photos/seed/business_cover/1920/1080',
    description: 'Modern haircuts and classic shaves in the heart of Tashkent. Experience the best grooming service with our expert barbers.',
    phone: '+998 71 200 12 34',
    email: 'info@tbc.uz',
    socialMedia: {
      instagram: 'https://instagram.com/toshkentbarber',
      facebook: 'https://facebook.com/toshkentbarber',
      telegram: 'https://t.me/toshkentbarber',
    },
    services: [
      { id: 's1', name: 'Classic Haircut', description: 'A timeless haircut tailored to your preference, includes a wash and style.', category: 'Hair', duration: 45, price: 80000 },
      { id: 's2', name: 'Beard Trim', description: 'Expert shaping and trimming to keep your beard looking sharp.', category: 'Beard', duration: 30, price: 50000 },
      { id: 's3', name: 'Royal Shave', description: 'A traditional hot towel shave with a straight razor for the closest, smoothest finish.', category: 'Beard', duration: 60, price: 120000 },
      { id: 's4', name: 'Kids Haircut', description: 'A patient and friendly haircut experience for children under 12.', category: 'Hair', duration: 30, price: 60000 },
      { id: 's5', name: 'Haircut & Beard Trim', description: 'The complete grooming package: a custom haircut and a precise beard trim.', category: 'Combo', duration: 75, price: 120000 },
    ],
    staff: [
      { id: 'st1', name: 'Sardor Komilov', title: 'Master Barber', avatarUrl: 'https://picsum.photos/seed/staff_sardor/100/100' },
      { id: 'st2', name: 'Timur Yusupov', title: 'Senior Barber', avatarUrl: 'https://picsum.photos/seed/staff_timur/100/100' },
    ],
    reviews: [
      { id: 'r1', userName: 'Jasur', userAvatarUrl: 'https://picsum.photos/seed/user_jasur/100/100', rating: 5, comment: 'Best haircut I\'ve had in a long time!', date: '2024-05-10', reply: { text: 'Thank you for the kind words, Jasur! We are glad you enjoyed the experience.', date: '2024-05-11' } },
      { id: 'r2', userName: 'Alisher', userAvatarUrl: 'https://picsum.photos/seed/user_alisher/100/100', rating: 4, comment: 'Great service and very professional staff.', date: '2024-05-08' },
    ],
    workingHours: {
        'Monday - Friday': '9:00 AM - 9:00 PM',
        'Saturday': '10:00 AM - 8:00 PM',
        'Sunday': 'Closed'
    }
};

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(today.getDate() + 2);
const nextMonth = new Date();
nextMonth.setMonth(today.getMonth() + 1, 5);


export const MOCK_APPOINTMENTS: Appointment[] = [
    // Today's appointments
    {id: 'a1', clientName: 'Jasurbek Alimov', serviceName: 'Classic Haircut', staffName: 'Sardor Komilov', date: formatDate(today), time: '2:00 PM', status: 'upcoming'},
    {id: 'a2', clientName: 'Ozodbek Saidov', serviceName: 'Beard Trim', staffName: 'Timur Yusupov', date: formatDate(today), time: '3:00 PM', status: 'upcoming'},
    {id: 'a3', clientName: 'Aziz Nazarov', serviceName: 'Classic Haircut', staffName: 'Sardor Komilov', date: formatDate(today), time: '4:30 PM', status: 'upcoming'},
    
    // Tomorrow's appointments
    {id: 'a4', clientName: 'Rustam Karimov', serviceName: 'Royal Shave', staffName: 'Timur Yusupov', date: formatDate(tomorrow), time: '11:00 AM', status: 'upcoming'},
    {id: 'a5', clientName: 'Botir Zokirov', serviceName: 'Kids Haircut', staffName: 'Sardor Komilov', date: formatDate(tomorrow), time: '1:00 PM', status: 'upcoming'},
    
    // Yesterday's appointments
    {id: 'a6', clientName: 'Sanjar Ismoilov', serviceName: 'Haircut & Beard Trim', staffName: 'Timur Yusupov', date: formatDate(yesterday), time: '5:00 PM', status: 'completed'},
    
    // Day after tomorrow
    {id: 'a7', clientName: 'Eldor Shomurodov', serviceName: 'Classic Haircut', staffName: 'Sardor Komilov', date: formatDate(dayAfterTomorrow), time: '10:00 AM', status: 'upcoming'},

    // Next Month
    {id: 'a8', clientName: 'Aziz Nazarov', serviceName: 'Beard Trim', staffName: 'Timur Yusupov', date: formatDate(nextMonth), time: '3:30 PM', status: 'upcoming'}
];

export const MOCK_USERS: { [key: string]: User } = {
    'business@rejaly.uz': {
        id: 'u1',
        name: 'Sardor',
        surname: 'Komilov',
        email: 'business@rejaly.uz',
        avatarUrl: 'https://picsum.photos/seed/staff_sardor/100/100',
        role: 'business',
        phone: '+998 90 123 45 67',
        birthday: '1990-05-15',
        gender: 'male',
    }
};

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Jasurbek', surname: 'Alimov', avatarUrl: 'https://picsum.photos/seed/user_jasur/100/100', phone: '+998 90 234 56 78', email: 'jasurbek@email.com', firstAppointment: '2024-05-10', lastAppointment: '2024-07-20', totalAppointments: 3 },
  { id: 'c2', name: 'Ozodbek', surname: 'Saidov', avatarUrl: 'https://picsum.photos/seed/client_ozodbek/100/100', phone: '+998 90 345 67 89', email: 'ozodbek@email.com', firstAppointment: '2024-06-15', lastAppointment: '2024-07-22', totalAppointments: 2 },
  { id: 'c3', name: 'Aziz', surname: 'Nazarov', avatarUrl: 'https://picsum.photos/seed/client_aziz/100/100', phone: '+998 90 456 78 90', email: 'aziz@email.com', firstAppointment: '2024-07-01', lastAppointment: '2024-07-25', totalAppointments: 1 },
  { id: 'c4', name: 'Rustam', surname: 'Karimov', avatarUrl: 'https://picsum.photos/seed/client_rustam/100/100', phone: '+998 90 567 89 01', email: 'rustam@email.com', firstAppointment: '2024-04-20', lastAppointment: '2024-07-18', totalAppointments: 5 },
];

export const MOCK_PORTFOLIO_ITEMS: PortfolioItem[] = [
    { id: 'p1', imageUrl: 'https://picsum.photos/seed/p_item1/500/750', caption: 'Classic Fade' },
    { id: 'p2', imageUrl: 'https://picsum.photos/seed/p_item2/500/500', caption: 'Sharp Beard Line-up' },
    { id: 'p3', imageUrl: 'https://picsum.photos/seed/p_item3/500/600', caption: 'Modern Pompadour' },
    { id: 'p4', imageUrl: 'https://picsum.photos/seed/p_item4/500/500', caption: 'Kids Haircut Design' },
    { id: 'p5', imageUrl: 'https://picsum.photos/seed/p_item5/500/700', caption: 'Royal Shave Experience' },
    { id: 'p6', imageUrl: 'https://picsum.photos/seed/p_item6/500/650', caption: 'Textured Crop Top' },
    { id: 'p7', imageUrl: 'https://picsum.photos/seed/p_item7/500/750', caption: 'Long Hair Trim' },
    { id: 'p8', imageUrl: 'https://picsum.photos/seed/p_item8/500/550', caption: 'Creative Color' },
];
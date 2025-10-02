export interface User {
  id: string;
  name: string;
  surname?: string; // Made optional for existing data
  phone?: string;
  email: string;
  avatarUrl: string;
  role: 'user' | 'business';
  birthday?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface Review {
  id:string;
  // For business page
  userName: string;
  userAvatarUrl: string;
  // For user page
  businessName?: string;
  rating: number;
  comment: string;
  date: string;
  reply?: {
    text: string;
    date: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category?: string;
}

export interface Staff {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
}

export interface Business {
  id: string;
  name: string;
  category: 'Barber' | 'Hair Salon' | 'Nail Salon' | 'Spa&Massage' | 'Dentist' | 'Football fields' | 'Videogaming' | 'Others';
  address: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  coverPhotoUrl: string;
  description: string;
  phone: string;
  email: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    telegram?: string;
  };
  services: Service[];
  staff: Staff[];
  reviews: Review[];
  workingHours: { [key: string]: string };
}

export interface Appointment {
  id: string;
  // For business page
  clientName: string;
  // For user page
  businessName?: string;
  businessAddress?: string;
  serviceName: string;
  staffName: string;
  specialistAvatarUrl?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Client {
  id: string;
  name: string;
  surname: string;
  avatarUrl: string;
  phone: string;
  email: string;
  firstAppointment: string;
  lastAppointment: string;
  totalAppointments: number;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export type BusinessPage = 'dashboard' | 'schedule' | 'portfolio' | 'profile';

export type IconName = 'star' | 'map-pin' | 'clock' | 'calendar' | 'user' | 'chevron-down' | 'arrow-left' | 'x' | 'search' | 'globe' | 'settings' | 'help-circle' | 'message-square' | 'scissors' | 'nail-polish' | 'spa' | 'tooth' | 'soccer-ball' | 'gamepad' | 'plus-circle' | 'google' | 'apple' | 'facebook' | 'edit' | 'lock' | 'credit-card' | 'file-text' | 'life-buoy' | 'instagram' | 'telegram' | 'sliders' | 'trash' | 'phone' | 'corner-down-right';
// Admin types
export interface Admin {
  username: string;
  password: string;
}

// Profile types
export interface Profile {
  name: string;
  fullName: string;
  birthdate: string;
  location: string;
  school: string;
  bio: {
    en: string;
    id: string;
  };
  avatar: string;
  roles: string[];
  cv: {
    en: string;
    id: string;
  };
}

// Social Media types
export interface SocialMedia {
  name: string;
  url: string;
  icon: string;
  color: string;
}

// Friend types
export interface Friend {
  name: string;
  avatar: string;
  github: string;
  role: string;
}

// Project types
export interface Project {
  id: number;
  name: string;
  description: {
    en: string;
    id: string;
  };
  image: string;
  technologies: string[];
  url: string;
  github: string;
}

// Update types
export interface Update {
  date: string;
  title: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
}

// Donation types
export interface Donation {
  name: string;
  url: string;
  icon: string;
}

// Stats types
export interface Stats {
  visitors: number;
  lastVisited: string | null;
}

// Database types
export interface Database {
  profile: Profile;
  social: SocialMedia[];
  friends: Friend[];
  projects: Project[];
  updates: Update[];
  donations: Donation[];
  admin: Admin;
  stats: Stats;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
  error: string | null;
}

// Theme types
export type Theme = 'light' | 'dark';

// Language types
export type Language = 'en' | 'id';

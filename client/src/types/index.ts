// Portfolio data interfaces
export interface IPortfolioData {
  bio: IBio;
  skills: ISkill[];
  interests: IInterest[];
  projects: IProject[];
  friends: IFriend[];
  updates: IUpdate[];
  settings: ISettings;
}

export interface IBio {
  id: number;
  name: string;
  title: string;
  location: string;
  shortDescription: string;
  longDescription: string;
  education: string;
  experience: string;
  avatar: string;
  workspaceImage: string;
  email: string;
  phone: string;
  language: string;
}

export interface ISkill {
  id: number;
  name: string;
  icon: string;
  category: string;
}

export interface IInterest {
  id: number;
  name: string;
  icon: string;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  sourceLink?: string;
  featured: boolean;
  category: string;
  order: number;
}

export interface IFriend {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  githubLink?: string;
  linkedinLink?: string;
  websiteLink?: string;
  order: number;
}

export interface IUpdate {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  order: number;
}

export interface ISettings {
  id: number;
  musicFile: string;
  musicTitle: string;
  themePrimary: string;
  themeVariant: string;
  loadingPhrases: string[];
}

// Theme settings
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'id';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export interface LanguageProviderState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Animation types
export interface AnimationProps {
  children: React.ReactNode;
  type?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
}

// Admin types
export interface AdminState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

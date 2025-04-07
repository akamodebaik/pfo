import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { IPortfolioData } from '@/types';

interface PortfolioProviderProps {
  children: ReactNode;
}

interface PortfolioContextType {
  portfolioData: IPortfolioData | null;
  isLoading: boolean;
  error: Error | null;
  refetchData: () => void;
}

const defaultPortfolioData: IPortfolioData = {
  bio: {
    id: 1,
    name: 'Aka',
    title: 'Web Developer',
    location: 'West Sumatra, Indonesia',
    shortDescription: 'Crafting elegant digital experiences with modern technologies.',
    longDescription: "Hello! I'm Aka, a passionate web developer based in West Sumatra, Indonesia. My journey in web development started when I was 15 years old, tinkering with HTML and CSS to create simple websites.\n\nOver the years, I've evolved into a full-stack developer with expertise in modern frontend frameworks like React, Next.js, and Vue.js, as well as backend technologies such as Node.js, Express, and MongoDB.\n\nI believe in creating web experiences that are not only visually appealing but also accessible, performant, and user-friendly. My approach combines technical precision with creative problem-solving.",
    education: 'Computer Science, University of Indonesia',
    experience: '3+ years in Web Development',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    workspaceImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1pbmltYWwlMjB3b3Jrc3BhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    email: 'contact@aka.dev',
    phone: '+62 812 3456 7890',
    language: 'en'
  },
  skills: [],
  interests: [],
  projects: [],
  friends: [],
  updates: [],
  settings: {
    id: 1,
    musicFile: '/music/background.mp3',
    musicTitle: 'Elegant Atmosphere',
    themePrimary: '#d4af37',
    themeVariant: 'professional',
    loadingPhrases: [
      "Preparing greatness...",
      "Loading Aka's energy...",
      "Crafting premium experience...",
      "Polishing the interface...",
      "Arranging the pixels...",
      "Charging creative powers...",
      "Setting up workspace...",
      "Collecting inspirations...",
      "Brewing code magic..."
    ]
  }
};

const PortfolioContext = createContext<PortfolioContextType>({
  portfolioData: null,
  isLoading: true,
  error: null,
  refetchData: () => {}
});

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const { toast } = useToast();

  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({ 
    queryKey: ['/api/portfolio'],
    retry: 3,
    refetchOnWindowFocus: false,
    onError: () => {
      toast({
        title: 'Error loading portfolio data',
        description: 'Using fallback data instead. Some features may be limited.',
        variant: 'destructive',
      });
    }
  });

  const portfolioData = data || defaultPortfolioData;

  return (
    <PortfolioContext.Provider value={{ 
      portfolioData, 
      isLoading, 
      error: error as Error, 
      refetchData: refetch 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

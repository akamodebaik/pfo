'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Database } from '@/types';
import ProfileEditor from './ProfileEditor';
import ProjectsEditor from './ProjectsEditor';
import FriendsEditor from './FriendsEditor';
import SocialEditor from './SocialEditor';
import UpdatesEditor from './UpdatesEditor';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaCode, 
  FaGlobe, 
  FaUserFriends, 
  FaNewspaper, 
  FaSignOutAlt, 
  FaChartBar, 
  FaCalendarAlt, 
  FaEye 
} from 'react-icons/fa';

type Tab = 'profile' | 'projects' | 'social' | 'friends' | 'updates';

interface DashboardProps {
  data: Database;
  onUpdate: (updatedData: Partial<Database>) => Promise<boolean>;
}

export default function Dashboard({ data, onUpdate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  const { theme } = useTheme();
  const currentDate = new Date().toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Format last visited date if available
  const lastVisitedDate = data.stats.lastVisited 
    ? new Date(data.stats.lastVisited).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : t('admin.neverVisited');

  return (
    <div className="min-h-screen bg-light-background/50 dark:bg-dark-background/50 py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-full mr-4 text-white">
                <FaUser className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
                  {t('admin.welcomeMessage')} {user?.username}
                </h1>
                <p className="text-light-muted dark:text-dark-muted">{currentDate}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-md font-medium bg-red-500 hover:bg-red-600 text-white transition-all"
            >
              <FaSignOutAlt className="mr-2" />
              {t('common.logout')}
            </button>
          </div>
        </motion.div>
        
        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {/* Visitor Count */}
          <div className="card p-5 flex items-center">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mr-4 text-white">
              <FaEye className="h-5 w-5" />
            </div>
            <div>
              <p className="text-light-muted dark:text-dark-muted text-sm">{t('admin.totalVisitors')}</p>
              <h3 className="text-2xl font-bold">{data.stats.visitors}</h3>
            </div>
          </div>
          
          {/* Projects Count */}
          <div className="card p-5 flex items-center">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mr-4 text-white">
              <FaCode className="h-5 w-5" />
            </div>
            <div>
              <p className="text-light-muted dark:text-dark-muted text-sm">{t('admin.totalProjects')}</p>
              <h3 className="text-2xl font-bold">{data.projects.length}</h3>
            </div>
          </div>
          
          {/* Last Visited */}
          <div className="card p-5 flex items-center">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mr-4 text-white">
              <FaCalendarAlt className="h-5 w-5" />
            </div>
            <div>
              <p className="text-light-muted dark:text-dark-muted text-sm">{t('admin.lastVisited')}</p>
              <h3 className="text-base font-medium truncate">{lastVisitedDate}</h3>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card p-5">
              <h3 className="font-medium text-lg mb-4 text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
                {t('admin.navigation')}
              </h3>
              <nav className="space-y-1">
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-light-primary/20 to-light-primary/5 dark:from-dark-primary/20 dark:to-dark-primary/5 text-light-primary dark:text-dark-primary font-medium'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser className={`mr-3 ${activeTab === 'profile' ? 'text-light-primary dark:text-dark-primary' : 'text-light-muted dark:text-dark-muted'}`} />
                  {t('admin.profile')}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                    activeTab === 'projects'
                      ? 'bg-gradient-to-r from-light-primary/20 to-light-primary/5 dark:from-dark-primary/20 dark:to-dark-primary/5 text-light-primary dark:text-dark-primary font-medium'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('projects')}
                >
                  <FaCode className={`mr-3 ${activeTab === 'projects' ? 'text-light-primary dark:text-dark-primary' : 'text-light-muted dark:text-dark-muted'}`} />
                  {t('admin.projects')}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                    activeTab === 'social'
                      ? 'bg-gradient-to-r from-light-primary/20 to-light-primary/5 dark:from-dark-primary/20 dark:to-dark-primary/5 text-light-primary dark:text-dark-primary font-medium'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('social')}
                >
                  <FaGlobe className={`mr-3 ${activeTab === 'social' ? 'text-light-primary dark:text-dark-primary' : 'text-light-muted dark:text-dark-muted'}`} />
                  {t('admin.social')}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                    activeTab === 'friends'
                      ? 'bg-gradient-to-r from-light-primary/20 to-light-primary/5 dark:from-dark-primary/20 dark:to-dark-primary/5 text-light-primary dark:text-dark-primary font-medium'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('friends')}
                >
                  <FaUserFriends className={`mr-3 ${activeTab === 'friends' ? 'text-light-primary dark:text-dark-primary' : 'text-light-muted dark:text-dark-muted'}`} />
                  {t('admin.friends')}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                    activeTab === 'updates'
                      ? 'bg-gradient-to-r from-light-primary/20 to-light-primary/5 dark:from-dark-primary/20 dark:to-dark-primary/5 text-light-primary dark:text-dark-primary font-medium'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('updates')}
                >
                  <FaNewspaper className={`mr-3 ${activeTab === 'updates' ? 'text-light-primary dark:text-dark-primary' : 'text-light-muted dark:text-dark-muted'}`} />
                  {t('admin.updates')}
                </button>
              </nav>
              
              {/* Quick Tips Card */}
              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 text-sm">💡 {t('admin.quickTips')}</h4>
                <p className="text-blue-700 dark:text-blue-400 text-xs mt-2">{t('admin.tipContent')}</p>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="card p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b border-light-border dark:border-dark-border text-light-text dark:text-dark-text">
                {activeTab === 'profile' && <><FaUser className="inline-block mr-2 mb-1" /> {t('admin.editProfile')}</>}
                {activeTab === 'projects' && <><FaCode className="inline-block mr-2 mb-1" /> {t('admin.editProjects')}</>}
                {activeTab === 'social' && <><FaGlobe className="inline-block mr-2 mb-1" /> {t('admin.editSocial')}</>}
                {activeTab === 'friends' && <><FaUserFriends className="inline-block mr-2 mb-1" /> {t('admin.editFriends')}</>}
                {activeTab === 'updates' && <><FaNewspaper className="inline-block mr-2 mb-1" /> {t('admin.editUpdates')}</>}
              </h2>
              
              {activeTab === 'profile' && (
                <ProfileEditor
                  profile={data.profile}
                  onUpdate={(profile) => onUpdate({ profile })}
                />
              )}
              
              {activeTab === 'projects' && (
                <ProjectsEditor
                  projects={data.projects}
                  onUpdate={(projects) => onUpdate({ projects })}
                />
              )}
              
              {activeTab === 'social' && (
                <SocialEditor
                  social={data.social}
                  onUpdate={(social) => onUpdate({ social })}
                />
              )}
              
              {activeTab === 'friends' && (
                <FriendsEditor
                  friends={data.friends}
                  onUpdate={(friends) => onUpdate({ friends })}
                />
              )}
              
              {activeTab === 'updates' && (
                <UpdatesEditor
                  updates={data.updates}
                  onUpdate={(updates) => onUpdate({ updates })}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

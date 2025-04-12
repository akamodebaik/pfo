'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Database } from '@/types';
import SecondaryLoading from '@/components/UI/SecondaryLoading';
import ProfileEditor from '@/components/Admin/ProfileEditor';
import ProjectsEditor from '@/components/Admin/ProjectsEditor';
import FriendsEditor from '@/components/Admin/FriendsEditor';
import SocialEditor from '@/components/Admin/SocialEditor';
import UpdatesEditor from '@/components/Admin/UpdatesEditor';

type Tab = 'profile' | 'projects' | 'social' | 'friends' | 'updates';

export default function AdminDashboardPage() {
  const [data, setData] = useState<Database | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/admin');
    }
  }, [isAuthenticated, loading, router]);
  
  // Loading state
  if (loading || !isAuthenticated || !data) {
    return <SecondaryLoading />;
  }
  
  // Update database handler
  const handleUpdate = async (updatedData: Partial<Database>) => {
    try {
      const response = await fetch('/api/admin/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (response.ok) {
        const newData = await response.json();
        setData(newData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating data:', error);
      return false;
    }
  };
  
  return (
    <div className="min-h-screen bg-light-background/50 dark:bg-dark-background/50 py-8">
      <div className="container mx-auto px-4">
        <div className="card p-4 mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
            {t('admin.title')} - {user?.username}
          </h1>
          <button
            onClick={() => logout()}
            className="btn-secondary"
          >
            {t('common.logout')}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4">
              <nav className="space-y-2">
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'profile'
                      ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  {t('admin.profile')}
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'projects'
                      ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('projects')}
                >
                  {t('admin.projects')}
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'social'
                      ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('social')}
                >
                  {t('admin.social')}
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'friends'
                      ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('friends')}
                >
                  {t('admin.friends')}
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeTab === 'updates'
                      ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                      : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  }`}
                  onClick={() => setActiveTab('updates')}
                >
                  {t('admin.updates')}
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-4">
            <div className="card p-6">
              {activeTab === 'profile' && (
                <ProfileEditor
                  profile={data.profile}
                  onUpdate={(profile) => handleUpdate({ profile })}
                />
              )}
              
              {activeTab === 'projects' && (
                <ProjectsEditor
                  projects={data.projects}
                  onUpdate={(projects) => handleUpdate({ projects })}
                />
              )}
              
              {activeTab === 'social' && (
                <SocialEditor
                  social={data.social}
                  onUpdate={(social) => handleUpdate({ social })}
                />
              )}
              
              {activeTab === 'friends' && (
                <FriendsEditor
                  friends={data.friends}
                  onUpdate={(friends) => handleUpdate({ friends })}
                />
              )}
              
              {activeTab === 'updates' && (
                <UpdatesEditor
                  updates={data.updates}
                  onUpdate={(updates) => handleUpdate({ updates })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

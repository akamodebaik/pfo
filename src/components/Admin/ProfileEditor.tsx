'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Profile } from '@/types';

interface ProfileEditorProps {
  profile: Profile;
  onUpdate: (profile: Profile) => Promise<boolean>;
}

export default function ProfileEditor({ profile: initialProfile, onUpdate }: ProfileEditorProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t } = useLanguage();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Profile],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleRolesChange = (value: string) => {
    const roles = value.split(',').map(role => role.trim());
    setProfile((prev) => ({
      ...prev,
      roles,
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const success = await onUpdate(profile);
      
      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6">
        {t('admin.profile')}
      </h2>
      
      {saveStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
          Profile updated successfully!
        </div>
      )}
      
      {saveStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          Failed to update profile. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              value={profile.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="birthdate" className="form-label">Birthdate</label>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              className="form-input"
              value={profile.birthdate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              className="form-input"
              value={profile.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="school" className="form-label">School</label>
            <input
              id="school"
              name="school"
              type="text"
              className="form-input"
              value={profile.school}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="avatar" className="form-label">Avatar URL</label>
            <input
              id="avatar"
              name="avatar"
              type="text"
              className="form-input"
              value={profile.avatar}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cv.en" className="form-label">CV (English)</label>
            <input
              id="cv.en"
              name="cv.en"
              type="text"
              className="form-input"
              value={profile.cv.en}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cv.id" className="form-label">CV (Indonesian)</label>
            <input
              id="cv.id"
              name="cv.id"
              type="text"
              className="form-input"
              value={profile.cv.id}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="roles" className="form-label">Roles (comma separated)</label>
          <input
            id="roles"
            name="roles"
            type="text"
            className="form-input"
            value={profile.roles.join(', ')}
            onChange={(e) => handleRolesChange(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bio.en" className="form-label">Bio (English)</label>
          <textarea
            id="bio.en"
            name="bio.en"
            rows={4}
            className="form-input"
            value={profile.bio.en}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bio.id" className="form-label">Bio (Indonesian)</label>
          <textarea
            id="bio.id"
            name="bio.id"
            rows={4}
            className="form-input"
            value={profile.bio.id}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSaving}
          >
            {isSaving ? t('common.loading') : t('common.save')}
          </button>
        </div>
      </form>
    </div>
  );
}

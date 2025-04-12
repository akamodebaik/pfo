'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SocialMedia } from '@/types';
import { 
  FaWhatsapp, FaTiktok, FaYoutube, FaGithub, 
  FaInstagram, FaTelegram, FaDiscord, FaLinkedin 
} from 'react-icons/fa';

interface SocialEditorProps {
  social: SocialMedia[];
  onUpdate: (social: SocialMedia[]) => Promise<boolean>;
}

export default function SocialEditor({ social: initialSocial, onUpdate }: SocialEditorProps) {
  const [social, setSocial] = useState<SocialMedia[]>(initialSocial);
  const [editingSocial, setEditingSocial] = useState<SocialMedia | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t } = useLanguage();
  
  // Available social media platforms
  const platforms = [
    { name: 'WhatsApp', icon: 'whatsapp', color: '#25D366' },
    { name: 'TikTok', icon: 'tiktok', color: '#000000' },
    { name: 'YouTube', icon: 'youtube', color: '#FF0000' },
    { name: 'GitHub', icon: 'github', color: '#181717' },
    { name: 'Instagram', icon: 'instagram', color: '#E4405F' },
    { name: 'Telegram', icon: 'telegram', color: '#26A5E4' },
    { name: 'Discord', icon: 'discord', color: '#5865F2' },
    { name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2' }
  ];
  
  // Create empty social template
  const emptySocial: SocialMedia = {
    name: '',
    url: '',
    icon: '',
    color: ''
  };
  
  // Get the appropriate icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'whatsapp':
        return <FaWhatsapp className="h-5 w-5" />;
      case 'tiktok':
        return <FaTiktok className="h-5 w-5" />;
      case 'youtube':
        return <FaYoutube className="h-5 w-5" />;
      case 'github':
        return <FaGithub className="h-5 w-5" />;
      case 'instagram':
        return <FaInstagram className="h-5 w-5" />;
      case 'telegram':
        return <FaTelegram className="h-5 w-5" />;
      case 'discord':
        return <FaDiscord className="h-5 w-5" />;
      case 'linkedin':
        return <FaLinkedin className="h-5 w-5" />;
      default:
        return <FaGithub className="h-5 w-5" />;
    }
  };
  
  // Handle edit social
  const handleEditSocial = (socialItem: SocialMedia) => {
    setEditingSocial({ ...socialItem });
    setIsAdding(false);
  };
  
  // Handle add new social
  const handleAddSocial = () => {
    setEditingSocial({ ...emptySocial });
    setIsAdding(true);
  };
  
  // Handle delete social
  const handleDeleteSocial = async (name: string) => {
    if (!window.confirm('Are you sure you want to delete this social media link?')) {
      return;
    }
    
    const updatedSocial = social.filter(s => s.name !== name);
    setIsSaving(true);
    
    try {
      const success = await onUpdate(updatedSocial);
      
      if (success) {
        setSocial(updatedSocial);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error deleting social:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingSocial) return;
    
    const { name, value } = e.target;
    
    // If platform is selected, update icon and color automatically
    if (name === 'name') {
      const selectedPlatform = platforms.find(p => p.name === value);
      
      if (selectedPlatform) {
        setEditingSocial(prev => ({
          ...prev!,
          name: value,
          icon: selectedPlatform.icon,
          color: selectedPlatform.color
        }));
      } else {
        setEditingSocial(prev => ({
          ...prev!,
          [name]: value
        }));
      }
    } else {
      setEditingSocial(prev => ({
        ...prev!,
        [name]: value
      }));
    }
  };
  
  // Handle save social
  const handleSaveSocial = async () => {
    if (!editingSocial) return;
    
    setIsSaving(true);
    
    let updatedSocial: SocialMedia[];
    
    if (isAdding) {
      updatedSocial = [...social, editingSocial];
    } else {
      updatedSocial = social.map(s => 
        s.name === editingSocial.name ? editingSocial : s
      );
    }
    
    try {
      const success = await onUpdate(updatedSocial);
      
      if (success) {
        setSocial(updatedSocial);
        setEditingSocial(null);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving social:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
          {t('admin.social')}
        </h2>
        
        <button
          onClick={handleAddSocial}
          className="btn-primary"
          disabled={!!editingSocial}
        >
          Add Social Media
        </button>
      </div>
      
      {saveStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
          Social media links updated successfully!
        </div>
      )}
      
      {saveStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          Failed to update social media links. Please try again.
        </div>
      )}
      
      {/* Edit social form */}
      {editingSocial && (
        <div className="mb-8 p-4 border border-light-border dark:border-dark-border rounded-lg">
          <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-4">
            {isAdding ? 'Add New Social Media' : 'Edit Social Media'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Platform</label>
              <select
                id="name"
                name="name"
                className="form-input"
                value={editingSocial.name}
                onChange={handleChange}
                required
              >
                <option value="">Select a platform</option>
                {platforms.map((platform) => (
                  <option key={platform.name} value={platform.name}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="url" className="form-label">URL</label>
              <input
                id="url"
                name="url"
                type="text"
                className="form-input"
                value={editingSocial.url}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="icon" className="form-label">Icon</label>
              <input
                id="icon"
                name="icon"
                type="text"
                className="form-input"
                value={editingSocial.icon}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="color" className="form-label">Color</label>
              <div className="flex items-center space-x-2">
                <input
                  id="color"
                  name="color"
                  type="text"
                  className="form-input"
                  value={editingSocial.color}
                  onChange={handleChange}
                  required
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: editingSocial.color }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="btn-outline"
              onClick={() => setEditingSocial(null)}
              disabled={isSaving}
            >
              {t('common.cancel')}
            </button>
            
            <button
              type="button"
              className="btn-primary"
              onClick={handleSaveSocial}
              disabled={isSaving}
            >
              {isSaving ? t('common.loading') : t('common.save')}
            </button>
          </div>
        </div>
      )}
      
      {/* Social media list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {social.map((socialItem) => (
          <div
            key={socialItem.name}
            className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:border-light-primary dark:hover:border-dark-primary transition-colors"
            style={{ borderLeft: `3px solid ${socialItem.color}` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${socialItem.color}20`, color: socialItem.color }}
                >
                  {getIcon(socialItem.icon)}
                </div>
                
                <div>
                  <h3 className="font-medium text-light-text dark:text-dark-text">
                    {socialItem.name}
                  </h3>
                  <p className="text-xs text-light-muted dark:text-dark-muted truncate max-w-[150px]">
                    {socialItem.url}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="text-sm px-2 py-1 bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary rounded-md hover:bg-light-primary/20 dark:hover:bg-dark-primary/20"
                  onClick={() => handleEditSocial(socialItem)}
                  disabled={!!editingSocial}
                >
                  {t('common.edit')}
                </button>
                
                <button
                  className="text-sm px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50"
                  onClick={() => handleDeleteSocial(socialItem.name)}
                  disabled={isSaving || !!editingSocial}
                >
                  {t('common.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {social.length === 0 && (
          <p className="text-light-muted dark:text-dark-muted text-center py-8 col-span-3">
            No social media links yet. Click "Add Social Media" to create one.
          </p>
        )}
      </div>
    </div>
  );
}

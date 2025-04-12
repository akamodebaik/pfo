'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Update } from '@/types';
import { formatDate } from '@/utils/helpers';

interface UpdatesEditorProps {
  updates: Update[];
  onUpdate: (updates: Update[]) => Promise<boolean>;
}

export default function UpdatesEditor({ updates: initialUpdates, onUpdate }: UpdatesEditorProps) {
  const [updates, setUpdates] = useState<Update[]>(initialUpdates);
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t, language } = useLanguage();
  
  // Create empty update template
  const emptyUpdate: Update = {
    date: new Date().toISOString().split('T')[0],
    title: {
      en: '',
      id: ''
    },
    description: {
      en: '',
      id: ''
    }
  };
  
  // Handle edit update
  const handleEditUpdate = (update: Update) => {
    setEditingUpdate({ ...update });
    setIsAdding(false);
  };
  
  // Handle add new update
  const handleAddUpdate = () => {
    setEditingUpdate({ ...emptyUpdate });
    setIsAdding(true);
  };
  
  // Handle delete update
  const handleDeleteUpdate = async (date: string) => {
    if (!window.confirm('Are you sure you want to delete this update?')) {
      return;
    }
    
    const updatedUpdates = updates.filter(u => u.date !== date);
    setIsSaving(true);
    
    try {
      const success = await onUpdate(updatedUpdates);
      
      if (success) {
        setUpdates(updatedUpdates);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error deleting update:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingUpdate) return;
    
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditingUpdate(prev => ({
        ...prev!,
        [parent]: {
          ...prev![parent as keyof Update],
          [child]: value,
        },
      }));
    } else {
      setEditingUpdate(prev => ({
        ...prev!,
        [name]: value,
      }));
    }
  };
  
  // Handle save update
  const handleSaveUpdate = async () => {
    if (!editingUpdate) return;
    
    setIsSaving(true);
    
    let updatedUpdates: Update[];
    
    if (isAdding) {
      updatedUpdates = [...updates, editingUpdate];
    } else {
      updatedUpdates = updates.map(u => 
        u.date === editingUpdate.date ? editingUpdate : u
      );
    }
    
    // Sort updates by date (newest first)
    updatedUpdates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    try {
      const success = await onUpdate(updatedUpdates);
      
      if (success) {
        setUpdates(updatedUpdates);
        setEditingUpdate(null);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving update:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
          {t('admin.updates')}
        </h2>
        
        <button
          onClick={handleAddUpdate}
          className="btn-primary"
          disabled={!!editingUpdate}
        >
          Add Update
        </button>
      </div>
      
      {saveStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
          Updates saved successfully!
        </div>
      )}
      
      {saveStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          Failed to save updates. Please try again.
        </div>
      )}
      
      {/* Edit update form */}
      {editingUpdate && (
        <div className="mb-8 p-4 border border-light-border dark:border-dark-border rounded-lg">
          <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-4">
            {isAdding ? 'Add New Update' : 'Edit Update'}
          </h3>
          
          <div className="form-group mb-4">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className="form-input"
              value={editingUpdate.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label htmlFor="title.en" className="form-label">Title (English)</label>
              <input
                id="title.en"
                name="title.en"
                type="text"
                className="form-input"
                value={editingUpdate.title.en}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="title.id" className="form-label">Title (Indonesian)</label>
              <input
                id="title.id"
                name="title.id"
                type="text"
                className="form-input"
                value={editingUpdate.title.id}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="form-group">
              <label htmlFor="description.en" className="form-label">Description (English)</label>
              <textarea
                id="description.en"
                name="description.en"
                rows={3}
                className="form-input"
                value={editingUpdate.description.en}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description.id" className="form-label">Description (Indonesian)</label>
              <textarea
                id="description.id"
                name="description.id"
                rows={3}
                className="form-input"
                value={editingUpdate.description.id}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="btn-outline"
              onClick={() => setEditingUpdate(null)}
              disabled={isSaving}
            >
              {t('common.cancel')}
            </button>
            
            <button
              type="button"
              className="btn-primary"
              onClick={handleSaveUpdate}
              disabled={isSaving}
            >
              {isSaving ? t('common.loading') : t('common.save')}
            </button>
          </div>
        </div>
      )}
      
      {/* Updates list */}
      <div className="space-y-4">
        {updates.map((update) => (
          <div
            key={update.date}
            className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:border-light-primary dark:hover:border-dark-primary transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-medium text-light-primary dark:text-dark-primary mb-1">
                  {formatDate(update.date, language)}
                </div>
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                  {update.title[language]}
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
                  {update.description[language]}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="text-sm px-3 py-1 bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary rounded-md hover:bg-light-primary/20 dark:hover:bg-dark-primary/20"
                  onClick={() => handleEditUpdate(update)}
                  disabled={!!editingUpdate}
                >
                  {t('common.edit')}
                </button>
                
                <button
                  className="text-sm px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50"
                  onClick={() => handleDeleteUpdate(update.date)}
                  disabled={isSaving || !!editingUpdate}
                >
                  {t('common.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {updates.length === 0 && (
          <p className="text-light-muted dark:text-dark-muted text-center py-8">
            No updates yet. Click "Add Update" to create one.
          </p>
        )}
      </div>
    </div>
  );
}

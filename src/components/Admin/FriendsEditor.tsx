'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Friend } from '@/types';

interface FriendsEditorProps {
  friends: Friend[];
  onUpdate: (friends: Friend[]) => Promise<boolean>;
}

export default function FriendsEditor({ friends: initialFriends, onUpdate }: FriendsEditorProps) {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [editingFriend, setEditingFriend] = useState<Friend | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t } = useLanguage();
  
  // Create empty friend template
  const emptyFriend: Friend = {
    name: '',
    avatar: '',
    github: '',
    role: ''
  };
  
  // Handle edit friend
  const handleEditFriend = (friend: Friend) => {
    setEditingFriend({ ...friend });
    setIsAdding(false);
  };
  
  // Handle add new friend
  const handleAddFriend = () => {
    setEditingFriend({ ...emptyFriend });
    setIsAdding(true);
  };
  
  // Handle delete friend
  const handleDeleteFriend = async (name: string) => {
    if (!window.confirm('Are you sure you want to delete this friend?')) {
      return;
    }
    
    const updatedFriends = friends.filter(f => f.name !== name);
    setIsSaving(true);
    
    try {
      const success = await onUpdate(updatedFriends);
      
      if (success) {
        setFriends(updatedFriends);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error deleting friend:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingFriend) return;
    
    const { name, value } = e.target;
    setEditingFriend(prev => ({
      ...prev!,
      [name]: value,
    }));
  };
  
  // Handle save friend
  const handleSaveFriend = async () => {
    if (!editingFriend) return;
    
    setIsSaving(true);
    
    let updatedFriends: Friend[];
    
    if (isAdding) {
      updatedFriends = [...friends, editingFriend];
    } else {
      updatedFriends = friends.map(f => 
        f.name === editingFriend.name ? editingFriend : f
      );
    }
    
    try {
      const success = await onUpdate(updatedFriends);
      
      if (success) {
        setFriends(updatedFriends);
        setEditingFriend(null);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving friend:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
          {t('admin.friends')}
        </h2>
        
        <button
          onClick={handleAddFriend}
          className="btn-primary"
          disabled={!!editingFriend}
        >
          Add Friend
        </button>
      </div>
      
      {saveStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
          Friends updated successfully!
        </div>
      )}
      
      {saveStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          Failed to update friends. Please try again.
        </div>
      )}
      
      {/* Edit friend form */}
      {editingFriend && (
        <div className="mb-8 p-4 border border-light-border dark:border-dark-border rounded-lg">
          <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-4">
            {isAdding ? 'Add New Friend' : 'Edit Friend'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                value={editingFriend.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role" className="form-label">Role</label>
              <input
                id="role"
                name="role"
                type="text"
                className="form-input"
                value={editingFriend.role}
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
                value={editingFriend.avatar}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="github" className="form-label">GitHub URL</label>
              <input
                id="github"
                name="github"
                type="text"
                className="form-input"
                value={editingFriend.github}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="btn-outline"
              onClick={() => setEditingFriend(null)}
              disabled={isSaving}
            >
              {t('common.cancel')}
            </button>
            
            <button
              type="button"
              className="btn-primary"
              onClick={handleSaveFriend}
              disabled={isSaving}
            >
              {isSaving ? t('common.loading') : t('common.save')}
            </button>
          </div>
        </div>
      )}
      
      {/* Friends list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {friends.map((friend) => (
          <div
            key={friend.name}
            className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:border-light-primary dark:hover:border-dark-primary transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-full overflow-hidden flex-shrink-0">
                {friend.avatar && (
                  <img 
                    src={friend.avatar} 
                    alt={friend.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                  {friend.name}
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted">
                  {friend.role}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="text-sm px-2 py-1 bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary rounded-md hover:bg-light-primary/20 dark:hover:bg-dark-primary/20"
                  onClick={() => handleEditFriend(friend)}
                  disabled={!!editingFriend}
                >
                  {t('common.edit')}
                </button>
                
                <button
                  className="text-sm px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50"
                  onClick={() => handleDeleteFriend(friend.name)}
                  disabled={isSaving || !!editingFriend}
                >
                  {t('common.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {friends.length === 0 && (
          <p className="text-light-muted dark:text-dark-muted text-center py-8 col-span-2">
            No friends yet. Click "Add Friend" to create one.
          </p>
        )}
      </div>
    </div>
  );
}

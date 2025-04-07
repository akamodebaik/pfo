import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

interface EditModalProps {
  item: any;
  type: string;
  open: boolean;
  onClose: () => void;
  onSave: (item: any, type: string) => void;
}

export default function EditModal({ item, type, open, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<any>(item);
  
  useEffect(() => {
    setFormData(item);
  }, [item]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };
  
  const handleLoadingPhrasesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const phrases = e.target.value.split('\n').filter(phrase => phrase.trim() !== '');
    setFormData(prev => ({ ...prev, loadingPhrases: phrases }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, type);
  };
  
  const renderFields = () => {
    switch (type) {
      case 'Bio':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title || ''} onChange={handleChange} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea 
                id="shortDescription" 
                name="shortDescription" 
                value={formData.shortDescription || ''} 
                onChange={handleChange}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="longDescription">Long Description</Label>
              <Textarea 
                id="longDescription" 
                name="longDescription" 
                value={formData.longDescription || ''} 
                onChange={handleChange}
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input id="education" name="education" value={formData.education || ''} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input id="experience" name="experience" value={formData.experience || ''} onChange={handleChange} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input id="avatar" name="avatar" value={formData.avatar || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workspaceImage">Workspace Image URL</Label>
              <Input id="workspaceImage" name="workspaceImage" value={formData.workspaceImage || ''} onChange={handleChange} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={formData.email || ''} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} />
              </div>
            </div>
          </>
        );
        
      case 'Skill':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name</Label>
              <Input id="icon" name="icon" value={formData.icon || ''} onChange={handleChange} />
              <p className="text-xs text-muted-foreground">Use icon names from Font Awesome (e.g., react, node-js, etc.)</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                value={formData.category || 'frontend'} 
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="language">Language</option>
                <option value="tools">Tools</option>
                <option value="styling">Styling</option>
              </select>
            </div>
          </>
        );
        
      case 'Interest':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Interest Name</Label>
              <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name</Label>
              <Input id="icon" name="icon" value={formData.icon || ''} onChange={handleChange} />
              <p className="text-xs text-muted-foreground">Use icon names from Font Awesome (e.g., code, book, camera, etc.)</p>
            </div>
          </>
        );
        
      case 'Project':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description || ''} 
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" value={formData.image || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={formData.tags?.join(', ') || ''} 
                onChange={handleTagsChange} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demoLink">Demo Link</Label>
                <Input id="demoLink" name="demoLink" value={formData.demoLink || ''} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sourceLink">Source Link</Label>
                <Input id="sourceLink" name="sourceLink" value={formData.sourceLink || ''} onChange={handleChange} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                value={formData.category || 'web'} 
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="web">Web App</option>
                <option value="ui">UI Design</option>
                <option value="mobile">Mobile App</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured" 
                  checked={formData.featured || false} 
                  onCheckedChange={(checked) => handleSwitchChange('featured', checked)} 
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input 
                id="order" 
                name="order" 
                type="number" 
                value={formData.order || 1} 
                onChange={handleChange} 
              />
            </div>
          </>
        );
        
      case 'Friend':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" value={formData.role || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description || ''} 
                onChange={handleChange}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" value={formData.image || ''} onChange={handleChange} />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input id="githubLink" name="githubLink" value={formData.githubLink || ''} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedinLink">LinkedIn Link</Label>
                <Input id="linkedinLink" name="linkedinLink" value={formData.linkedinLink || ''} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="websiteLink">Website Link</Label>
                <Input id="websiteLink" name="websiteLink" value={formData.websiteLink || ''} onChange={handleChange} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input 
                id="order" 
                name="order" 
                type="number" 
                value={formData.order || 1} 
                onChange={handleChange} 
              />
            </div>
          </>
        );
        
      case 'Update':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description || ''} 
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                name="date" 
                type="date" 
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                value={formData.category || 'feature'} 
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="feature">New Feature</option>
                <option value="enhancement">Enhancement</option>
                <option value="bug">Bug Fix</option>
                <option value="project">New Project</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input 
                id="order" 
                name="order" 
                type="number" 
                value={formData.order || 1} 
                onChange={handleChange} 
              />
            </div>
          </>
        );
        
      case 'Setting':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="musicFile">Music File Path</Label>
              <Input id="musicFile" name="musicFile" value={formData.musicFile || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="musicTitle">Music Title</Label>
              <Input id="musicTitle" name="musicTitle" value={formData.musicTitle || ''} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="themePrimary">Theme Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input id="themePrimary" name="themePrimary" value={formData.themePrimary || '#d4af37'} onChange={handleChange} />
                <div 
                  className="w-8 h-8 rounded-full border border-input" 
                  style={{ backgroundColor: formData.themePrimary || '#d4af37' }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="themeVariant">Theme Variant</Label>
              <select 
                id="themeVariant" 
                name="themeVariant" 
                value={formData.themeVariant || 'professional'} 
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="professional">Professional</option>
                <option value="tint">Tint</option>
                <option value="vibrant">Vibrant</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loadingPhrases">Loading Phrases (one per line)</Label>
              <Textarea 
                id="loadingPhrases" 
                name="loadingPhrases" 
                value={formData.loadingPhrases?.join('\n') || ''} 
                onChange={handleLoadingPhrasesChange}
                rows={5}
              />
            </div>
          </>
        );
        
      default:
        return <p>Unknown type: {type}</p>;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.id ? `Edit ${type}` : `Add New ${type}`}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {renderFields()}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save {type}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

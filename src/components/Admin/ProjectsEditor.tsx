'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Project } from '@/types';
import { generateRandomId } from '@/utils/helpers';

interface ProjectsEditorProps {
  projects: Project[];
  onUpdate: (projects: Project[]) => Promise<boolean>;
}

export default function ProjectsEditor({ projects: initialProjects, onUpdate }: ProjectsEditorProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t } = useLanguage();
  
  // Create empty project template
  const emptyProject: Project = {
    id: 0,
    name: '',
    description: {
      en: '',
      id: ''
    },
    image: '',
    technologies: [],
    url: '',
    github: ''
  };
  
  // Handle edit project
  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
    setIsAdding(false);
  };
  
  // Handle add new project
  const handleAddProject = () => {
    const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
    setEditingProject({ ...emptyProject, id: newId });
    setIsAdding(true);
  };
  
  // Handle delete project
  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }
    
    const updatedProjects = projects.filter(p => p.id !== id);
    setIsSaving(true);
    
    try {
      const success = await onUpdate(updatedProjects);
      
      if (success) {
        setProjects(updatedProjects);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProject) return;
    
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditingProject(prev => ({
        ...prev!,
        [parent]: {
          ...prev![parent as keyof Project],
          [child]: value,
        },
      }));
    } else {
      setEditingProject(prev => ({
        ...prev!,
        [name]: value,
      }));
    }
  };
  
  // Handle technologies change
  const handleTechnologiesChange = (value: string) => {
    if (!editingProject) return;
    
    const technologies = value.split(',').map(tech => tech.trim());
    setEditingProject(prev => ({
      ...prev!,
      technologies,
    }));
  };
  
  // Handle save project
  const handleSaveProject = async () => {
    if (!editingProject) return;
    
    setIsSaving(true);
    
    let updatedProjects: Project[];
    
    if (isAdding) {
      updatedProjects = [...projects, editingProject];
    } else {
      updatedProjects = projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      );
    }
    
    try {
      const success = await onUpdate(updatedProjects);
      
      if (success) {
        setProjects(updatedProjects);
        setEditingProject(null);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
          {t('admin.projects')}
        </h2>
        
        <button
          onClick={handleAddProject}
          className="btn-primary"
          disabled={!!editingProject}
        >
          Add Project
        </button>
      </div>
      
      {saveStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
          Projects updated successfully!
        </div>
      )}
      
      {saveStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          Failed to update projects. Please try again.
        </div>
      )}
      
      {/* Edit project form */}
      {editingProject && (
        <div className="mb-8 p-4 border border-light-border dark:border-dark-border rounded-lg">
          <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-4">
            {isAdding ? 'Add New Project' : 'Edit Project'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Project Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                value={editingProject.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image" className="form-label">Image URL</label>
              <input
                id="image"
                name="image"
                type="text"
                className="form-input"
                value={editingProject.image}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="url" className="form-label">Project URL</label>
              <input
                id="url"
                name="url"
                type="text"
                className="form-input"
                value={editingProject.url}
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
                value={editingProject.github}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="technologies" className="form-label">Technologies (comma separated)</label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              className="form-input"
              value={editingProject.technologies.join(', ')}
              onChange={(e) => handleTechnologiesChange(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="description.en" className="form-label">Description (English)</label>
            <textarea
              id="description.en"
              name="description.en"
              rows={3}
              className="form-input"
              value={editingProject.description.en}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group mb-6">
            <label htmlFor="description.id" className="form-label">Description (Indonesian)</label>
            <textarea
              id="description.id"
              name="description.id"
              rows={3}
              className="form-input"
              value={editingProject.description.id}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="btn-outline"
              onClick={() => setEditingProject(null)}
              disabled={isSaving}
            >
              {t('common.cancel')}
            </button>
            
            <button
              type="button"
              className="btn-primary"
              onClick={handleSaveProject}
              disabled={isSaving}
            >
              {isSaving ? t('common.loading') : t('common.save')}
            </button>
          </div>
        </div>
      )}
      
      {/* Projects list */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:border-light-primary dark:hover:border-dark-primary transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
                  {project.name}
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted mb-2">
                  {project.description.en}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs py-0.5 px-1.5 bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="text-sm px-3 py-1 bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary rounded-md hover:bg-light-primary/20 dark:hover:bg-dark-primary/20"
                  onClick={() => handleEditProject(project)}
                  disabled={!!editingProject}
                >
                  {t('common.edit')}
                </button>
                
                <button
                  className="text-sm px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50"
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={isSaving || !!editingProject}
                >
                  {t('common.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <p className="text-light-muted dark:text-dark-muted text-center py-8">
            No projects yet. Click "Add Project" to create one.
          </p>
        )}
      </div>
    </div>
  );
}

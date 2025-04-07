import { useState, useEffect } from 'react';
import { useLocation, Route, Switch } from 'wouter';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { queryClient, apiRequest } from '@/lib/queryClient';

import DashboardLayout from '@/components/admin/dashboard-layout';
import StatsCard from '@/components/admin/stats-card';
import DataTable from '@/components/admin/data-table';
import JsonEditor from '@/components/admin/json-editor';
import EditModal from '@/components/admin/edit-modal';

import { 
  IPortfolioData, 
  IBio, 
  ISkill, 
  IInterest, 
  IProject, 
  IFriend, 
  IUpdate, 
  ISettings
} from '@/types';

export default function AdminDashboard() {
  const [, params] = useLocation().match(/\/admin\/dashboard\/?([^/]*)/i) || [];
  const currentPage = params || 'overview';
  const { portfolioData, isLoading, refetchData } = usePortfolio();
  const { toast } = useToast();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [jsonData, setJsonData] = useState<IPortfolioData | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [editType, setEditType] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check-auth', {
          credentials: 'include'
        });
        
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        
        setIsAuthChecking(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = '/admin/login';
      }
    };
    
    checkAuth();
  }, []);

  // Set JSON data when portfolio data is loaded
  useEffect(() => {
    if (portfolioData) {
      setJsonData(portfolioData);
    }
  }, [portfolioData]);

  const handleEdit = (item: any, type: string) => {
    setEditItem(item);
    setEditType(type);
    setShowEditModal(true);
  };

  const handleSave = async (updatedItem: any, type: string) => {
    try {
      const endpoint = `/api/admin/${type.toLowerCase()}`;
      const method = updatedItem.id ? 'PUT' : 'POST';
      
      await apiRequest(method, endpoint, updatedItem);
      
      toast({
        title: 'Success',
        description: `${type} saved successfully`,
      });
      
      refetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Error',
        description: `Failed to save ${type}`,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number, type: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }
    
    try {
      await apiRequest('DELETE', `/api/admin/${type.toLowerCase()}/${id}`, undefined);
      
      toast({
        title: 'Success',
        description: `${type} deleted successfully`,
      });
      
      refetchData();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description: `Failed to delete ${type}`,
        variant: 'destructive',
      });
    }
  };

  const handleUpdateJson = async (data: IPortfolioData) => {
    try {
      await apiRequest('PUT', '/api/admin/portfolio', data);
      
      toast({
        title: 'Success',
        description: 'Portfolio data updated successfully',
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: 'Error',
        description: 'Failed to update portfolio data',
        variant: 'destructive',
      });
    }
  };

  const handleBackup = async () => {
    try {
      const res = await apiRequest('POST', '/api/admin/backup', undefined);
      const backupUrl = await res.text();
      
      // Create a download link
      const link = document.createElement('a');
      link.href = backupUrl;
      link.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Success',
        description: 'Backup created and downloaded successfully',
      });
    } catch (error) {
      console.error('Backup error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create backup',
        variant: 'destructive',
      });
    }
  };

  const handleRestore = async () => {
    const confirmed = confirm('Are you sure you want to restore default data? This will overwrite all current data.');
    if (!confirmed) return;
    
    try {
      await apiRequest('POST', '/api/admin/restore', undefined);
      
      toast({
        title: 'Success',
        description: 'Data restored to defaults',
      });
      
      refetchData();
    } catch (error) {
      console.error('Restore error:', error);
      toast({
        title: 'Error',
        description: 'Failed to restore default data',
        variant: 'destructive',
      });
    }
  };

  if (isAuthChecking || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="mt-4 text-lg text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout currentPage={currentPage}>
      <Switch>
        <Route path="/admin/dashboard/overview">
          <>
            <h1 className="text-3xl font-playfair font-bold mb-6">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatsCard title="Projects" value={portfolioData?.projects?.length || 0} icon="layout" />
              <StatsCard title="Skills" value={portfolioData?.skills?.length || 0} icon="code" />
              <StatsCard title="Friends" value={portfolioData?.friends?.length || 0} icon="users" />
              <StatsCard title="Updates" value={portfolioData?.updates?.length || 0} icon="rss" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
                {(portfolioData?.updates || []).slice(0, 5).map(update => (
                  <div key={update.id} className="mb-4 pb-4 border-b border-border last:border-none">
                    <h3 className="font-medium">{update.title}</h3>
                    <p className="text-sm text-muted-foreground">{new Date(update.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-card rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleBackup}
                    className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary font-medium transition-colors"
                  >
                    Create Backup
                  </button>
                  <button 
                    onClick={handleRestore}
                    className="p-4 bg-destructive/10 hover:bg-destructive/20 rounded-lg text-destructive font-medium transition-colors"
                  >
                    Restore Defaults
                  </button>
                  <button 
                    onClick={() => refetchData()}
                    className="p-4 bg-secondary hover:bg-secondary/70 rounded-lg text-foreground font-medium transition-colors"
                  >
                    Refresh Data
                  </button>
                  <button 
                    onClick={() => window.open('/', '_blank')}
                    className="p-4 bg-secondary hover:bg-secondary/70 rounded-lg text-foreground font-medium transition-colors"
                  >
                    View Site
                  </button>
                </div>
              </div>
            </div>
          </>
        </Route>
        
        <Route path="/admin/dashboard/bio">
          <DataTable 
            title="Bio Information"
            data={[portfolioData?.bio || {}]}
            onEdit={(item) => handleEdit(item, 'Bio')}
            omitColumns={['id']}
          />
        </Route>
        
        <Route path="/admin/dashboard/skills">
          <DataTable 
            title="Skills Management"
            data={portfolioData?.skills || []}
            onEdit={(item) => handleEdit(item, 'Skill')}
            onDelete={(id) => handleDelete(id, 'Skill')}
            onAdd={() => handleEdit({ name: '', icon: '', category: '' }, 'Skill')}
          />
        </Route>
        
        <Route path="/admin/dashboard/interests">
          <DataTable 
            title="Interests Management"
            data={portfolioData?.interests || []}
            onEdit={(item) => handleEdit(item, 'Interest')}
            onDelete={(id) => handleDelete(id, 'Interest')}
            onAdd={() => handleEdit({ name: '', icon: '' }, 'Interest')}
          />
        </Route>
        
        <Route path="/admin/dashboard/projects">
          <DataTable 
            title="Projects Management"
            data={portfolioData?.projects || []}
            onEdit={(item) => handleEdit(item, 'Project')}
            onDelete={(id) => handleDelete(id, 'Project')}
            onAdd={() => handleEdit({ 
              name: '', 
              description: '', 
              image: '', 
              tags: [], 
              category: 'web',
              featured: false,
              order: (portfolioData?.projects?.length || 0) + 1
            }, 'Project')}
            omitColumns={['tags']}
          />
        </Route>
        
        <Route path="/admin/dashboard/friends">
          <DataTable 
            title="Friends Management"
            data={portfolioData?.friends || []}
            onEdit={(item) => handleEdit(item, 'Friend')}
            onDelete={(id) => handleDelete(id, 'Friend')}
            onAdd={() => handleEdit({ 
              name: '', 
              role: '', 
              description: '', 
              image: '',
              order: (portfolioData?.friends?.length || 0) + 1
            }, 'Friend')}
          />
        </Route>
        
        <Route path="/admin/dashboard/updates">
          <DataTable 
            title="Updates Management"
            data={portfolioData?.updates || []}
            onEdit={(item) => handleEdit(item, 'Update')}
            onDelete={(id) => handleDelete(id, 'Update')}
            onAdd={() => handleEdit({ 
              title: '', 
              description: '', 
              date: new Date().toISOString(),
              category: 'feature',
              order: (portfolioData?.updates?.length || 0) + 1
            }, 'Update')}
          />
        </Route>
        
        <Route path="/admin/dashboard/settings">
          <DataTable 
            title="Settings Management"
            data={[portfolioData?.settings || {}]}
            onEdit={(item) => handleEdit(item, 'Setting')}
            omitColumns={['id', 'loadingPhrases']}
          />
        </Route>
        
        <Route path="/admin/dashboard/json-editor">
          <div className="bg-card rounded-xl shadow-sm p-6">
            <h1 className="text-3xl font-playfair font-bold mb-6">JSON Editor</h1>
            <p className="text-muted-foreground mb-6">
              Edit the raw JSON data directly. This is an advanced feature - be careful with your changes.
            </p>
            
            {jsonData && (
              <JsonEditor 
                data={jsonData} 
                onChange={setJsonData} 
                onSave={handleUpdateJson}
              />
            )}
          </div>
        </Route>
      </Switch>
      
      {showEditModal && (
        <EditModal
          item={editItem}
          type={editType}
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}

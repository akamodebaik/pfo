import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, RefreshCcw } from 'lucide-react';
import { IPortfolioData } from '@/types';

interface JsonEditorProps {
  data: IPortfolioData;
  onChange: (data: IPortfolioData) => void;
  onSave: (data: IPortfolioData) => void;
}

export default function JsonEditor({ data, onChange, onSave }: JsonEditorProps) {
  const [jsonString, setJsonString] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setJsonString(JSON.stringify(data, null, 2));
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(e.target.value);
    setError(null);
    
    try {
      const parsed = JSON.parse(e.target.value);
      onChange(parsed);
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
    }
  };

  const handleSave = () => {
    if (error) return;
    
    try {
      const parsed = JSON.parse(jsonString);
      onSave(parsed);
    } catch (err) {
      setError('Failed to save: ' + (err as Error).message);
    }
  };

  const handleReset = () => {
    setJsonString(JSON.stringify(data, null, 2));
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <Button 
            onClick={handleSave} 
            disabled={!!error}
            className="mr-2"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        
        {error && (
          <span className="text-sm text-destructive">{error}</span>
        )}
      </div>
      
      <div className="border border-input rounded-md bg-background">
        <textarea
          value={jsonString}
          onChange={handleChange}
          rows={20}
          className="w-full p-4 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
          spellCheck="false"
        />
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Note: This editor allows direct editing of the raw portfolio data. Be careful with your changes.</p>
        <p>Make sure the JSON is valid before saving.</p>
      </div>
    </div>
  );
}

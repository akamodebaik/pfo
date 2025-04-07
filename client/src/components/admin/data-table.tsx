import { useState } from 'react';
import { Edit, Trash2, Plus, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableProps {
  title: string;
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onAdd?: () => void;
  omitColumns?: string[];
}

export default function DataTable({ 
  title, 
  data, 
  onEdit, 
  onDelete, 
  onAdd,
  omitColumns = [] 
}: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  if (!data || data.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-playfair font-bold">{title}</h1>
          {onAdd && (
            <Button onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No data available. Click 'Add New' to create an entry.</p>
        </div>
      </div>
    );
  }
  
  // Get columns from the first item, excluding any in omitColumns
  const columns = Object.keys(data[0])
    .filter(col => !omitColumns.includes(col))
    .map(col => ({
      key: col,
      name: col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')
    }));
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc'
      ? (aValue > bValue ? 1 : -1)
      : (aValue < bValue ? 1 : -1);
  });
  
  const formatCellValue = (value: any, column: string) => {
    if (value === undefined || value === null) return '-';
    
    if (Array.isArray(value)) {
      if (column === 'loadingPhrases') {
        return `${value.length} phrases`;
      }
      return value.join(', ');
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    if (column === 'date' && typeof value === 'string' && value.includes('-')) {
      return new Date(value).toLocaleDateString();
    }
    
    if (typeof value === 'string' && value.length > 100) {
      return value.substring(0, 100) + '...';
    }
    
    return value;
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-playfair font-bold">{title}</h1>
        {onAdd && (
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        )}
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={column.key} className="whitespace-nowrap">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort(column.key)}
                  >
                    <span>{column.name}</span>
                    {sortColumn === column.key && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </button>
                </TableHead>
              ))}
              {(onEdit || onDelete) && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={row.id || index}>
                {columns.map(column => (
                  <TableCell key={column.key} className="whitespace-nowrap">
                    {formatCellValue(row[column.key], column.key)}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {onEdit && (
                        <Button variant="ghost" size="icon" onClick={() => onEdit(row)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && row.id && (
                        <Button variant="ghost" size="icon" onClick={() => onDelete(row.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

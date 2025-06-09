
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Plus, Pencil, Trash } from 'lucide-react';

interface Field {
  id: string;
  name: string;
  type: string;
  isRequired: boolean;
  defaultValue: string;
}

const FieldManagement = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [fields, setFields] = useState<Field[]>([
    {
      id: '1',
      name: 'First Name',
      type: 'text',
      isRequired: true,
      defaultValue: '',
    },
    {
      id: '2',
      name: 'Last Name',
      type: 'text',
      isRequired: true,
      defaultValue: '',
    },
    {
      id: '3',
      name: 'Email',
      type: 'email',
      isRequired: true,
      defaultValue: '',
    },
    {
      id: '4',
      name: 'Phone Number',
      type: 'tel',
      isRequired: false,
      defaultValue: '',
    },
    {
      id: '5',
      name: 'Age',
      type: 'number',
      isRequired: false,
      defaultValue: '18',
    },
  ]);
  const [currentField, setCurrentField] = useState<Field | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  const filteredFields = fields.filter(field => 
    field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fieldTypes = ['text', 'number', 'email', 'tel', 'date', 'textarea', 'select', 'checkbox', 'radio'];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddField = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const isRequired = formData.get('isRequired') === 'on';
    const defaultValue = formData.get('defaultValue') as string;
    
    const newField = {
      id: Date.now().toString(),
      name,
      type,
      isRequired,
      defaultValue,
    };
    
    setFields([...fields, newField]);
    setIsNewDialogOpen(false);
    toast({
      title: t('createSuccess'),
    });
  };

  const handleUpdateField = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentField) return;
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const isRequired = formData.get('isRequired') === 'on';
    const defaultValue = formData.get('defaultValue') as string;
    
    const updatedFields = fields.map(field => 
      field.id === currentField.id ? { ...field, name, type, isRequired, defaultValue } : field
    );
    
    setFields(updatedFields);
    setIsEditDialogOpen(false);
    toast({
      title: t('updateSuccess'),
    });
  };

  const handleDeleteField = (id: string) => {
    const updatedFields = fields.filter(field => field.id !== id);
    setFields(updatedFields);
    toast({
      title: t('deleteSuccess'),
    });
  };

  const editField = (field: Field) => {
    setCurrentField(field);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('fieldManagement')}</h1>
        <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('create')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddField}>
              <DialogHeader>
                <DialogTitle>{t('create')}</DialogTitle>
                <DialogDescription>
                  Add a new field.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <select 
                    id="type" 
                    name="type" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="text"
                  >
                    {fieldTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isRequired" 
                    name="isRequired"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="isRequired">Required Field</Label>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="defaultValue">Default Value</Label>
                  <Input id="defaultValue" name="defaultValue" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{t('save')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`${t('search')}...`}
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Default Value</TableHead>
              <TableHead className="text-right">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFields.map((field) => (
              <TableRow key={field.id}>
                <TableCell className="font-medium">{field.name}</TableCell>
                <TableCell>{field.type}</TableCell>
                <TableCell>
                  {field.isRequired ? (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {field.defaultValue || <span className="text-muted-foreground italic">None</span>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => editField(field)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t('deleteConfirm')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteField(field.id)}>{t('delete')}</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredFields.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {currentField && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <form onSubmit={handleUpdateField}>
              <DialogHeader>
                <DialogTitle>{t('edit')}</DialogTitle>
                <DialogDescription>
                  Edit field properties.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">{t('name')}</Label>
                  <Input 
                    id="edit-name" 
                    name="name" 
                    defaultValue={currentField.name} 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <select 
                    id="edit-type" 
                    name="type" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue={currentField.type}
                  >
                    {fieldTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="edit-isRequired" 
                    name="isRequired"
                    defaultChecked={currentField.isRequired}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="edit-isRequired">Required Field</Label>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-defaultValue">Default Value</Label>
                  <Input 
                    id="edit-defaultValue" 
                    name="defaultValue" 
                    defaultValue={currentField.defaultValue} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{t('save')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FieldManagement;

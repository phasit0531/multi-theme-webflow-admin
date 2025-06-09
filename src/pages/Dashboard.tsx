
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';

const Dashboard = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('masterData'),
      value: '1,234',
      description: 'Total records',
      icon: FileText,
    },
    {
      title: t('users'),
      value: '56',
      description: 'Active users',
      icon: LayoutDashboard,
    },
    {
      title: t('settings'),
      value: '12',
      description: 'Configurations',
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h3 className="font-medium">{t('create')}</h3>
              <p className="text-sm text-muted-foreground">Add new records</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h3 className="font-medium">{t('search')}</h3>
              <p className="text-sm text-muted-foreground">Find existing data</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h3 className="font-medium">{t('update')}</h3>
              <p className="text-sm text-muted-foreground">Modify records</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h3 className="font-medium">{t('delete')}</h3>
              <p className="text-sm text-muted-foreground">Remove data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

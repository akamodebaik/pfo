import { 
  LayoutDashboard, 
  Code, 
  Users, 
  Rss, 
  Briefcase, 
  Heart, 
  User, 
  FileJson, 
  Sliders, 
  Home,
  LucideIcon
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  change?: number;
}

export default function StatsCard({ title, value, icon, change }: StatsCardProps) {
  const getIcon = () => {
    const iconMap: Record<string, JSX.Element> = {
      'dashboard': <LayoutDashboard className="h-6 w-6" />,
      'code': <Code className="h-6 w-6" />,
      'users': <Users className="h-6 w-6" />,
      'rss': <Rss className="h-6 w-6" />,
      'layout': <Briefcase className="h-6 w-6" />,
      'heart': <Heart className="h-6 w-6" />,
      'user': <User className="h-6 w-6" />,
      'json': <FileJson className="h-6 w-6" />,
      'sliders': <Sliders className="h-6 w-6" />,
      'home': <Home className="h-6 w-6" />
    };
    
    return iconMap[icon] || <LayoutDashboard className="h-6 w-6" />;
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {getIcon()}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '+' : ''}{change}% from last period
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

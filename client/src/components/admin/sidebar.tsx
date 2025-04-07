import { Link } from 'wouter';
import {
  LayoutDashboard,
  User,
  Code,
  Heart,
  Briefcase,
  Users,
  Rss,
  Sliders,
  FileJson,
  Home
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
}

export default function Sidebar({ currentPage }: SidebarProps) {
  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard className="h-5 w-5" />, path: 'overview' },
    { name: 'Bio', icon: <User className="h-5 w-5" />, path: 'bio' },
    { name: 'Skills', icon: <Code className="h-5 w-5" />, path: 'skills' },
    { name: 'Interests', icon: <Heart className="h-5 w-5" />, path: 'interests' },
    { name: 'Projects', icon: <Briefcase className="h-5 w-5" />, path: 'projects' },
    { name: 'Friends', icon: <Users className="h-5 w-5" />, path: 'friends' },
    { name: 'Updates', icon: <Rss className="h-5 w-5" />, path: 'updates' },
    { name: 'Settings', icon: <Sliders className="h-5 w-5" />, path: 'settings' },
    { name: 'JSON Editor', icon: <FileJson className="h-5 w-5" />, path: 'json-editor' },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-border hidden md:block">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-playfair font-bold">A</span>
          </div>
          <span className="text-xl font-playfair font-bold text-sidebar-foreground">Aka Admin</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={`/admin/dashboard/${item.path}`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.path 
                  ? 'bg-sidebar-primary/10 text-sidebar-primary' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          <div className="py-3 border-t border-sidebar-border my-4"></div>

          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            target="_blank"
          >
            <Home className="h-5 w-5" />
            <span>View Website</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}

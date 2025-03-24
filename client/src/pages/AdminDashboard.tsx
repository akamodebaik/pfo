import { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useToast } from '@/hooks/use-toast';
import { fetchIpAddress } from '@/lib/utils';
import { projectsData } from '@/data/projectsData';
import { skillsData } from '@/data/skillsData';
import { friendsData } from '@/data/friendsData';
import { SkillIcon } from '@/components/icons/SkillIcons';
import {
  LogOut, 
  Settings, 
  ShieldAlert, 
  User as UserIcon,
  LayoutDashboard
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboard() {
  const { isSoundPlaying, toggleSound, visitorCount } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const { time, date, batteryLevel, batteryCharging } = useRealTimeData();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [username, setUsername] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('Loading...');
  const [projectsVisible, setProjectsVisible] = useState(true);
  const [skillsVisible, setSkillsVisible] = useState(true);
  const [friendsVisible, setFriendsVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(true);

  useEffect(() => {
    // Get IP address
    async function getIp() {
      try {
        const ip = await fetchIpAddress();
        setIpAddress(ip);
      } catch (error) {
        setIpAddress('Could not retrieve IP');
      }
    }
    getIp();
    
    // Get admin username from localStorage
    try {
      const authUser = localStorage.getItem('authUser');
      if (authUser) {
        const user = JSON.parse(authUser);
        setUsername(user.username || 'Admin');
      }
    } catch (error) {
      console.error('Error parsing auth user:', error);
    }
  }, []);

  const handleSaveSettings = () => {
    toast({
      title: 'Settings saved',
      description: 'Your website settings have been updated',
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authUser');
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of the admin dashboard',
    });
    setTimeout(() => {
      setLocation('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Control your portfolio website</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline">Back to Website</Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-gold/30 bg-gold/10">
                <UserIcon className="h-5 w-5 text-gold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{username}</p>
                  <p className="text-xs leading-none text-muted-foreground">Administrator</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setLocation('/admin')}>
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                <span>Security</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-500 focus:text-red-500" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Info</CardTitle>
            <CardDescription>View live website statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-muted-foreground mb-1">Current Time</div>
              <div className="text-2xl font-bold">{time}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Today's Date</div>
              <div className="text-2xl font-bold">{date}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">IP Address</div>
              <div className="text-2xl font-bold">{ipAddress}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Visitor Count</div>
              <div className="text-2xl font-bold">{visitorCount}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Battery Status</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{batteryLevel !== null ? `${batteryLevel}%` : 'N/A'}</div>
                {batteryCharging && <span className="text-green-500">(Charging)</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Global Settings</CardTitle>
            <CardDescription>Manage website appearance and sound</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-mode">Dark Mode</Label>
              <Switch 
                id="theme-mode" 
                checked={theme === 'dark'}
                onCheckedChange={(checked) => {
                  if ((checked && theme === 'light') || (!checked && theme === 'dark')) {
                    toggleTheme();
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="bg-music">Background Music</Label>
              <Switch 
                id="bg-music" 
                checked={isSoundPlaying}
                onCheckedChange={toggleSound}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Section Visibility</CardTitle>
            <CardDescription>Control which sections are displayed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="projects-visible">Projects Section</Label>
              <Switch 
                id="projects-visible" 
                checked={projectsVisible}
                onCheckedChange={setProjectsVisible}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="skills-visible">Skills Section</Label>
              <Switch 
                id="skills-visible" 
                checked={skillsVisible}
                onCheckedChange={setSkillsVisible}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="friends-visible">Friends Section</Label>
              <Switch 
                id="friends-visible" 
                checked={friendsVisible}
                onCheckedChange={setFriendsVisible}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="contact-visible">Contact Section</Label>
              <Switch 
                id="contact-visible" 
                checked={contactVisible}
                onCheckedChange={setContactVisible}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSaveSettings}>Save Settings</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="settings">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-4">
            <Card className="border-gold/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center shimmer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-gold"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </span>
                  Projects Management
                </CardTitle>
                <CardDescription>Add, edit or remove your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {projectsData.map((project, index) => (
                    <div key={project.id} className="flex items-start gap-4 p-3 rounded-lg border border-border hover:border-gold/30 transition-all">
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{project.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${project.tagColor} bg-opacity-10`}>
                            {project.tag}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-muted">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="text-xs p-1.5 rounded bg-muted hover:bg-muted/80 transition-colors">
                          Edit
                        </button>
                        <button className="text-xs p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4 bg-gold hover:bg-darkGold text-white btn-hover-effect">
                  Add New Project
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills" className="mt-4">
            <Card className="border-gold/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center shimmer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-gold"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                  </span>
                  Skills Management
                </CardTitle>
                <CardDescription>Update your skills and proficiency levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:border-gold/30 transition-all">
                      <div className="h-12 w-12 rounded-md overflow-hidden flex items-center justify-center" style={{backgroundColor: skill.bgLight}}>
                        <SkillIcon iconKey={skill.iconKey} size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{skill.name}</h4>
                          <span className="text-xs font-medium">{skill.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{
                              width: `${skill.percentage}%`, 
                              backgroundColor: skill.barColor
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="text-xs p-1.5 rounded bg-muted hover:bg-muted/80 transition-colors">
                          Edit
                        </button>
                        <button className="text-xs p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4 bg-gold hover:bg-darkGold text-white btn-hover-effect">
                  Add New Skill
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="friends" className="mt-4">
            <Card className="border-gold/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center shimmer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-gold"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </span>
                  Friends Management
                </CardTitle>
                <CardDescription>Add or remove friends from your showcase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {friendsData && friendsData.map((friend, index) => (
                    <div key={friend.id} className="flex items-start gap-4 p-3 rounded-lg border border-border hover:border-gold/30 transition-all">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <img src={friend.image} alt={friend.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{friend.name}</h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold">
                            {friend.role}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{friend.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {friend.social.github && (
                            <a href={friend.social.github} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-gold transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                          )}
                          {friend.social.tiktok && (
                            <a href={friend.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-gold transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path><path d="M20 9V7a4 4 0 0 0-4-4h-2"></path><path d="M15 5.8V9a4 4 0 0 1-4 4H5a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V5.8"></path></svg>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="text-xs p-1.5 rounded bg-muted hover:bg-muted/80 transition-colors">
                          Edit
                        </button>
                        <button className="text-xs p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4 bg-gold hover:bg-darkGold text-white btn-hover-effect">
                  Add New Friend
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card className="border-gold/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center shimmer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-gold"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </span>
                  Advanced Settings
                </CardTitle>
                <CardDescription>Configure advanced website settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="api-key" className="text-sm font-medium">API Key</Label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                      <Input 
                        type="password" 
                        id="api-key" 
                        placeholder="Enter API key" 
                        className="pl-10 border-gold/20 focus:border-gold/40"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Used for external services integration
                    </p>
                  </div>
                  
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="analytics-id" className="text-sm font-medium">Analytics ID</Label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                      <Input 
                        type="text" 
                        id="analytics-id" 
                        placeholder="Enter analytics ID" 
                        className="pl-10 border-gold/20 focus:border-gold/40"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For website traffic tracking
                    </p>
                  </div>
                  
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="site-name" className="text-sm font-medium">Website Name</Label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"><path d="M2 3h20"></path><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path><path d="m7 21 5-5 5 5"></path></svg>
                      <Input 
                        type="text" 
                        id="site-name" 
                        placeholder="Enter website name" 
                        className="pl-10 border-gold/20 focus:border-gold/40"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sets the title in browser tabs and SEO
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Deployment Configuration</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-md border border-border hover:border-gold/30 transition-all">
                      <input type="checkbox" id="vercel" className="h-4 w-4 accent-gold" />
                      <Label htmlFor="vercel" className="text-xs cursor-pointer">Vercel</Label>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md border border-border hover:border-gold/30 transition-all">
                      <input type="checkbox" id="github" className="h-4 w-4 accent-gold" />
                      <Label htmlFor="github" className="text-xs cursor-pointer">GitHub Pages</Label>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md border border-border hover:border-gold/30 transition-all">
                      <input type="checkbox" id="glitch" className="h-4 w-4 accent-gold" />
                      <Label htmlFor="glitch" className="text-xs cursor-pointer">Glitch</Label>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md border border-border hover:border-gold/30 transition-all">
                      <input type="checkbox" id="railway" className="h-4 w-4 accent-gold" />
                      <Label htmlFor="railway" className="text-xs cursor-pointer">Railway</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gold hover:bg-darkGold text-white btn-hover-effect" onClick={handleSaveSettings}>
                  Save Advanced Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
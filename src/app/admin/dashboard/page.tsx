"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  Calendar,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
  ChevronDown,
  Plus,
  Trash,
  Edit,
  FileText,
  Image
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()
  
  // This would be replaced with actual authentication in a real implementation
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    // Simulating checking authentication
    // In a real implementation, this would validate a token or session
    const checkAuth = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // For demo purposes, we're setting authentication to true
      // In a real app, this would verify the user's login status
      setIsAuthenticated(true)
    }
    
    checkAuth()
  }, [])
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])
  
  const handleLogout = () => {
    // In a real implementation, this would make an API call to log out
    // For now, just redirect to login page
    router.push("/admin/login")
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin mr-2">
          <svg
            className="h-8 w-8 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <span>Loading...</span>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card hidden md:flex md:flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Aka
            </span>
            <span className="text-sm font-medium">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              activeTab === "dashboard"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              activeTab === "profile"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              activeTab === "projects"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Projects</span>
          </button>
          
          <button
            onClick={() => setActiveTab("friends")}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              activeTab === "friends"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Friends</span>
          </button>
          
          <button
            onClick={() => setActiveTab("updates")}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              activeTab === "updates"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>Updates</span>
          </button>
          
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              activeTab === "messages"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </button>
          
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              activeTab === "analytics"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </button>
          
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
              activeTab === "settings"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>
        
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-accent">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              
              <Link href="/" className="flex items-center space-x-2 md:hidden">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Aka
                </span>
                <span className="text-sm font-medium">Admin</span>
              </Link>
              
              <div className="ml-4 md:ml-0">
                <h1 className="text-lg font-semibold">Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">View Site</span>
              </Link>
              
              <div className="relative">
                <button className="flex items-center space-x-1 p-1 rounded-full bg-accent/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    A
                  </div>
                  <span className="text-sm font-medium pr-1 hidden sm:inline">Aka</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                      <h3 className="text-3xl font-bold mt-2">12</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Friends</p>
                      <h3 className="text-3xl font-bold mt-2">24</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Unread Messages</p>
                      <h3 className="text-3xl font-bold mt-2">7</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Recent Messages</h3>
                    <button className="text-sm text-primary hover:text-primary/80">View all</button>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div className="flex space-x-3">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                              <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">John Doe</p>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                Hello, I'm interested in working with you on a new project...
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Recent Updates</h3>
                    <button className="text-sm text-primary hover:text-primary/80">View all</button>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex space-x-3">
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">New Website Launch</p>
                            <p className="text-sm text-muted-foreground">
                              Successfully launched the new company website
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">June 20, 2024</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Recent Projects</h3>
                  <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80">
                    <Plus className="h-4 w-4 mr-1" /> Add New Project
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-3 py-3.5 text-left text-sm font-medium text-muted-foreground tracking-wider">
                          Project
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-medium text-muted-foreground tracking-wider">
                          Category
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-medium text-muted-foreground tracking-wider">
                          Status
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-medium text-muted-foreground tracking-wider">
                          Date
                        </th>
                        <th className="relative px-3 py-3.5">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        {
                          name: "E-Commerce Website",
                          category: "Web Development",
                          status: "Completed",
                          date: "Jun 15, 2024",
                        },
                        {
                          name: "Mobile App UI",
                          category: "UI Design",
                          status: "In Progress",
                          date: "Jun 10, 2024",
                        },
                        {
                          name: "Portfolio Redesign",
                          category: "Web Development",
                          status: "Pending",
                          date: "Jun 5, 2024",
                        },
                      ].map((project, i) => (
                        <tr key={i}>
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                            {project.name}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {project.category}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                project.status === "Completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500"
                                  : project.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-500"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-500"
                              }`}
                            >
                              {project.status}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {project.date}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right text-sm space-x-2">
                            <button className="text-muted-foreground hover:text-foreground">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-muted-foreground hover:text-destructive">
                              <Trash className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== "dashboard" && (
            <div className="flex items-center justify-center h-[calc(100vh-9rem)]">
              <div className="text-center">
                <h2 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                <p className="text-muted-foreground mt-2">This section is under development.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
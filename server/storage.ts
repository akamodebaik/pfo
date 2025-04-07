import {
  users,
  type User,
  type InsertUser,
  bio,
  type Bio,
  type InsertBio,
  skills,
  type Skill,
  type InsertSkill,
  interests,
  type Interest,
  type InsertInterest,
  projects,
  type Project,
  type InsertProject,
  friends,
  type Friend,
  type InsertFriend,
  updates,
  type Update,
  type InsertUpdate,
  settings,
  type Setting,
  type InsertSetting,
} from "@shared/schema";

// The IStorage interface defines all operations our storage supports
import session from "express-session";
import MemoryStore from 'memorystore';
import * as fs from 'fs/promises';
import * as path from 'path';

const MemoryStoreSession = MemoryStore(session);

export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyAdminCredentials(username: string, password: string): Promise<boolean>;

  // Bio operations
  getBio(): Promise<Bio | undefined>;
  updateBio(bioData: InsertBio): Promise<Bio>;

  // Skills operations
  getSkills(): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(skill: Partial<Skill> & { id: number }): Promise<Skill>;
  deleteSkill(id: number): Promise<void>;

  // Interests operations
  getInterests(): Promise<Interest[]>;
  getInterest(id: number): Promise<Interest | undefined>;
  createInterest(interest: InsertInterest): Promise<Interest>;
  updateInterest(interest: Partial<Interest> & { id: number }): Promise<Interest>;
  deleteInterest(id: number): Promise<void>;

  // Projects operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(project: Partial<Project> & { id: number }): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Friends operations
  getFriends(): Promise<Friend[]>;
  getFriend(id: number): Promise<Friend | undefined>;
  createFriend(friend: InsertFriend): Promise<Friend>;
  updateFriend(friend: Partial<Friend> & { id: number }): Promise<Friend>;
  deleteFriend(id: number): Promise<void>;

  // Updates operations
  getUpdates(): Promise<Update[]>;
  getUpdate(id: number): Promise<Update | undefined>;
  createUpdate(update: InsertUpdate): Promise<Update>;
  updateUpdate(update: Partial<Update> & { id: number }): Promise<Update>;
  deleteUpdate(id: number): Promise<void>;

  // Settings operations
  getSettings(): Promise<Setting | undefined>;
  updateSettings(setting: Partial<Setting> & { id: number }): Promise<Setting>;

  // Portfolio operations
  updatePortfolio(data: any): Promise<void>;
  createBackup(): Promise<any>;
  restoreDefaults(): Promise<void>;
}

export class MemStorage implements IStorage {
  private userData: Map<number, User>;
  private bioData: Map<number, Bio>;
  private skillsData: Map<number, Skill>;
  private interestsData: Map<number, Interest>;
  private projectsData: Map<number, Project>;
  private friendsData: Map<number, Friend>;
  private updatesData: Map<number, Update>;
  private settingsData: Map<number, Setting>;
  public sessionStore: session.Store;
  private databasePath: string;
  private currentIds: {
    users: number;
    bio: number;
    skills: number;
    interests: number;
    projects: number;
    friends: number;
    updates: number;
    settings: number;
  };

  constructor() {
    this.sessionStore = new MemoryStoreSession({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    this.userData = new Map();
    this.bioData = new Map();
    this.skillsData = new Map();
    this.interestsData = new Map();
    this.projectsData = new Map();
    this.friendsData = new Map();
    this.updatesData = new Map();
    this.settingsData = new Map();
    this.databasePath = path.join(process.cwd(), 'database.json');
    this.currentIds = {
      users: 1,
      bio: 1,
      skills: 1,
      interests: 1,
      projects: 1,
      friends: 1,
      updates: 1,
      settings: 1,
    };

    // Initialize with data from database.json or default data
    this.loadFromDatabaseJson();
  }
  
  private async loadFromDatabaseJson() {
    try {
      // Check if database.json exists
      await fs.access(this.databasePath);
      
      // Read and parse database.json
      const data = JSON.parse(await fs.readFile(this.databasePath, 'utf-8'));
      
      // Load users
      if (data.users && Array.isArray(data.users)) {
        data.users.forEach((user: User) => {
          this.userData.set(user.id, user);
          this.currentIds.users = Math.max(this.currentIds.users, user.id + 1);
        });
      }
      
      // Load bio
      if (data.bio) {
        this.bioData.set(data.bio.id, data.bio);
        this.currentIds.bio = Math.max(this.currentIds.bio, data.bio.id + 1);
      }
      
      // Load skills
      if (data.skills && Array.isArray(data.skills)) {
        data.skills.forEach((skill: Skill) => {
          this.skillsData.set(skill.id, skill);
          this.currentIds.skills = Math.max(this.currentIds.skills, skill.id + 1);
        });
      }
      
      // Load interests
      if (data.interests && Array.isArray(data.interests)) {
        data.interests.forEach((interest: Interest) => {
          this.interestsData.set(interest.id, interest);
          this.currentIds.interests = Math.max(this.currentIds.interests, interest.id + 1);
        });
      }
      
      // Load projects
      if (data.projects && Array.isArray(data.projects)) {
        data.projects.forEach((project: Project) => {
          this.projectsData.set(project.id, project);
          this.currentIds.projects = Math.max(this.currentIds.projects, project.id + 1);
        });
      }
      
      // Load friends
      if (data.friends && Array.isArray(data.friends)) {
        data.friends.forEach((friend: Friend) => {
          this.friendsData.set(friend.id, friend);
          this.currentIds.friends = Math.max(this.currentIds.friends, friend.id + 1);
        });
      }
      
      // Load updates
      if (data.updates && Array.isArray(data.updates)) {
        data.updates.forEach((update: Update) => {
          this.updatesData.set(update.id, update);
          this.currentIds.updates = Math.max(this.currentIds.updates, update.id + 1);
        });
      }
      
      // Load settings
      if (data.settings) {
        this.settingsData.set(data.settings.id, data.settings);
        this.currentIds.settings = Math.max(this.currentIds.settings, data.settings.id + 1);
      }
      
      console.log('Data loaded from database.json successfully.');
    } catch (error) {
      console.error('Error loading from database.json:', error);
      console.log('Initializing with default data instead.');
      this.initializeDefaultData();
    }
  }
  
  private async saveToDatabaseJson() {
    try {
      const data = {
        users: Array.from(this.userData.values()),
        bio: this.bioData.get(1),
        skills: Array.from(this.skillsData.values()),
        interests: Array.from(this.interestsData.values()),
        projects: Array.from(this.projectsData.values()),
        friends: Array.from(this.friendsData.values()),
        updates: Array.from(this.updatesData.values()),
        settings: this.settingsData.get(1)
      };
      
      await fs.writeFile(this.databasePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log('Data saved to database.json successfully.');
    } catch (error) {
      console.error('Error saving to database.json:', error);
    }
  }

  private initializeDefaultData() {
    // Create admin user
    this.createUser({
      username: "aka",
      password: "akaanakbaik17!",
    });

    // Initialize Bio
    this.bioData.set(1, {
      id: 1,
      name: "Aka",
      title: "Web Developer",
      location: "West Sumatra, Indonesia",
      shortDescription:
        "Crafting elegant digital experiences with modern technologies. Focused on creating responsive, accessible and high-performance web applications.",
      longDescription:
        "Hello! I'm Aka, a passionate web developer based in West Sumatra, Indonesia. My journey in web development started when I was 15 years old, tinkering with HTML and CSS to create simple websites.\n\nOver the years, I've evolved into a full-stack developer with expertise in modern frontend frameworks like React, Next.js, and Vue.js, as well as backend technologies such as Node.js, Express, and MongoDB.\n\nI believe in creating web experiences that are not only visually appealing but also accessible, performant, and user-friendly. My approach combines technical precision with creative problem-solving.",
      education: "Computer Science, University of Indonesia",
      experience: "3+ years in Web Development",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      workspaceImage:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1pbmltYWwlMjB3b3Jrc3BhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      email: "contact@aka.dev",
      phone: "+62 812 3456 7890",
      language: "en",
    });

    // Initialize Skills
    const defaultSkills = [
      { name: "React", icon: "react", category: "frontend" },
      { name: "Node.js", icon: "node-js", category: "backend" },
      { name: "TypeScript", icon: "typescript", category: "language" },
      { name: "TailwindCSS", icon: "tailwind", category: "styling" },
      { name: "MongoDB", icon: "mongodb", category: "database" },
      { name: "Git", icon: "git", category: "tools" },
    ];

    defaultSkills.forEach((skill, index) => {
      this.skillsData.set(index + 1, {
        id: index + 1,
        ...skill,
      });
    });
    this.currentIds.skills = defaultSkills.length + 1;

    // Initialize Interests
    const defaultInterests = [
      { name: "Web Development", icon: "code" },
      { name: "Hiking", icon: "mountain" },
      { name: "Reading", icon: "book" },
      { name: "Photography", icon: "camera" },
    ];

    defaultInterests.forEach((interest, index) => {
      this.interestsData.set(index + 1, {
        id: index + 1,
        ...interest,
      });
    });
    this.currentIds.interests = defaultInterests.length + 1;

    // Initialize Projects
    const defaultProjects = [
      {
        name: "LuxeStay - Premium Booking Platform",
        description:
          "A high-end accommodation booking platform built with Next.js and TailwindCSS. Features include real-time availability, integrated payment processing, and personalized recommendations.",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        tags: ["Next.js", "TypeScript", "TailwindCSS", "Prisma"],
        demoLink: "#",
        sourceLink: "#",
        featured: true,
        category: "web",
        order: 1,
      },
      {
        name: "FinTrack - Financial Dashboard",
        description:
          "A comprehensive financial tracking dashboard with expense categorization, budget planning, and visual analytics. Built with React and Chart.js with a clean, intuitive interface.",
        image:
          "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        tags: ["React", "Redux", "Chart.js", "Firebase"],
        demoLink: "#",
        sourceLink: "#",
        featured: false,
        category: "web",
        order: 2,
      },
      {
        name: "EcoMart - Sustainable E-Commerce",
        description:
          "An e-commerce platform focused on eco-friendly products with product filtering, user reviews, and secure checkout. Features a carbon footprint calculator for each purchase.",
        image:
          "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        tags: ["Next.js", "Stripe", "MongoDB", "TailwindCSS"],
        demoLink: "#",
        sourceLink: "#",
        featured: false,
        category: "web",
        order: 3,
      },
    ];

    defaultProjects.forEach((project, index) => {
      this.projectsData.set(index + 1, {
        id: index + 1,
        ...project,
      });
    });
    this.currentIds.projects = defaultProjects.length + 1;

    // Initialize Friends
    const defaultFriends = [
      {
        name: "John Smith",
        role: "Senior Backend Developer",
        description: "Specializes in scalable APIs and cloud architecture",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        githubLink: "#",
        linkedinLink: "#",
        websiteLink: "#",
        order: 1,
      },
      {
        name: "Emily Chen",
        role: "UI/UX Designer",
        description: "Creates beautiful and intuitive user experiences",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        githubLink: "#",
        linkedinLink: "#",
        websiteLink: "#",
        order: 2,
      },
      {
        name: "David Rodriguez",
        role: "Frontend Developer",
        description: "React expert with a passion for animations",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        githubLink: "#",
        linkedinLink: "#",
        websiteLink: "#",
        order: 3,
      },
      {
        name: "Sarah Johnson",
        role: "Full-Stack Developer",
        description: "MERN stack specialist and tech blogger",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        githubLink: "#",
        linkedinLink: "#",
        websiteLink: "#",
        order: 4,
      },
    ];

    defaultFriends.forEach((friend, index) => {
      this.friendsData.set(index + 1, {
        id: index + 1,
        ...friend,
      });
    });
    this.currentIds.friends = defaultFriends.length + 1;

    // Initialize Updates
    const defaultUpdates = [
      {
        title: "Added Dark Mode Support",
        description:
          "Implemented smooth dark mode transition with automatic system preference detection and manual toggle option for better accessibility.",
        date: new Date("2023-10-15T00:00:00Z"),
        category: "feature",
        order: 1,
      },
      {
        title: "Improved Animation Performance",
        description:
          "Optimized all Framer Motion animations for better performance on mobile devices and reduced layout shifts during transitions.",
        date: new Date("2023-10-10T00:00:00Z"),
        category: "enhancement",
        order: 2,
      },
      {
        title: "Fixed Mobile Navigation Issues",
        description:
          "Resolved navigation menu display problems on smaller screens and improved touch interaction areas for better mobile usability.",
        date: new Date("2023-10-05T00:00:00Z"),
        category: "bug",
        order: 3,
      },
      {
        title: "Added EcoMart Project",
        description:
          "Launched a new sustainable e-commerce project with innovative features and comprehensive documentation.",
        date: new Date("2023-10-01T00:00:00Z"),
        category: "project",
        order: 4,
      },
    ];

    defaultUpdates.forEach((update, index) => {
      this.updatesData.set(index + 1, {
        id: index + 1,
        ...update,
      });
    });
    this.currentIds.updates = defaultUpdates.length + 1;

    // Initialize Settings
    this.settingsData.set(1, {
      id: 1,
      musicFile: "/music/background.mp3",
      musicTitle: "Elegant Atmosphere",
      themePrimary: "#d4af37",
      themeVariant: "professional",
      loadingPhrases: [
        "Preparing greatness...",
        "Loading Aka's energy...",
        "Crafting premium experience...",
        "Polishing the interface...",
        "Arranging the pixels...",
        "Charging creative powers...",
        "Setting up workspace...",
        "Collecting inspirations...",
        "Brewing code magic...",
      ],
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.userData.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.userData.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = { ...insertUser, id };
    this.userData.set(id, user);
    return user;
  }

  async verifyAdminCredentials(
    username: string,
    password: string
  ): Promise<boolean> {
    const user = await this.getUserByUsername(username);
    if (!user) return false;
    return user.password === password;
  }

  // Bio operations
  async getBio(): Promise<Bio | undefined> {
    return this.bioData.get(1);
  }

  async updateBio(bioData: InsertBio): Promise<Bio> {
    const currentBio = await this.getBio();
    const updatedBio: Bio = {
      id: 1,
      ...bioData,
    };
    this.bioData.set(1, updatedBio);
    return updatedBio;
  }

  // Skills operations
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skillsData.values());
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skillsData.get(id);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.currentIds.skills++;
    const newSkill: Skill = { ...skill, id };
    this.skillsData.set(id, newSkill);
    return newSkill;
  }

  async updateSkill(
    skill: Partial<Skill> & { id: number }
  ): Promise<Skill> {
    const existingSkill = await this.getSkill(skill.id);
    if (!existingSkill) {
      throw new Error(`Skill with ID ${skill.id} not found`);
    }
    const updatedSkill = { ...existingSkill, ...skill };
    this.skillsData.set(skill.id, updatedSkill);
    return updatedSkill;
  }

  async deleteSkill(id: number): Promise<void> {
    this.skillsData.delete(id);
  }

  // Interests operations
  async getInterests(): Promise<Interest[]> {
    return Array.from(this.interestsData.values());
  }

  async getInterest(id: number): Promise<Interest | undefined> {
    return this.interestsData.get(id);
  }

  async createInterest(interest: InsertInterest): Promise<Interest> {
    const id = this.currentIds.interests++;
    const newInterest: Interest = { ...interest, id };
    this.interestsData.set(id, newInterest);
    return newInterest;
  }

  async updateInterest(
    interest: Partial<Interest> & { id: number }
  ): Promise<Interest> {
    const existingInterest = await this.getInterest(interest.id);
    if (!existingInterest) {
      throw new Error(`Interest with ID ${interest.id} not found`);
    }
    const updatedInterest = { ...existingInterest, ...interest };
    this.interestsData.set(interest.id, updatedInterest);
    return updatedInterest;
  }

  async deleteInterest(id: number): Promise<void> {
    this.interestsData.delete(id);
  }

  // Projects operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projectsData.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsData.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentIds.projects++;
    const newProject: Project = { ...project, id };
    this.projectsData.set(id, newProject);
    return newProject;
  }

  async updateProject(
    project: Partial<Project> & { id: number }
  ): Promise<Project> {
    const existingProject = await this.getProject(project.id);
    if (!existingProject) {
      throw new Error(`Project with ID ${project.id} not found`);
    }
    const updatedProject = { ...existingProject, ...project };
    this.projectsData.set(project.id, updatedProject);
    
    // Save changes to database.json
    await this.saveToDatabaseJson();
    
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    this.projectsData.delete(id);
  }

  // Friends operations
  async getFriends(): Promise<Friend[]> {
    return Array.from(this.friendsData.values());
  }

  async getFriend(id: number): Promise<Friend | undefined> {
    return this.friendsData.get(id);
  }

  async createFriend(friend: InsertFriend): Promise<Friend> {
    const id = this.currentIds.friends++;
    const newFriend: Friend = { ...friend, id };
    this.friendsData.set(id, newFriend);
    return newFriend;
  }

  async updateFriend(
    friend: Partial<Friend> & { id: number }
  ): Promise<Friend> {
    const existingFriend = await this.getFriend(friend.id);
    if (!existingFriend) {
      throw new Error(`Friend with ID ${friend.id} not found`);
    }
    const updatedFriend = { ...existingFriend, ...friend };
    this.friendsData.set(friend.id, updatedFriend);
    
    // Save changes to database.json
    await this.saveToDatabaseJson();
    
    return updatedFriend;
  }

  async deleteFriend(id: number): Promise<void> {
    this.friendsData.delete(id);
  }

  // Updates operations
  async getUpdates(): Promise<Update[]> {
    return Array.from(this.updatesData.values());
  }

  async getUpdate(id: number): Promise<Update | undefined> {
    return this.updatesData.get(id);
  }

  async createUpdate(update: InsertUpdate): Promise<Update> {
    const id = this.currentIds.updates++;
    const newUpdate: Update = { ...update, id };
    this.updatesData.set(id, newUpdate);
    return newUpdate;
  }

  async updateUpdate(
    update: Partial<Update> & { id: number }
  ): Promise<Update> {
    const existingUpdate = await this.getUpdate(update.id);
    if (!existingUpdate) {
      throw new Error(`Update with ID ${update.id} not found`);
    }
    const updatedUpdate = { ...existingUpdate, ...update };
    this.updatesData.set(update.id, updatedUpdate);
    
    // Save changes to database.json
    await this.saveToDatabaseJson();
    
    return updatedUpdate;
  }

  async deleteUpdate(id: number): Promise<void> {
    this.updatesData.delete(id);
  }

  // Settings operations
  async getSettings(): Promise<Setting | undefined> {
    return this.settingsData.get(1);
  }

  async updateSettings(
    setting: Partial<Setting> & { id: number }
  ): Promise<Setting> {
    const existingSettings = await this.getSettings();
    if (!existingSettings) {
      throw new Error(`Settings not found`);
    }
    const updatedSettings = { ...existingSettings, ...setting };
    this.settingsData.set(1, updatedSettings);
    
    // Save changes to database.json
    await this.saveToDatabaseJson();
    
    return updatedSettings;
  }

  // Portfolio operations
  async updatePortfolio(data: any): Promise<void> {
    if (data.bio) {
      await this.updateBio(data.bio);
    }

    if (data.skills) {
      this.skillsData.clear();
      for (const skill of data.skills) {
        this.skillsData.set(skill.id, skill);
      }
      this.currentIds.skills = Math.max(...data.skills.map((s: any) => s.id), 0) + 1;
    }

    if (data.interests) {
      this.interestsData.clear();
      for (const interest of data.interests) {
        this.interestsData.set(interest.id, interest);
      }
      this.currentIds.interests = Math.max(...data.interests.map((i: any) => i.id), 0) + 1;
    }

    if (data.projects) {
      this.projectsData.clear();
      for (const project of data.projects) {
        this.projectsData.set(project.id, project);
      }
      this.currentIds.projects = Math.max(...data.projects.map((p: any) => p.id), 0) + 1;
    }

    if (data.friends) {
      this.friendsData.clear();
      for (const friend of data.friends) {
        this.friendsData.set(friend.id, friend);
      }
      this.currentIds.friends = Math.max(...data.friends.map((f: any) => f.id), 0) + 1;
    }

    if (data.updates) {
      this.updatesData.clear();
      for (const update of data.updates) {
        this.updatesData.set(update.id, update);
      }
      this.currentIds.updates = Math.max(...data.updates.map((u: any) => u.id), 0) + 1;
    }

    if (data.settings) {
      await this.updateSettings(data.settings);
    }
    
    // Save all changes to database.json
    await this.saveToDatabaseJson();
  }

  async createBackup(): Promise<any> {
    const [bio, skills, interests, projects, friends, updates, settings] = await Promise.all([
      this.getBio(),
      this.getSkills(),
      this.getInterests(),
      this.getProjects(),
      this.getFriends(),
      this.getUpdates(),
      this.getSettings(),
    ]);

    return {
      bio,
      skills,
      interests,
      projects,
      friends,
      updates,
      settings,
    };
  }

  async restoreDefaults(): Promise<void> {
    this.bioData.clear();
    this.skillsData.clear();
    this.interestsData.clear();
    this.projectsData.clear();
    this.friendsData.clear();
    this.updatesData.clear();
    this.settingsData.clear();

    this.currentIds = {
      users: 1,
      bio: 1,
      skills: 1,
      interests: 1,
      projects: 1,
      friends: 1,
      updates: 1,
      settings: 1,
    };

    this.initializeDefaultData();
  }
}

export const storage = new MemStorage();

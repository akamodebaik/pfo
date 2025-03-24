import { 
  users, 
  type User, 
  type InsertUser, 
  visitors, 
  type Visitor, 
  type InsertVisitor 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getVisitorCount(): Promise<Visitor | undefined>;
  createVisitorCount(visitor: InsertVisitor): Promise<Visitor>;
  updateVisitorCount(visitor: InsertVisitor): Promise<Visitor>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private visitors: Map<number, Visitor>;
  currentId: number;
  visitorId: number;

  constructor() {
    this.users = new Map();
    this.visitors = new Map();
    this.currentId = 1;
    this.visitorId = 1;
    
    // Initialize visitor count
    this.visitors.set(this.visitorId, {
      id: this.visitorId,
      count: 0,
      lastUpdated: new Date().toISOString()
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getVisitorCount(): Promise<Visitor | undefined> {
    return this.visitors.get(this.visitorId);
  }
  
  async createVisitorCount(insertVisitor: InsertVisitor): Promise<Visitor> {
    const id = this.visitorId;
    
    // Create a properly typed visitor object
    const visitor: Visitor = {
      id,
      count: typeof insertVisitor.count === 'number' ? insertVisitor.count : 0,
      lastUpdated: insertVisitor.lastUpdated
    };
    
    this.visitors.set(id, visitor);
    return visitor;
  }
  
  async updateVisitorCount(insertVisitor: InsertVisitor): Promise<Visitor> {
    const id = this.visitorId;
    const currentVisitor = this.visitors.get(id);
    
    if (!currentVisitor) {
      throw new Error('Visitor counter not found');
    }
    
    // Create a properly typed updated visitor
    const updatedVisitor: Visitor = {
      id,
      count: typeof insertVisitor.count === 'number' ? insertVisitor.count : currentVisitor.count,
      lastUpdated: insertVisitor.lastUpdated
    };
    
    this.visitors.set(id, updatedVisitor);
    return updatedVisitor;
  }
}

export const storage = new MemStorage();

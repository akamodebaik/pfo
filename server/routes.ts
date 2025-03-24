import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "../shared/schema";
import { z } from "zod";
import fs from 'fs';
import path from 'path';

// Define default admin credentials
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'AkaAdminPass123'
};

// Read site configuration if available
let siteConfig: any = null;
try {
  const configPath = path.join(process.cwd(), 'client', 'src', 'config', 'site.ts');
  if (fs.existsSync(configPath)) {
    // This is a simplistic approach, in production you'd use proper module loading
    const fileContent = fs.readFileSync(configPath, 'utf8');
    const usernameMatch = fileContent.match(/username:\s*['"]([^'"]+)['"]/);
    const passwordMatch = fileContent.match(/password:\s*['"]([^'"]+)['"]/);
    
    if (usernameMatch && usernameMatch[1] && passwordMatch && passwordMatch[1]) {
      siteConfig = {
        admin: {
          username: usernameMatch[1],
          password: passwordMatch[1]
        }
      };
      console.log('Site config loaded for authentication');
    }
  }
} catch (error) {
  console.warn('Could not read site config, using default admin credentials');
}

// Use the loaded config or fall back to defaults
const adminCredentials = siteConfig?.admin || DEFAULT_ADMIN;

export async function registerRoutes(app: Express): Promise<Server> {
  // Get visitor count
  app.get('/api/visitor-count', async (req, res) => {
    try {
      let visitor = await storage.getVisitorCount();
      
      if (!visitor) {
        visitor = await storage.createVisitorCount({
          count: 1,
          lastUpdated: new Date().toISOString()
        });
      } else {
        // Increment visitor count
        visitor = await storage.updateVisitorCount({
          count: visitor.count + 1,
          lastUpdated: new Date().toISOString()
        });
      }
      
      res.json({ count: visitor.count });
    } catch (error) {
      console.error('Error handling visitor count:', error);
      res.status(500).json({ message: 'Failed to update visitor count' });
    }
  });

  // Get visitor's IP address (using ipify API in the frontend)
  app.get('/api/ip-address', async (req, res) => {
    try {
      // Return the client IP address (note: this might be the proxy's IP in some cases)
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
      res.json({ ip });
    } catch (error) {
      console.error('Error getting IP address:', error);
      res.status(500).json({ message: 'Failed to get IP address' });
    }
  });

  // Login API
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Check if credentials match the admin credentials from config
      if (username === adminCredentials.username && password === adminCredentials.password) {
        res.json({ 
          success: true, 
          message: 'Login successful',
          user: { username: adminCredentials.username, role: 'admin' }
        });
      } else {
        res.status(401).json({ 
          success: false, 
          message: 'Invalid username or password' 
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred during login' 
      });
    }
  });

  // Initialize admin account if it doesn't exist
  try {
    const adminUser = await storage.getUserByUsername(adminCredentials.username);
    if (!adminUser) {
      await storage.createUser({
        username: adminCredentials.username,
        password: adminCredentials.password // In a production app, you would hash this password
      });
      console.log('Admin account initialized');
    }
  } catch (error) {
    console.error('Error initializing admin account:', error);
  }

  const httpServer = createServer(app);
  return httpServer;
}

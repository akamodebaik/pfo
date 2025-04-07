import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertBioSchema, insertSkillSchema, insertInterestSchema, insertProjectSchema, insertFriendSchema, insertUpdateSchema, insertSettingsSchema } from "../shared/schema";
import { loginSchema } from "../shared/admin";
import { setupAuth, isAuthenticated } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Setup authentication
  setupAuth(app);

  // PORTFOLIO DATA ROUTES

  // Get all portfolio data
  app.get("/api/portfolio", async (req, res) => {
    try {
      const [bio, skills, interests, projects, friends, updates, settings] = await Promise.all([
        storage.getBio(),
        storage.getSkills(),
        storage.getInterests(),
        storage.getProjects(),
        storage.getFriends(),
        storage.getUpdates(),
        storage.getSettings(),
      ]);

      res.json({
        bio,
        skills,
        interests,
        projects,
        friends,
        updates,
        settings,
      });
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      res.status(500).json({ message: "Failed to fetch portfolio data" });
    }
  });

  // ADMIN ROUTES

  // Auth routes are now handled in auth.ts

  // Bio routes
  app.get("/api/admin/bio", isAuthenticated, async (req, res) => {
    try {
      const bio = await storage.getBio();
      res.json(bio);
    } catch (error) {
      console.error("Error fetching bio:", error);
      res.status(500).json({ message: "Failed to fetch bio" });
    }
  });

  app.put("/api/admin/bio", isAuthenticated, async (req, res) => {
    try {
      const bioData = insertBioSchema.parse(req.body);
      const updatedBio = await storage.updateBio(bioData);
      res.json(updatedBio);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Update bio error:", error);
        res.status(500).json({ message: "Failed to update bio" });
      }
    }
  });

  // Skills routes
  app.get("/api/admin/skills", isAuthenticated, async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post("/api/admin/skill", isAuthenticated, async (req, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const newSkill = await storage.createSkill(skillData);
      res.status(201).json(newSkill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Create skill error:", error);
        res.status(500).json({ message: "Failed to create skill" });
      }
    }
  });

  app.put("/api/admin/skill", isAuthenticated, async (req, res) => {
    try {
      const skillData = req.body;
      if (!skillData.id) {
        return res.status(400).json({ message: "Skill ID is required" });
      }
      const updatedSkill = await storage.updateSkill(skillData);
      res.json(updatedSkill);
    } catch (error) {
      console.error("Update skill error:", error);
      res.status(500).json({ message: "Failed to update skill" });
    }
  });

  app.delete("/api/admin/skill/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSkill(id);
      res.status(204).end();
    } catch (error) {
      console.error("Delete skill error:", error);
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });

  // Interests routes
  app.get("/api/admin/interests", isAuthenticated, async (req, res) => {
    try {
      const interests = await storage.getInterests();
      res.json(interests);
    } catch (error) {
      console.error("Error fetching interests:", error);
      res.status(500).json({ message: "Failed to fetch interests" });
    }
  });

  app.post("/api/admin/interest", isAuthenticated, async (req, res) => {
    try {
      const interestData = insertInterestSchema.parse(req.body);
      const newInterest = await storage.createInterest(interestData);
      res.status(201).json(newInterest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Create interest error:", error);
        res.status(500).json({ message: "Failed to create interest" });
      }
    }
  });

  app.put("/api/admin/interest", isAuthenticated, async (req, res) => {
    try {
      const interestData = req.body;
      if (!interestData.id) {
        return res.status(400).json({ message: "Interest ID is required" });
      }
      const updatedInterest = await storage.updateInterest(interestData);
      res.json(updatedInterest);
    } catch (error) {
      console.error("Update interest error:", error);
      res.status(500).json({ message: "Failed to update interest" });
    }
  });

  app.delete("/api/admin/interest/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteInterest(id);
      res.status(204).end();
    } catch (error) {
      console.error("Delete interest error:", error);
      res.status(500).json({ message: "Failed to delete interest" });
    }
  });

  // Projects routes
  app.get("/api/admin/projects", isAuthenticated, async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/admin/project", isAuthenticated, async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const newProject = await storage.createProject(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Create project error:", error);
        res.status(500).json({ message: "Failed to create project" });
      }
    }
  });

  app.put("/api/admin/project", isAuthenticated, async (req, res) => {
    try {
      const projectData = req.body;
      if (!projectData.id) {
        return res.status(400).json({ message: "Project ID is required" });
      }
      const updatedProject = await storage.updateProject(projectData);
      res.json(updatedProject);
    } catch (error) {
      console.error("Update project error:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/admin/project/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProject(id);
      res.status(204).end();
    } catch (error) {
      console.error("Delete project error:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Friends routes
  app.get("/api/admin/friends", isAuthenticated, async (req, res) => {
    try {
      const friends = await storage.getFriends();
      res.json(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ message: "Failed to fetch friends" });
    }
  });

  app.post("/api/admin/friend", isAuthenticated, async (req, res) => {
    try {
      const friendData = insertFriendSchema.parse(req.body);
      const newFriend = await storage.createFriend(friendData);
      res.status(201).json(newFriend);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Create friend error:", error);
        res.status(500).json({ message: "Failed to create friend" });
      }
    }
  });

  app.put("/api/admin/friend", isAuthenticated, async (req, res) => {
    try {
      const friendData = req.body;
      if (!friendData.id) {
        return res.status(400).json({ message: "Friend ID is required" });
      }
      const updatedFriend = await storage.updateFriend(friendData);
      res.json(updatedFriend);
    } catch (error) {
      console.error("Update friend error:", error);
      res.status(500).json({ message: "Failed to update friend" });
    }
  });

  app.delete("/api/admin/friend/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFriend(id);
      res.status(204).end();
    } catch (error) {
      console.error("Delete friend error:", error);
      res.status(500).json({ message: "Failed to delete friend" });
    }
  });

  // Updates routes
  app.get("/api/admin/updates", isAuthenticated, async (req, res) => {
    try {
      const updates = await storage.getUpdates();
      res.json(updates);
    } catch (error) {
      console.error("Error fetching updates:", error);
      res.status(500).json({ message: "Failed to fetch updates" });
    }
  });

  app.post("/api/admin/update", isAuthenticated, async (req, res) => {
    try {
      const updateData = insertUpdateSchema.parse(req.body);
      const newUpdate = await storage.createUpdate(updateData);
      res.status(201).json(newUpdate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Create update error:", error);
        res.status(500).json({ message: "Failed to create update" });
      }
    }
  });

  app.put("/api/admin/update", isAuthenticated, async (req, res) => {
    try {
      const updateData = req.body;
      if (!updateData.id) {
        return res.status(400).json({ message: "Update ID is required" });
      }
      const updatedUpdate = await storage.updateUpdate(updateData);
      res.json(updatedUpdate);
    } catch (error) {
      console.error("Update update error:", error);
      res.status(500).json({ message: "Failed to update update" });
    }
  });

  app.delete("/api/admin/update/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteUpdate(id);
      res.status(204).end();
    } catch (error) {
      console.error("Delete update error:", error);
      res.status(500).json({ message: "Failed to delete update" });
    }
  });

  // Settings routes
  app.get("/api/admin/settings", isAuthenticated, async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.put("/api/admin/setting", isAuthenticated, async (req, res) => {
    try {
      const settingsData = req.body;
      if (!settingsData.id) {
        return res.status(400).json({ message: "Settings ID is required" });
      }
      const updatedSettings = await storage.updateSettings(settingsData);
      res.json(updatedSettings);
    } catch (error) {
      console.error("Update settings error:", error);
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  // Full portfolio data update (for JSON editor)
  app.put("/api/admin/portfolio", isAuthenticated, async (req, res) => {
    try {
      const portfolioData = req.body;
      await storage.updatePortfolio(portfolioData);
      res.json({ message: "Portfolio data updated successfully" });
    } catch (error) {
      console.error("Update portfolio error:", error);
      res.status(500).json({ message: "Failed to update portfolio data" });
    }
  });

  // Backup and restore
  app.post("/api/admin/backup", isAuthenticated, async (req, res) => {
    try {
      const backupData = await storage.createBackup();
      res.status(200).send(JSON.stringify(backupData));
    } catch (error) {
      console.error("Backup error:", error);
      res.status(500).json({ message: "Failed to create backup" });
    }
  });

  app.post("/api/admin/restore", isAuthenticated, async (req, res) => {
    try {
      await storage.restoreDefaults();
      res.status(200).json({ message: "Data restored to defaults" });
    } catch (error) {
      console.error("Restore error:", error);
      res.status(500).json({ message: "Failed to restore defaults" });
    }
  });

  return httpServer;
}

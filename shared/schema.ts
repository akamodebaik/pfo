import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Bio schema
export const bio = pgTable("bio", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description").notNull(),
  education: text("education").notNull(),
  experience: text("experience").notNull(),
  avatar: text("avatar").notNull(),
  workspaceImage: text("workspace_image").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  language: text("language").notNull().default("en"),
});

export const insertBioSchema = createInsertSchema(bio).omit({
  id: true,
});

// Skills schema
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

// Interests schema
export const interests = pgTable("interests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
});

export const insertInterestSchema = createInsertSchema(interests).omit({
  id: true,
});

// Projects schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tags: text("tags").array().notNull(),
  demoLink: text("demo_link"),
  sourceLink: text("source_link"),
  featured: boolean("featured").default(false),
  category: text("category").notNull(),
  order: integer("order").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

// Friends schema
export const friends = pgTable("friends", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  githubLink: text("github_link"),
  linkedinLink: text("linkedin_link"),
  websiteLink: text("website_link"),
  order: integer("order").notNull(),
});

export const insertFriendSchema = createInsertSchema(friends).omit({
  id: true,
});

// Updates schema
export const updates = pgTable("updates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  category: text("category").notNull(),
  order: integer("order").notNull(),
});

export const insertUpdateSchema = createInsertSchema(updates).omit({
  id: true,
});

// Settings schema
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  musicFile: text("music_file").notNull().default("/music/background.mp3"),
  musicTitle: text("music_title").notNull().default("Elegant Atmosphere"),
  themePrimary: text("theme_primary").notNull().default("#d4af37"),
  themeVariant: text("theme_variant").notNull().default("professional"),
  loadingPhrases: text("loading_phrases").array().notNull(),
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Bio = typeof bio.$inferSelect;
export type InsertBio = z.infer<typeof insertBioSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Interest = typeof interests.$inferSelect;
export type InsertInterest = z.infer<typeof insertInterestSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Friend = typeof friends.$inferSelect;
export type InsertFriend = z.infer<typeof insertFriendSchema>;

export type Update = typeof updates.$inferSelect;
export type InsertUpdate = z.infer<typeof insertUpdateSchema>;

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingsSchema>;

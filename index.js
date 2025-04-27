var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  certifications: () => certifications,
  contactSubmissions: () => contactSubmissions,
  educations: () => educations,
  experiences: () => experiences,
  insertCertificationSchema: () => insertCertificationSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertEducationSchema: () => insertEducationSchema,
  insertExperienceSchema: () => insertExperienceSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertSkillSchema: () => insertSkillSchema,
  insertToolSchema: () => insertToolSchema,
  insertUserSchema: () => insertUserSchema,
  projects: () => projects,
  skills: () => skills,
  tools: () => tools,
  users: () => users,
  usersRelations: () => usersRelations
});
import { pgTable, text, serial, integer, timestamp, json, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow()
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  achievements: json("achievements").$type().notNull(),
  tags: json("tags").$type().notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  percentage: integer("percentage").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  // 'technical' or 'business'
  createdAt: timestamp("created_at").defaultNow()
});
var tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  tags: json("tags").$type().notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  details: text("details").notNull(),
  icon: text("icon").notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  certificate_path: text("certificate_path"),
  createdAt: timestamp("created_at").defaultNow()
});
var experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  location: text("location").notNull(),
  period: text("period").notNull(),
  responsibilities: json("responsibilities").$type().notNull(),
  icon: text("icon").notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var educations = pgTable("educations", {
  id: serial("id").primaryKey(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  read: boolean("read").default(false)
});
var usersRelations = relations(users, ({ many }) => ({
  contactSubmissions: many(contactSubmissions)
}));
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true
});
var insertToolSchema = createInsertSchema(tools).omit({
  id: true,
  createdAt: true
});
var insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  createdAt: true
});
var insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true
});
var insertEducationSchema = createInsertSchema(educations).omit({
  id: true,
  createdAt: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
  read: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Project methods
  async getProjects() {
    return await db.select().from(projects);
  }
  async getProject(id) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || void 0;
  }
  async createProject(project) {
    const formattedProject = {
      ...project,
      achievements: Array.isArray(project.achievements) ? project.achievements : [],
      tags: Array.isArray(project.tags) ? project.tags : []
    };
    const [newProject] = await db.insert(projects).values(formattedProject).returning();
    return newProject;
  }
  async updateProject(id, project) {
    const formattedUpdate = { ...project, updatedAt: /* @__PURE__ */ new Date() };
    if (project.achievements) {
      formattedUpdate.achievements = Array.isArray(project.achievements) ? project.achievements : [];
    }
    if (project.tags) {
      formattedUpdate.tags = Array.isArray(project.tags) ? project.tags : [];
    }
    const [updatedProject] = await db.update(projects).set(formattedUpdate).where(eq(projects.id, id)).returning();
    return updatedProject || void 0;
  }
  async deleteProject(id) {
    const [deleted] = await db.delete(projects).where(eq(projects.id, id)).returning({ id: projects.id });
    return !!deleted;
  }
  // Skill methods
  async getSkills(type) {
    if (type) {
      return await db.select().from(skills).where(eq(skills.type, type));
    }
    return await db.select().from(skills);
  }
  async getSkill(id) {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill || void 0;
  }
  async createSkill(skill) {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }
  async updateSkill(id, skill) {
    const [updatedSkill] = await db.update(skills).set(skill).where(eq(skills.id, id)).returning();
    return updatedSkill || void 0;
  }
  async deleteSkill(id) {
    const [deleted] = await db.delete(skills).where(eq(skills.id, id)).returning({ id: skills.id });
    return !!deleted;
  }
  // Tool methods
  async getTools() {
    return await db.select().from(tools);
  }
  async getTool(id) {
    const [tool] = await db.select().from(tools).where(eq(tools.id, id));
    return tool || void 0;
  }
  async createTool(tool) {
    const formattedTool = {
      ...tool,
      tags: Array.isArray(tool.tags) ? tool.tags : []
    };
    const [newTool] = await db.insert(tools).values(formattedTool).returning();
    return newTool;
  }
  async updateTool(id, tool) {
    const formattedUpdate = { ...tool };
    if (tool.tags) {
      formattedUpdate.tags = Array.isArray(tool.tags) ? tool.tags : [];
    }
    const [updatedTool] = await db.update(tools).set(formattedUpdate).where(eq(tools.id, id)).returning();
    return updatedTool || void 0;
  }
  async deleteTool(id) {
    const [deleted] = await db.delete(tools).where(eq(tools.id, id)).returning({ id: tools.id });
    return !!deleted;
  }
  // Certification methods
  async getCertifications() {
    return await db.select().from(certifications);
  }
  async getCertification(id) {
    const [certification] = await db.select().from(certifications).where(eq(certifications.id, id));
    return certification || void 0;
  }
  async createCertification(certification) {
    const [newCertification] = await db.insert(certifications).values(certification).returning();
    return newCertification;
  }
  async updateCertification(id, certification) {
    const [updatedCertification] = await db.update(certifications).set(certification).where(eq(certifications.id, id)).returning();
    return updatedCertification || void 0;
  }
  async deleteCertification(id) {
    const [deleted] = await db.delete(certifications).where(eq(certifications.id, id)).returning({ id: certifications.id });
    return !!deleted;
  }
  // Experience methods
  async getExperiences() {
    return await db.select().from(experiences);
  }
  async getExperience(id) {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience || void 0;
  }
  async createExperience(experience) {
    const formattedExperience = {
      ...experience,
      responsibilities: Array.isArray(experience.responsibilities) ? experience.responsibilities : []
    };
    const [newExperience] = await db.insert(experiences).values(formattedExperience).returning();
    return newExperience;
  }
  async updateExperience(id, experience) {
    const formattedUpdate = { ...experience };
    if (experience.responsibilities) {
      formattedUpdate.responsibilities = Array.isArray(experience.responsibilities) ? experience.responsibilities : [];
    }
    const [updatedExperience] = await db.update(experiences).set(formattedUpdate).where(eq(experiences.id, id)).returning();
    return updatedExperience || void 0;
  }
  async deleteExperience(id) {
    const [deleted] = await db.delete(experiences).where(eq(experiences.id, id)).returning({ id: experiences.id });
    return !!deleted;
  }
  // Education methods
  async getEducations() {
    return await db.select().from(educations);
  }
  async getEducation(id) {
    const [education] = await db.select().from(educations).where(eq(educations.id, id));
    return education || void 0;
  }
  async createEducation(education) {
    const [newEducation] = await db.insert(educations).values(education).returning();
    return newEducation;
  }
  async updateEducation(id, education) {
    const [updatedEducation] = await db.update(educations).set(education).where(eq(educations.id, id)).returning();
    return updatedEducation || void 0;
  }
  async deleteEducation(id) {
    const [deleted] = await db.delete(educations).where(eq(educations.id, id)).returning({ id: educations.id });
    return !!deleted;
  }
  // Contact Submission methods
  async getContactSubmissions() {
    return await db.select().from(contactSubmissions);
  }
  async getContactSubmission(id) {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission || void 0;
  }
  async createContactSubmission(submission) {
    const [newSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }
  async markContactSubmissionAsRead(id) {
    const [updatedSubmission] = await db.update(contactSubmissions).set({ read: true }).where(eq(contactSubmissions.id, id)).returning();
    return updatedSubmission || void 0;
  }
  async deleteContactSubmission(id) {
    const [deleted] = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning({ id: contactSubmissions.id });
    return !!deleted;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects2 = await storage.getProjects();
      res.status(200).json(projects2);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ message: "Invalid project data" });
    }
  });
  app2.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(400).json({ message: "Invalid project data" });
    }
  });
  app2.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  app2.get("/api/skills", async (req, res) => {
    try {
      const type = req.query.type;
      const skills2 = await storage.getSkills(type);
      res.status(200).json(skills2);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  app2.post("/api/skills", async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.status(201).json(skill);
    } catch (error) {
      console.error("Error creating skill:", error);
      res.status(400).json({ message: "Invalid skill data" });
    }
  });
  app2.get("/api/tools", async (req, res) => {
    try {
      const tools2 = await storage.getTools();
      res.status(200).json(tools2);
    } catch (error) {
      console.error("Error fetching tools:", error);
      res.status(500).json({ message: "Failed to fetch tools" });
    }
  });
  app2.post("/api/tools", async (req, res) => {
    try {
      const validatedData = insertToolSchema.parse(req.body);
      const tool = await storage.createTool(validatedData);
      res.status(201).json(tool);
    } catch (error) {
      console.error("Error creating tool:", error);
      res.status(400).json({ message: "Invalid tool data" });
    }
  });
  app2.get("/api/certifications", async (req, res) => {
    try {
      const certifications2 = await storage.getCertifications();
      res.status(200).json(certifications2);
    } catch (error) {
      console.error("Error fetching certifications:", error);
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });
  app2.post("/api/certifications", async (req, res) => {
    try {
      const validatedData = insertCertificationSchema.parse(req.body);
      const certification = await storage.createCertification(validatedData);
      res.status(201).json(certification);
    } catch (error) {
      console.error("Error creating certification:", error);
      res.status(400).json({ message: "Invalid certification data" });
    }
  });
  app2.get("/api/experiences", async (req, res) => {
    try {
      const experiences2 = await storage.getExperiences();
      res.status(200).json(experiences2);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });
  app2.post("/api/experiences", async (req, res) => {
    try {
      const validatedData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(validatedData);
      res.status(201).json(experience);
    } catch (error) {
      console.error("Error creating experience:", error);
      res.status(400).json({ message: "Invalid experience data" });
    }
  });
  app2.get("/api/educations", async (req, res) => {
    try {
      const educations2 = await storage.getEducations();
      res.status(200).json(educations2);
    } catch (error) {
      console.error("Error fetching educations:", error);
      res.status(500).json({ message: "Failed to fetch educations" });
    }
  });
  app2.post("/api/educations", async (req, res) => {
    try {
      const validatedData = insertEducationSchema.parse(req.body);
      const education = await storage.createEducation(validatedData);
      res.status(201).json(education);
    } catch (error) {
      console.error("Error creating education:", error);
      res.status(400).json({ message: "Invalid education data" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      res.status(201).json({
        message: "Message sent successfully!",
        id: submission.id
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(400).json({ message: "Invalid form data" });
    }
  });
  app2.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.status(200).json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });
  app2.put("/api/contact-submissions/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const submission = await storage.markContactSubmissionAsRead(id);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.status(200).json(submission);
    } catch (error) {
      console.error("Error marking submission as read:", error);
      res.status(500).json({ message: "Failed to update submission" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  base: "",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

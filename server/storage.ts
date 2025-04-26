import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  skills, type Skill, type InsertSkill,
  tools, type Tool, type InsertTool,
  certifications, type Certification, type InsertCertification,
  experiences, type Experience, type InsertExperience,
  educations, type Education, type InsertEducation,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio-specific methods
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Skills
  getSkills(type?: string): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Tools
  getTools(): Promise<Tool[]>;
  getTool(id: number): Promise<Tool | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  updateTool(id: number, tool: Partial<InsertTool>): Promise<Tool | undefined>;
  deleteTool(id: number): Promise<boolean>;
  
  // Certifications
  getCertifications(): Promise<Certification[]>;
  getCertification(id: number): Promise<Certification | undefined>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification | undefined>;
  deleteCertification(id: number): Promise<boolean>;
  
  // Experiences
  getExperiences(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Educations
  getEducations(): Promise<Education[]>;
  getEducation(id: number): Promise<Education | undefined>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education | undefined>;
  deleteEducation(id: number): Promise<boolean>;
  
  // Contact Submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactSubmissionAsRead(id: number): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    // Ensure achievements and tags are properly formatted as arrays for Drizzle
    const formattedProject = {
      ...project,
      achievements: Array.isArray(project.achievements) ? project.achievements : [],
      tags: Array.isArray(project.tags) ? project.tags : []
    };
    
    const [newProject] = await db
      .insert(projects)
      .values(formattedProject)
      .returning();
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    // Format achievement and tags arrays if they exist
    const formattedUpdate: any = { ...project, updatedAt: new Date() };
    
    if (project.achievements) {
      formattedUpdate.achievements = Array.isArray(project.achievements) ? project.achievements : [];
    }
    
    if (project.tags) {
      formattedUpdate.tags = Array.isArray(project.tags) ? project.tags : [];
    }
    
    const [updatedProject] = await db
      .update(projects)
      .set(formattedUpdate)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject || undefined;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning({ id: projects.id });
    return !!deleted;
  }
  
  // Skill methods
  async getSkills(type?: string): Promise<Skill[]> {
    if (type) {
      return await db.select().from(skills).where(eq(skills.type, type));
    }
    return await db.select().from(skills);
  }
  
  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill || undefined;
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db
      .insert(skills)
      .values(skill)
      .returning();
    return newSkill;
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db
      .update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill || undefined;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(skills)
      .where(eq(skills.id, id))
      .returning({ id: skills.id });
    return !!deleted;
  }
  
  // Tool methods
  async getTools(): Promise<Tool[]> {
    return await db.select().from(tools);
  }
  
  async getTool(id: number): Promise<Tool | undefined> {
    const [tool] = await db.select().from(tools).where(eq(tools.id, id));
    return tool || undefined;
  }
  
  async createTool(tool: InsertTool): Promise<Tool> {
    // Ensure tags are properly formatted as arrays for Drizzle
    const formattedTool = {
      ...tool,
      tags: Array.isArray(tool.tags) ? tool.tags : []
    };
    
    const [newTool] = await db
      .insert(tools)
      .values(formattedTool)
      .returning();
    return newTool;
  }
  
  async updateTool(id: number, tool: Partial<InsertTool>): Promise<Tool | undefined> {
    // Format tags array if it exists
    const formattedUpdate: any = { ...tool };
    
    if (tool.tags) {
      formattedUpdate.tags = Array.isArray(tool.tags) ? tool.tags : [];
    }
    
    const [updatedTool] = await db
      .update(tools)
      .set(formattedUpdate)
      .where(eq(tools.id, id))
      .returning();
    return updatedTool || undefined;
  }
  
  async deleteTool(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(tools)
      .where(eq(tools.id, id))
      .returning({ id: tools.id });
    return !!deleted;
  }
  
  // Certification methods
  async getCertifications(): Promise<Certification[]> {
    return await db.select().from(certifications);
  }
  
  async getCertification(id: number): Promise<Certification | undefined> {
    const [certification] = await db.select().from(certifications).where(eq(certifications.id, id));
    return certification || undefined;
  }
  
  async createCertification(certification: InsertCertification): Promise<Certification> {
    const [newCertification] = await db
      .insert(certifications)
      .values(certification)
      .returning();
    return newCertification;
  }
  
  async updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification | undefined> {
    const [updatedCertification] = await db
      .update(certifications)
      .set(certification)
      .where(eq(certifications.id, id))
      .returning();
    return updatedCertification || undefined;
  }
  
  async deleteCertification(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(certifications)
      .where(eq(certifications.id, id))
      .returning({ id: certifications.id });
    return !!deleted;
  }
  
  // Experience methods
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences);
  }
  
  async getExperience(id: number): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience || undefined;
  }
  
  async createExperience(experience: InsertExperience): Promise<Experience> {
    // Ensure responsibilities are properly formatted as arrays for Drizzle
    const formattedExperience = {
      ...experience,
      responsibilities: Array.isArray(experience.responsibilities) ? experience.responsibilities : []
    };
    
    const [newExperience] = await db
      .insert(experiences)
      .values(formattedExperience)
      .returning();
    return newExperience;
  }
  
  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    // Format responsibilities array if it exists
    const formattedUpdate: any = { ...experience };
    
    if (experience.responsibilities) {
      formattedUpdate.responsibilities = Array.isArray(experience.responsibilities) ? experience.responsibilities : [];
    }
    
    const [updatedExperience] = await db
      .update(experiences)
      .set(formattedUpdate)
      .where(eq(experiences.id, id))
      .returning();
    return updatedExperience || undefined;
  }
  
  async deleteExperience(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(experiences)
      .where(eq(experiences.id, id))
      .returning({ id: experiences.id });
    return !!deleted;
  }
  
  // Education methods
  async getEducations(): Promise<Education[]> {
    return await db.select().from(educations);
  }
  
  async getEducation(id: number): Promise<Education | undefined> {
    const [education] = await db.select().from(educations).where(eq(educations.id, id));
    return education || undefined;
  }
  
  async createEducation(education: InsertEducation): Promise<Education> {
    const [newEducation] = await db
      .insert(educations)
      .values(education)
      .returning();
    return newEducation;
  }
  
  async updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education | undefined> {
    const [updatedEducation] = await db
      .update(educations)
      .set(education)
      .where(eq(educations.id, id))
      .returning();
    return updatedEducation || undefined;
  }
  
  async deleteEducation(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(educations)
      .where(eq(educations.id, id))
      .returning({ id: educations.id });
    return !!deleted;
  }
  
  // Contact Submission methods
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }
  
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission || undefined;
  }
  
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }
  
  async markContactSubmissionAsRead(id: number): Promise<ContactSubmission | undefined> {
    const [updatedSubmission] = await db
      .update(contactSubmissions)
      .set({ read: true })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updatedSubmission || undefined;
  }
  
  async deleteContactSubmission(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .returning({ id: contactSubmissions.id });
    return !!deleted;
  }
}

export const storage = new DatabaseStorage();

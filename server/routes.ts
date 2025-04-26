import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real application, you would store this in a database or send an email
      console.log("Contact form submission:", validatedData);
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return success
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(400).json({ message: "Invalid form data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

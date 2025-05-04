// Project related types
export interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  achievements: string[];
  tags: string[];
  color: string; // adjust to match the data coming from database
  createdAt: Date;
  updatedAt: Date;
}

// Skill related types
export interface Skill {
  id: number;
  name: string;
  percentage: number;
  type: string; // adjust to match the data coming from database
  createdAt: Date;
}

export interface Tool {
  id: number;
  name: string;
  icon: string;
  tags: string[];
  createdAt: Date;
}

export interface Certification {
  id: number;
  name: string;
  description: string;
  details: string;
  icon: string;
  color: string; // adjust to match the data coming from database
  certificate_path?: string | null;
  createdAt: Date;
  link : string;
}

// Experience related types
export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  responsibilities: string[];
  icon: string;
  color: string; // adjust to match the data coming from database
  createdAt: Date;
}

// Education related types
export interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
  color: string; // adjust to match the data coming from database
  createdAt: Date;
}

// Contact form related types
export interface ContactFormValues {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Contact submission type
export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

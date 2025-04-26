// Project related types
export interface Project {
  title: string;
  summary: string;
  description: string;
  achievements: string[];
  tags: string[];
  color: 'primary' | 'secondary' | 'accent';
}

// Skill related types
export interface Skill {
  name: string;
  percentage: number;
}

export interface Tool {
  name: string;
  icon: string;
  tags: string[];
}

export interface Certification {
  name: string;
  description: string;
  details: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent';
}

// Experience related types
export interface Experience {
  company: string;
  position: string;
  location: string;
  period: string;
  responsibilities: string[];
  icon: string;
  color: 'primary' | 'secondary' | 'accent';
}

// Education related types
export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
}

// Contact form related types
export interface ContactFormValues {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

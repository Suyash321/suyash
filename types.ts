
export interface Project {
  year: string;
  name: string;
  role: string;
  image: string;
  description: string;
  technologies: string[];
  caseStudy: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
export interface DeveloperData {
  name: string;
  title: string;
  email?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  techStack: string[];
}

export type CardTheme = 'dark-code' | 'ocean' | 'sunset' | 'matrix' | 'minimal';

export interface CardTemplate {
  id: CardTheme;
  name: string;
  description: string;
}

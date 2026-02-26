import type { ReactElement } from "react";
import { Badge } from "@/components/ui/badge";

export interface ProjectItem {
  title: string;
  description: string;
  imageId: string;
  badge?: ReactElement[];
  badges?: string[];
  link?: string;
  // blogLink?: string;
  repo: string;
  unmaintained?: boolean;
}

const url = process.env.BETTER_AUTH_URL || "https://lanaya-dev.vercel.app/";
export const projectsData: ProjectItem[] = [
  
];
export const MAIN_WEBSITE_URL = "https://lanaya.dev";

export interface VentureItem {
  title: string;
  description: string;
  type: "BUSINESS" | "CLIENT" | "SPONSORSHIP" | "OTHER";
  imageId?: string;
  link?: string;
  status?: string;
  date?: string;
  tags?: string[];
}

export const venturesData: VentureItem[] = [
  {
    title: "Project Alpha",
    description: "A high-performance system for real-time data analysis and visualization.",
    type: "BUSINESS",
    status: "OPERATIONAL",
    date: "2024",
    tags: ["Next.js", "Rust", "WebAssembly"]
  },
  {
    title: "Global Tech Solutions",
    description: "Custom enterprise software development for a leading logistics company.",
    type: "CLIENT",
    status: "COMPLETED",
    date: "2023",
    tags: ["Cloud Architecture", "Python", "Kubernetes"]
  },
  {
    title: "Open Source Initiative",
    description: "Monthly sponsorship for core contributors of critical web infrastructure.",
    type: "SPONSORSHIP",
    status: "ACTIVE",
    date: "ONGOING",
    tags: ["Community", "OSS", "Support"]
  }
];

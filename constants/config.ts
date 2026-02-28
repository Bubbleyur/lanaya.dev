export const MAIN_WEBSITE_URL = "https://lanaya.dev";
export const CLOUDINARY_CLOUD_NAME = "drrleg8t2";

export interface VentureItem {
  title: string;
  description: string;
  type: "BUSINESS" | "CLIENT" | "SPONSORSHIP" | "FREELANCE" | "E-COMMERCE" | "BRANDING";
  imageId?: string;
  link?: string;
  status?: string;
  date?: string;
  tags?: string[];
}

export const venturesData: VentureItem[] = [
  {
    title: "VONBAKE.MY.ID",
    description: "Transforming a home-based bakery into a digital-first brand with real-time order tracking and customer behavior analytics.",
    type: "BRANDING",
    imageId: "https://res.cloudinary.com/drrleg8t2/image/upload/v1772252724/www.vonbake.my.id__kki5fc.png",
    status: "LIVE",
    date: "2026",
    tags: ["Python", "Jinja2", "Flask", "PostgreSQL"],
    link: "vonbake.my.id"
  },
  {
    title: "My Game Item Shop!",
    description: "A specialized marketplace for high-value in-game assets and currency, optimized for secure and lightning-fast transactions.",
    type: "BUSINESS",
    imageId: "https://res.cloudinary.com/drrleg8t2/image/upload/v1772252837/www.itemku.com_t_gudgear-shop_gylmkg.png",
    status: "ARCHIVED",
    date: "2023",
    tags: ["E-commerce", "Digital Assets", "Payment Gateway"],
    link: "https://itemku.com/toko/gudgear-shop/10263538"
  },
  {
    title: "Custom Web Solutions",
    description: "Crafting high-conversion websites for SMEs and individuals, ranging from Badminton Court Booking systems to Automotive catalogs and Academic portfolios.",
    type: "FREELANCE",
    imageId: "https://res.cloudinary.com/drrleg8t2/image/upload/v1772253024/WhatsApp_Image_2026-01-19_at_18.16.57_agstrr.jpg",
    status: "ACTIVE",
    date: "ONGOING",
    tags: ["UI/UX", "Booking Systems", "SME Digitalization"]
  }
];

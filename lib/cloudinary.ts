import { CLOUDINARY_CLOUD_NAME } from "@/constants/config";

/**
 * Optimizes an external image URL using Cloudinary's fetch feature.
 * This applies automatic formatting, quality optimization, and resizing.
 * 
 * @param url The original image URL
 * @param width Optional width for resizing (default: 800)
 * @returns The optimized Cloudinary URL
 */
export function getOptimizedImage(url: string, width: number = 800): string {
  if (!url) return "";
  
  // If it's already a Cloudinary URL or a data URL, return as is
  if (url.includes("cloudinary.com") || url.startsWith("data:")) {
    return url;
  }

  // Cloudinary Fetch URL format:
  // https://res.cloudinary.com/<cloud_name>/image/fetch/<transformations>/<external_url>
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch`;
  const transformations = `f_auto,q_auto,w_${width},c_fill`;
  
  return `${baseUrl}/${transformations}/${encodeURIComponent(url)}`;
}

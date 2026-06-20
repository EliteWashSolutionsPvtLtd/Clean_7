import type { MetadataRoute } from "next";
import { canonicalPath, getSiteUrl } from "@/app/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/pricing", changeFrequency: "weekly", priority: 0.95 },
    { path: "/services", changeFrequency: "weekly", priority: 0.92 },
    { path: "/services/laundry", changeFrequency: "weekly", priority: 0.88 },
    {
      path: "/services/home-cleaning",
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      path: "/services/doorstep-car-wash",
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      path: "/services/pest-control",
      changeFrequency: "weekly",
      priority: 0.88,
    },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.85 },
    { path: "/help", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
    { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.4 },
    { path: "/terms-of-use", changeFrequency: "yearly", priority: 0.4 },
    { path: "/delete-account", changeFrequency: "yearly", priority: 0.45 },
  ];

  return entries.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${base}/` : canonicalPath(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

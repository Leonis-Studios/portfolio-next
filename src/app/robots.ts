import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Allows every crawler, including AI ones (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

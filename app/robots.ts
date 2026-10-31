import type { MetadataRoute } from "next";
import { SITE } from "@/lib/i18n";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Everything is public; naming the AI crawlers makes that explicit.
  const bots = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];
  return { rules: [{ userAgent: "*", allow: "/" }, { userAgent: bots, allow: "/" }], sitemap: `${SITE}/sitemap.xml` };
}

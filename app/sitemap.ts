import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { SITE, langs } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/features/", "/formats/", "/guides/", "/download/", "/faq/", "/privacy/", "/changelog/"];
  const paths = [...pages, ...guides("en").map((g) => `/guides/${g.slug}/`)];
  return paths.flatMap((p) =>
    langs.map((lang) => ({
      url: `${SITE}/${lang}${p}`,
      alternates: { languages: Object.fromEntries(langs.map((l) => [l, `${SITE}/${l}${p}`])) },
    })),
  );
}

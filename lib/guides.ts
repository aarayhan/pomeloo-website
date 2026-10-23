import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lang } from "./i18n";

export type GuideMeta = { slug: string; title: string; description: string; group: string; order: number };

const dir = (lang: Lang) => path.join(process.cwd(), "content", "guides", lang);

export function guides(lang: Lang): GuideMeta[] {
  return fs
    .readdirSync(dir(lang))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir(lang), f), "utf8"));
      return { slug: f.replace(/\.mdx$/, ""), ...(data as Omit<GuideMeta, "slug">) };
    })
    .sort((a, b) => a.order - b.order);
}

export const guideSource = (lang: Lang, slug: string) => fs.readFileSync(path.join(dir(lang), `${slug}.mdx`), "utf8");

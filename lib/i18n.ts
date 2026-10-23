import en from "@/dictionaries/en";
import id from "@/dictionaries/id";

export const langs = ["en", "id"] as const;
export type Lang = (typeof langs)[number];
export type Dict = typeof en;

export const isLang = (s: string): s is Lang => (langs as readonly string[]).includes(s);
export const dict = (lang: Lang): Dict => (lang === "id" ? id : en);

/** A page's language (the [lang] layout has already rejected anything else). */
export const pageLang = async (params: Promise<{ lang: string }>) => (await params).lang as Lang;

// Netlify sets URL to the site's main address at build time
export const SITE = process.env.URL ?? "https://pomeloo.netlify.app";

/** Metadata alternates for a page path like "/guides/compress/" (same path in every language). */
export function alternates(lang: Lang, path = "/") {
  return {
    canonical: `${SITE}/${lang}${path}`,
    languages: Object.fromEntries(langs.map((l) => [l, `${SITE}/${l}${path}`])),
  };
}

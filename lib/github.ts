// Facts read from PomeloO itself at build time, so the site never falls behind the app.
// Every fetch has a fallback: a failed request (offline, rate limit) still builds a working site.
import localCatalog from "@/data/catalog.json";

export const REPO = "aarayhan/PomeloO";
export const REPO_URL = `https://github.com/${REPO}`;
export const LATEST_URL = `${REPO_URL}/releases/latest`;

export type Catalog = {
  version: string;
  formats: Record<string, { kind: string; to: string[]; tools: string[]; tools_many: string[] }>;
  tools: Record<string, { short: string; name: string }>;
  actions: Record<string, { short: string; name: string; about: string }>;
};
export type Asset = { name: string; browser_download_url: string; size: number; digest?: string | null };
export type Release = {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  assets: Asset[];
};

async function get<T>(url: string): Promise<T | null> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const r = await fetch(url, { headers, cache: "force-cache" });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function releases(): Promise<Release[]> {
  const all = await get<Release[]>(`https://api.github.com/repos/${REPO}/releases?per_page=30`);
  return (all ?? []).filter((r) => !r.draft && !r.prerelease);
}

export type Download = { version: string; date: string; setup?: Asset; zip?: Asset };

export async function latest(): Promise<Download> {
  const r = (await releases())[0];
  if (!r) return { version: (await catalog()).version, date: "" };
  return {
    version: r.tag_name.replace(/^v/, ""),
    date: r.published_at,
    setup: r.assets.find((a) => /Setup.*\.exe$/i.test(a.name)),
    zip: r.assets.find((a) => /portable\.zip$/i.test(a.name)),
  };
}

export async function catalog(): Promise<Catalog> {
  const remote = await get<Catalog>(`https://raw.githubusercontent.com/${REPO}/main/docs/catalog.json`);
  return remote?.formats ? remote : (localCatalog as Catalog);
}

/** True once microsoft/winget-pkgs has the package (the submission PR is merged). */
export async function wingetReady(): Promise<boolean> {
  return !!(await get(`https://api.github.com/repos/microsoft/winget-pkgs/contents/manifests/a/aarayhan/PomeloO`));
}

export const mb =(bytes: number) => `${Math.round(bytes / 1048576)} MB`;

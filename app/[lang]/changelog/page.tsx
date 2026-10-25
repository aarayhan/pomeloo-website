import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import { Container, PageHead } from "@/components/ui";
import { REPO_URL, releases } from "@/lib/github";
import { alternates, dict, pageLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = dict(lang);
  return { title: t.changelog.title, description: t.changelog.sub, alternates: alternates(lang, "/changelog/") };
}

export default async function Changelog({ params }: Props) {
  const lang = await pageLang(params);
  const t = dict(lang).changelog;
  const all = await releases();
  // release notes are plain Markdown (format "md": no JSX, so any text in them is safe)
  const bodies = await Promise.all(
    all.map(async (r) => (await compileMDX({ source: r.body || "", options: { mdxOptions: { format: "md", remarkPlugins: [remarkGfm] } } })).content),
  );
  return (
    <Container className="max-w-3xl">
      <PageHead title={t.title} sub={t.sub} />
      {all.length === 0 && (
        <p>
          <Link href={`${REPO_URL}/releases`} className="text-accent">
            {t.none}
          </Link>
        </p>
      )}
      <ol className="space-y-12">
        {all.map((r, i) => (
          <li key={r.tag_name} className="border-l-2 border-line pl-6">
            <h2 className="headline text-3xl">
              <Link href={r.html_url} className="hover:text-accent">
                {r.name || r.tag_name}
              </Link>
            </h2>
            <p className="text-sm text-muted">
              {new Date(r.published_at).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", { dateStyle: "long" })}
            </p>
            <div className="prose mt-4">{bodies[i]}</div>
          </li>
        ))}
      </ol>
    </Container>
  );
}

import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/Mdx";
import JsonLd from "@/components/JsonLd";
import { Container } from "@/components/ui";
import { guideSource, guides } from "@/lib/guides";
import { SITE, type Lang, alternates, dict, langs } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => langs.flatMap((lang) => guides(lang).map((g) => ({ lang, slug: g.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const g = guides(lang as Lang).find((x) => x.slug === slug);
  return { title: g?.title, description: g?.description, alternates: alternates(lang as Lang, `/guides/${slug}/`) };
}

export default async function Guide({ params }: Props) {
  const { slug } = await params;
  const lang = (await params).lang as Lang;
  const t = dict(lang);
  const all = guides(lang);
  const i = all.findIndex((g) => g.slug === slug);
  const [g, prev, next] = [all[i], all[i - 1], all[i + 1]];
  const { content } = await compileMDX({
    source: guideSource(lang, slug),
    components: mdxComponents(t),
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  const groups = [...new Set(all.map((x) => x.group))];
  const url = `${SITE}/${lang}/guides/${slug}/`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: g.title,
      description: g.description,
      inLanguage: lang,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "PomeloO" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "PomeloO", item: `${SITE}/${lang}/` },
        { name: t.guidesPage.title, item: `${SITE}/${lang}/guides/` },
        { name: g.title, item: url },
      ].map((x, n) => ({ "@type": "ListItem", position: n + 1, ...x })),
    },
  ];
  return (
    <Container className="grid gap-12 pt-10 lg:grid-cols-[15rem_1fr]">
      <JsonLd data={ld} />
      <nav aria-label={t.guidesPage.title} className="hidden lg:block" data-pagefind-ignore>
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] space-y-6 overflow-y-auto pb-8 text-sm">
          {groups.map((group) => (
            <div key={group}>
              <p className="font-semibold">{t.guidesPage.groups[group] ?? group}</p>
              <ul className="mt-2 space-y-1 border-l border-line">
                {all
                  .filter((x) => x.group === group)
                  .map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={`/${lang}/guides/${x.slug}/`}
                        aria-current={x.slug === slug ? "page" : undefined}
                        className={`-ml-px block border-l py-1 pl-3 ${x.slug === slug ? "border-orange font-medium text-accent" : "border-transparent text-muted hover:text-fg"}`}
                      >
                        {x.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
      <article className="min-w-0 max-w-3xl">
        <Link href={`/${lang}/guides/`} className="text-sm text-muted hover:text-fg" data-pagefind-ignore>
          ← {t.guidesPage.all}
        </Link>
        <p className="mt-6 text-sm font-medium text-accent">{t.guidesPage.groups[g.group]}</p>
        <h1 className="headline mt-1 text-5xl">{g.title}</h1>
        <p className="mt-3 text-lg text-muted">{g.description}</p>
        <div className="prose mt-8">{content}</div>
        <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2" data-pagefind-ignore>
          {prev ? (
            <Link href={`/${lang}/guides/${prev.slug}/`} className="card rounded-[18px] p-4 transition hover:border-muted/40">
              <span className="text-xs text-muted">← {t.guidesPage.prev}</span>
              <span className="mt-1 block font-medium">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/${lang}/guides/${next.slug}/`}
              className="card rounded-[18px] p-4 text-right transition hover:border-muted/40"
            >
              <span className="text-xs text-muted">{t.guidesPage.next} →</span>
              <span className="mt-1 block font-medium">{next.title}</span>
            </Link>
          )}
        </nav>
        <a
          href={`https://github.com/aarayhan/pomeloo-website/blob/main/content/guides/${lang}/${slug}.mdx`}
          className="mt-6 inline-block text-sm text-muted hover:text-fg"
          data-pagefind-ignore
        >
          {t.guidesPage.edit}
        </a>
      </article>
    </Container>
  );
}

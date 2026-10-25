import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "@/components/client";
import { Container, PageHead } from "@/components/ui";
import { guides } from "@/lib/guides";
import { alternates, dict, pageLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = dict(lang);
  return { title: t.guidesPage.title, description: t.guidesPage.sub, alternates: alternates(lang, "/guides/") };
}

export default async function Guides({ params }: Props) {
  const lang = await pageLang(params);
  const t = dict(lang);
  const all = guides(lang);
  const groups = [...new Set(all.map((g) => g.group))];
  return (
    <Container>
      <PageHead title={t.guidesPage.title} sub={t.guidesPage.sub} />
      <div className="max-w-2xl" data-pagefind-ignore>
        <Search placeholder={t.guidesPage.search} />
      </div>
      {groups.map((group) => (
        <section key={group} className="mt-12">
          <h2 className="font-display text-xl font-semibold text-muted">{t.guidesPage.groups[group] ?? group}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {all
              .filter((g) => g.group === group)
              .map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/${lang}/guides/${g.slug}/`}
                    className="card block h-full rounded-[18px] p-5 transition hover:border-muted/40"
                  >
                    <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                    <p className="mt-1.5 text-sm text-muted">{g.description}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}

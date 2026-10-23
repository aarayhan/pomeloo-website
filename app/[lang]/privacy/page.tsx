import type { Metadata } from "next";
import { Fragment } from "react";
import { Container, PageHead } from "@/components/ui";
import { alternates, dict, pageLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLang(params);
  return { title: dict(lang).privacyPage.title, alternates: alternates(lang, "/privacy/") };
}

export default async function Privacy({ params }: Props) {
  const t = dict(await pageLang(params)).privacyPage;
  return (
    <Container className="max-w-3xl">
      <PageHead title={t.title} sub={t.updated} />
      <div className="prose">
        {t.sections.map((s) => (
          <Fragment key={s.h}>
            <h2>{s.h}</h2>
            <ul>
              {s.p.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </Container>
  );
}

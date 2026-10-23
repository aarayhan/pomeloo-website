import type { Metadata } from "next";
import { Container, PageHead } from "@/components/ui";
import { alternates, dict, pageLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = dict(lang);
  return { title: t.faq.title, alternates: alternates(lang, "/faq/") };
}

export default async function Faq({ params }: Props) {
  const t = dict(await pageLang(params));
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  };
  return (
    <Container className="max-w-3xl">
      <PageHead title={t.faq.title} />
      <div className="divide-y divide-line rounded-2xl border border-line bg-card">
        {t.faq.items.map((x) => (
          <details key={x.q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span className="text-orange transition group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-3 text-muted">{x.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </Container>
  );
}

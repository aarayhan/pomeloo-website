import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHead } from "@/components/ui";
import { guides } from "@/lib/guides";
import { alternates, dict, pageLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

// each feature group: a real screenshot and the guides that teach it
const SHOW: Record<string, [string, string[]]> = {
  convert: ["wheel-convert-jpg", ["wheel", "right-click-menu"]],
  tools: ["tool-editImage", ["compress", "photo-tools", "video-tools", "audio-tools", "pdf-tools"]],
  actions: ["wheel-actions-jpg", ["rename", "phone"]],
  notch: ["notch-shelf", ["notch", "notch-drop"]],
  phone: ["notch-phone", ["phone"]],
  extras: ["ocr-snip", ["screen-text", "paste-image", "recipes", "history"]],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = dict(lang);
  return { title: t.features.title, description: t.features.sub, alternates: alternates(lang, "/features/") };
}

export default async function Features({ params }: Props) {
  const lang = await pageLang(params);
  const t = dict(lang);
  const titles = Object.fromEntries(guides(lang).map((g) => [g.slug, g.title]));
  return (
    <Container>
      <PageHead title={t.features.title} sub={t.features.sub} />
      <div className="space-y-20">
        {t.groups.items.map((g, i) => {
          const [shot, related] = SHOW[g.key];
          return (
            <section key={g.key} className="grid items-center gap-8 lg:grid-cols-2">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <h2 className="font-display text-3xl font-semibold">{g.title}</h2>
                <p className="mt-3 text-lg text-muted">{g.body}</p>
                <ul className="mt-6 space-y-2">
                  {related.map((slug) => (
                    <li key={slug}>
                      <Link href={`/${lang}/guides/${slug}/`} className="inline-flex items-center gap-1.5 text-orange hover:underline">
                        <ArrowRight className="size-4" aria-hidden /> {titles[slug] ?? slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <img
                src={`/screens/${shot}.png`}
                alt={g.title}
                loading="lazy"
                className="max-h-[28rem] w-auto justify-self-center rounded-2xl border border-line object-contain shadow-2xl"
              />
            </section>
          );
        })}
      </div>
    </Container>
  );
}

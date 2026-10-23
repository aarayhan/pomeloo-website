import { ArrowRight, Download, Lock } from "lucide-react";
import Link from "next/link";
import { CopyButton } from "@/components/client";
import WheelDemo from "@/components/demos/wheel";
import FormatExplorer from "@/components/FormatExplorer";
import { ButtonLink, Card, Container } from "@/components/ui";
import { LATEST_URL, catalog, latest, mb, wingetReady } from "@/lib/github";
import { dict, pageLang } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await pageLang(params);
  const t = dict(lang);
  const [dl, cat, winget] = await Promise.all([latest(), catalog(), wingetReady()]);
  const tools = Object.fromEntries(Object.entries(cat.tools).map(([k, v]) => [k, v.name]));
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[36rem] bg-[radial-gradient(50%_50%_at_50%_40%,rgba(255,138,30,0.18),transparent)]"
        />
        <Container className="relative grid items-center gap-12 pt-16 pb-20 lg:grid-cols-[1fr_1.1fr] lg:pt-24">
          <div>
            <img src="/brand/logo.png" alt="" width={72} height={72} className="mb-6 size-16" />
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
              <span className="text-gradient">{t.hero.tagline}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{t.hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={dl.setup?.browser_download_url ?? LATEST_URL}>
                <Download className="size-5" aria-hidden />
                {t.hero.download}
              </ButtonLink>
              <ButtonLink href={`/${lang}/guides/`} kind="ghost">
                {t.hero.guides} <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted">
              v{dl.version}
              {dl.setup && ` · ${mb(dl.setup.size)}`} · {t.hero.free}
            </p>
            {winget && (
            <div className="mt-5 flex max-w-md items-center gap-3 rounded-xl border border-line bg-card px-4 py-2.5">
              <span className="text-xs text-muted">{t.hero.winget}</span>
              <code className="flex-1 truncate text-sm">winget install aarayhan.PomeloO</code>
              <CopyButton text="winget install aarayhan.PomeloO" label={t.download.copy} done={t.download.copied} />
            </div>
            )}
          </div>
          <WheelDemo captions={t.demo.wheel} replayLabel={t.demo.replay} label="PomeloO" />
        </Container>
      </section>

      <Container>
        <h2 className="font-display text-3xl font-semibold">{t.how.title}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {t.how.steps.map((s, i) => (
            <li key={s.title}>
              <Card className="h-full">
                <span className="bg-gradient grid size-9 place-items-center rounded-full font-bold text-ink">{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="mt-24">
        <h2 className="font-display text-3xl font-semibold">{t.groups.title}</h2>
        <p className="mt-3 text-muted">{t.groups.sub}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.groups.items.map((g) => (
            <Link key={g.key} href={`/${lang}/guides/${g.guide}/`} className="group">
              <Card className="h-full transition group-hover:border-orange/50">
                <h3 className="text-lg font-semibold">{g.title}</h3>
                <p className="mt-2 text-muted">{g.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange">
                  {t.features.howTo} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-24">
        <FormatExplorer formats={cat.formats} tools={tools} t={t.explorer} />
        <Link href={`/${lang}/formats/`} className="mt-4 inline-flex items-center gap-1 text-sm text-orange">
          {t.explorer.all} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Container>

      <Container className="mt-24">
        <div className="flex flex-col gap-6 rounded-3xl border border-line bg-card p-8 sm:flex-row sm:items-center">
          <Lock className="size-10 shrink-0 text-orange" aria-hidden />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-semibold">{t.privacy.title}</h2>
            <p className="mt-2 text-muted">{t.privacy.body}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href={`/${lang}/privacy/`} className="text-orange">
              {t.privacy.more} →
            </Link>
            <Link href={`/${lang}/faq/`} className="text-orange">
              {t.faqTeaser} →
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}

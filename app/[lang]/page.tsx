import { ArrowUpRight, Download, Lock } from "lucide-react";
import Link from "next/link";
import { CopyButton } from "@/components/client";
import WheelDemo from "@/components/demos/wheel";
import FormatExplorer from "@/components/FormatExplorer";
import { ButtonLink, Container } from "@/components/ui";
import { LATEST_URL, catalog, latest, mb, wingetReady } from "@/lib/github";
import { dict, pageLang } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await pageLang(params);
  const t = dict(lang);
  const [dl, cat, winget] = await Promise.all([latest(), catalog(), wingetReady()]);
  const tools = Object.fromEntries(Object.entries(cat.tools).map(([k, v]) => [k, v.name]));
  const formats = Object.values(cat.formats);
  const counts = [formats.reduce((n, f) => n + f.to.length, 0), formats.length, Object.keys(cat.tools).length];
  return (
    <>
      <Container className="pt-8 pb-20 text-center sm:pt-10">
        <div className="mx-auto max-w-xl text-left">
          <WheelDemo captions={t.demo.wheel} replayLabel={t.demo.replay} label="PomeloO" />
        </div>
        <h1 className="headline mx-auto mt-8 max-w-4xl text-5xl text-balance sm:text-7xl">{t.hero.tagline}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-balance text-muted">{t.hero.sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={dl.setup?.browser_download_url ?? LATEST_URL}>
            <Download className="size-5" aria-hidden />
            {t.hero.download}
          </ButtonLink>
          <ButtonLink href={`/${lang}/guides/`} kind="ghost">
            {t.hero.guides}
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-muted">
          v{dl.version}
          {dl.setup && `, ${mb(dl.setup.size)}`}. {t.hero.free}
        </p>
        {winget && (
          <div className="card mx-auto mt-5 flex max-w-md items-center gap-3 rounded-xl px-4 py-2.5 text-left">
            <span className="text-xs text-muted">{t.hero.winget}</span>
            <code className="flex-1 truncate text-sm">winget install aarayhan.PomeloO</code>
            <CopyButton text="winget install aarayhan.PomeloO" label={t.download.copy} done={t.download.copied} />
          </div>
        )}
      </Container>

      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {t.stats.map(([title, body], i) => (
            <div key={title} className="card rounded-[18px] px-6 pt-10 pb-8 text-center">
              <p className="headline text-7xl text-tang tabular-nums">{counts[i]}</p>
              <h2 className="mt-6 text-[22px] font-medium tracking-tight">{title}</h2>
              <p className="mt-2 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-28">
        <h2 className="headline text-center text-4xl sm:text-5xl">{t.how.title}</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {t.how.steps.map((s, i) => (
            <li key={s.title} className="card rounded-[18px] p-6">
              <span className="keycap grid size-11 place-items-center rounded-lg text-lg font-medium">{i + 1}</span>
              <h3 className="mt-6 text-[17px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="mt-28">
        <h2 className="headline text-center text-4xl sm:text-5xl">{t.groups.title}</h2>
        <p className="mt-3 text-center text-muted">{t.groups.sub}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.groups.items.map((g) => (
            <Link key={g.key} href={`/${lang}/guides/${g.guide}/`} className="card group flex flex-col rounded-[18px] p-6 transition hover:border-muted/40">
              <h3 className="text-[17px] font-semibold tracking-tight">{g.title}</h3>
              <p className="mt-2 flex-1 text-muted">{g.body}</p>
              <span className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm font-medium text-muted group-hover:text-fg">
                {t.features.howTo}
                <ArrowUpRight className="size-4 text-tang" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-28">
        <FormatExplorer formats={cat.formats} tools={tools} t={t.explorer} />
        <Link href={`/${lang}/formats/`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
          {t.explorer.all} <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </Container>

      <Container className="mt-28">
        <div className="card flex flex-col items-center gap-5 rounded-[18px] px-6 py-14 text-center">
          <Lock className="size-8 text-tang" aria-hidden />
          <h2 className="headline text-4xl">{t.privacy.title}</h2>
          <p className="max-w-xl text-muted">{t.privacy.body}</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href={`/${lang}/privacy/`} className="text-accent hover:underline">
              {t.privacy.more}
            </Link>
            <Link href={`/${lang}/faq/`} className="text-accent hover:underline">
              {t.faqTeaser}
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}

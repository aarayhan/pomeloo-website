import { Download, Package, ShieldAlert, Terminal } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/client";
import { ButtonLink, Card, Container, PageHead } from "@/components/ui";
import { type Asset, LATEST_URL, latest, mb, wingetReady } from "@/lib/github";
import { alternates, dict, pageLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = dict(lang);
  return { title: t.download.title, description: t.download.sub, alternates: alternates(lang, "/download/") };
}

function Sha({ a, label, copy, done }: { a?: Asset; label: string; copy: string; done: string }) {
  const sha = a?.digest?.replace(/^sha256:/, "");
  if (!sha) return null;
  return (
    <div className="mt-4 flex items-center gap-2 text-xs text-muted">
      <span className="shrink-0">{label}</span>
      <code className="min-w-0 flex-1 truncate" title={sha}>
        {sha}
      </code>
      <CopyButton text={sha} label={copy} done={done} />
    </div>
  );
}

export default async function DownloadPage({ params }: Props) {
  const lang = await pageLang(params);
  const t = dict(lang).download;
  const [dl, winget] = await Promise.all([latest(), wingetReady()]);
  const date = dl.date && new Date(dl.date).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", { dateStyle: "long" });
  return (
    <Container>
      <PageHead title={t.title} sub={t.sub} />
      <p className="-mt-4 mb-8 text-sm text-muted">
        {t.version} <strong className="font-medium text-fg">{dl.version}</strong>
        {date && `, ${t.released} ${date}`}
      </p>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="flex flex-col lg:col-span-2">
          <Download className="size-7 text-accent" aria-hidden />
          <h2 className="mt-4 text-xl font-semibold">{t.installer}</h2>
          <p className="mt-1 flex-1 text-muted">{t.installerNote}</p>
          <div className="mt-5">
            <ButtonLink href={dl.setup?.browser_download_url ?? LATEST_URL}>
              <Download className="size-5" aria-hidden />
              {dl.setup ? `${dl.setup.name} · ${mb(dl.setup.size)}` : t.installer}
            </ButtonLink>
          </div>
          <Sha a={dl.setup} label={t.sha} copy={t.copy} done={t.copied} />
        </Card>
        <Card className="flex flex-col">
          <Package className="size-7 text-accent" aria-hidden />
          <h2 className="mt-4 text-xl font-semibold">{t.portable}</h2>
          <p className="mt-1 flex-1 text-muted">{t.portableNote}</p>
          <div className="mt-5">
            <ButtonLink href={dl.zip?.browser_download_url ?? LATEST_URL} kind="ghost">
              {dl.zip ? `.zip · ${mb(dl.zip.size)}` : t.portable}
            </ButtonLink>
          </div>
          <Sha a={dl.zip} label={t.sha} copy={t.copy} done={t.copied} />
        </Card>
      </div>
      <Card className="mt-4">
        <div className="flex items-center gap-3">
          <Terminal className="size-6 text-accent" aria-hidden />
          <h2 className="text-xl font-semibold">{t.winget}</h2>
        </div>
        <div className="field mt-4 flex items-center gap-3 rounded-xl px-4 py-3">
          <code className="flex-1 truncate">winget install aarayhan.PomeloO</code>
          {winget && <CopyButton text="winget install aarayhan.PomeloO" label={t.copy} done={t.copied} />}
        </div>
        {!winget && <p className="mt-3 text-sm text-muted">{t.wingetNote}</p>}
      </Card>
      <Card className="mt-4 border-orange/30">
        <div className="flex items-center gap-3">
          <ShieldAlert className="size-6 text-accent" aria-hidden />
          <h2 className="text-xl font-semibold">{t.smartscreenTitle}</h2>
        </div>
        <p className="mt-3 text-muted">{t.smartscreen}</p>
      </Card>
      <div className="mt-8 flex flex-wrap gap-6 text-sm">
        <Link href={`/${lang}/guides/getting-started/`} className="text-accent hover:underline">
          {t.next}
        </Link>
        <Link href={LATEST_URL.replace("/latest", "")} className="text-muted hover:text-fg">
          {t.allReleases}
        </Link>
      </div>
    </Container>
  );
}

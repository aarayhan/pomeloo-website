import { Download, Menu } from "lucide-react";
import Link from "next/link";
import type { Dict, Lang } from "@/lib/i18n";
import { LangSwitch, ThemeToggle } from "./client";
import { Container, Wordmark } from "./ui";

export default function Header({ lang, t }: { lang: Lang; t: Dict }) {
  const links = [
    ["features", t.nav.features],
    ["guides", t.nav.guides],
    ["formats", t.nav.formats],
    ["faq", t.nav.faq],
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur" data-pagefind-ignore>
      <Container className="flex h-18 items-center gap-6">
        <Link href={`/${lang}/`} className="flex shrink-0 items-center gap-2" aria-label="PomeloO">
          <img src="/brand/logo.png" alt="" width={32} height={32} className="size-8 sm:hidden" />
          <span className="hidden sm:block">
            <Wordmark className="h-6" />
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <nav className="mr-2 hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map(([href, label]) => (
              <Link key={href} href={`/${lang}/${href}/`} className="rounded-lg px-3 py-2 text-[15px] text-muted hover:text-fg">
                {label}
              </Link>
            ))}
          </nav>
          <LangSwitch lang={lang} label={t.theme.language} />
          <ThemeToggle label={t.theme.toggle} />
          <Link
            href={`/${lang}/download/`}
            className="ml-2 hidden items-center gap-1.5 rounded-xl bg-fg px-4 py-2.5 text-sm font-medium text-card hover:opacity-85 sm:inline-flex"
          >
            <Download className="size-4" aria-hidden />
            {t.nav.download}
          </Link>
          {/* phones: a native disclosure, no JavaScript needed */}
          <details className="relative md:hidden">
            <summary
              className="grid size-9 cursor-pointer list-none place-items-center rounded-lg text-muted hover:text-fg [&::-webkit-details-marker]:hidden"
              aria-label={t.theme.menu}
            >
              <Menu className="size-5" aria-hidden />
            </summary>
            <nav className="card absolute right-0 mt-2 flex w-52 flex-col rounded-[18px] p-2 shadow-lg" aria-label={t.theme.menu}>
              {[...links, ["download", t.nav.download] as const].map(([href, label]) => (
                <Link key={href} href={`/${lang}/${href}/`} className="rounded-lg px-3 py-2.5 hover:bg-bg">
                  {label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}

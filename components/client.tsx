"use client";
// The few interactive bits of the chrome: theme, language switch, copy buttons, search.
import { Check, Copy, Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid size-9 place-items-center rounded-lg text-muted hover:text-fg"
    >
      <Sun className="hidden size-4.5 dark:block" aria-hidden />
      <Moon className="size-4.5 dark:hidden" aria-hidden />
    </button>
  );
}

/** Same page in the other language: /en/guides/x/ <-> /id/guides/x/ */
export function LangSwitch({ lang, label }: { lang: string; label: string }) {
  const path = usePathname() ?? `/${lang}/`;
  const other = lang === "id" ? "en" : "id";
  return (
    <Link
      href={path.replace(/^\/(en|id)(?=\/|$)/, `/${other}`)}
      hrefLang={other}
      lang={other}
      title={label}
      className="rounded-lg px-2 py-1.5 text-[15px] text-muted uppercase hover:text-fg"
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden>{other}</span>
    </Link>
  );
}

export function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(text).then(() => (setOk(true), setTimeout(() => setOk(false), 1500)))}
      className="card inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-muted hover:text-fg"
    >
      {ok ? <Check className="size-3.5 text-accent" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{ok ? done : label}</span>
    </button>
  );
}

declare global {
  interface Window {
    PagefindUI?: new (o: Record<string, unknown>) => unknown;
  }
}

/** Pagefind's ready-made search box. The index exists only after `npm run build` (not in `next dev`). */
export function Search({ placeholder }: { placeholder: string }) {
  useEffect(() => {
    const css = Object.assign(document.createElement("link"), { rel: "stylesheet", href: "/pagefind/pagefind-ui.css" });
    const js = Object.assign(document.createElement("script"), { src: "/pagefind/pagefind-ui.js" });
    js.onload = () =>
      window.PagefindUI &&
      new window.PagefindUI({ element: "#search", showImages: false, resetStyles: false, translations: { placeholder } });
    document.head.append(css, js);
    return () => (css.remove(), js.remove());
  }, [placeholder]);
  return <div id="search" className="pagefind-ui" />;
}

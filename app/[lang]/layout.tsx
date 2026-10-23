import "../globals.css";
import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/client";
import { SITE, alternates, dict, isLang, langs } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => langs.map((lang) => ({ lang }));

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = dict(lang);
  return {
    metadataBase: new URL(SITE),
    title: { default: t.meta.title, template: "%s · PomeloO" },
    description: t.meta.description,
    alternates: alternates(lang),
    openGraph: { type: "website", siteName: "PomeloO", images: ["/og.png"], locale: lang === "id" ? "id_ID" : "en_US" },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = dict(lang);
  return (
    <html lang={lang} suppressHydrationWarning className={`${inter.variable} ${lexend.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only z-50 rounded-lg bg-orange px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {lang === "id" ? "Langsung ke isi" : "Skip to content"}
          </a>
          <Header lang={lang} t={t} />
          <main id="main" className="flex-1" data-pagefind-body>
            {children}
          </main>
          <Footer lang={lang} t={t} />
        </Providers>
      </body>
    </html>
  );
}

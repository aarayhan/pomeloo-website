import Link from "next/link";
import { REPO_URL } from "@/lib/github";
import type { Dict, Lang } from "@/lib/i18n";
import { Container, Wordmark } from "./ui";

export default function Footer({ lang, t }: { lang: Lang; t: Dict }) {
  const cols = [
    [
      [`/${lang}/features/`, t.nav.features],
      [`/${lang}/guides/`, t.nav.guides],
      [`/${lang}/formats/`, t.nav.formats],
      [`/${lang}/download/`, t.nav.download],
    ],
    [
      [`/${lang}/faq/`, t.nav.faq],
      [`/${lang}/changelog/`, t.footer.changelog],
      [`/${lang}/privacy/`, t.footer.privacy],
    ],
    [
      [REPO_URL, t.footer.source],
      [`${REPO_URL}/issues`, t.footer.issues],
    ],
  ];
  return (
    <footer className="mt-24 border-t border-line py-12 text-sm" data-pagefind-ignore>
      <Container className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Wordmark className="h-6" />
          <p className="mt-3 text-muted">{t.footer.tagline}</p>
        </div>
        {cols.map((col, i) => (
          <ul key={i} className="space-y-2">
            {col.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-muted hover:text-fg">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </Container>
      <Container className="mt-10 space-y-1 text-xs text-muted">
        <p>{t.footer.license}</p>
        <p>{t.footer.tangerine}</p>
      </Container>
    </footer>
  );
}

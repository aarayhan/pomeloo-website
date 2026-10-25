import Link from "next/link";

export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
);

export function PageHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="pt-14 pb-10 sm:pt-20">
      <h1 className="headline text-5xl sm:text-6xl">{title}</h1>
      {sub && <p className="mt-4 max-w-2xl text-lg text-muted">{sub}</p>}
    </header>
  );
}

export function ButtonLink({
  href,
  children,
  kind = "primary",
}: {
  href: string;
  children: React.ReactNode;
  kind?: "primary" | "ghost";
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { rel: "noopener" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium transition ${kind === "primary" ? "bg-fg text-card hover:opacity-85" : "card hover:border-muted/40"}`}
    >
      {children}
    </Link>
  );
}

/** The PomeloO wordmark: light lettering on dark, dark lettering on light. */
export function Wordmark({ className = "h-7" }: { className?: string }) {
  return (
    <>
      <img src="/brand/wordmark-dark.png" alt="PomeloO" width={891} height={181} className={`hidden w-auto dark:block ${className}`} />
      <img src="/brand/wordmark-light.png" alt="PomeloO" width={891} height={181} className={`w-auto dark:hidden ${className}`} />
    </>
  );
}

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`card rounded-[18px] p-6 ${className}`}>{children}</div>
);

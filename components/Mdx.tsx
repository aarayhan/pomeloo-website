// Components the MDX guides can use: <Steps>, <Step title>, <Screenshot src alt caption>, <Keys k>,
// <Tip>, <Note>, <Demo name>. Server components, except the demos.
import fs from "node:fs";
import path from "node:path";
import { Info, Lightbulb } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import NotchDemo from "./demos/notch";
import { OcrDemo, PasteDemo, PhoneDemo, RecipeDemo } from "./demos/small";
import WheelDemo from "./demos/wheel";

// screenshots come from scripts/screenshots.py in PomeloO: Qt scale 2 on a 125% screen = 2.5 px per CSS px
const DENSITY = 2.5;

function pngSize(file: string): [number, number] {
  const b = fs.readFileSync(file);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

export function Screenshot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const url = `/screens/${src}.png`;
  const [w, h] = pngSize(path.join(process.cwd(), "public", url));
  return (
    <figure className="my-6">
      <a href={url} target="_blank" rel="noopener" className="inline-block max-w-full" title={alt}>
        <img
          src={url}
          alt={alt}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          style={{ width: Math.round(w / DENSITY) }}
          className="h-auto max-w-full rounded-xl border border-line shadow-lg"
        />
      </a>
      {caption && <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function Keys({ k }: { k: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline whitespace-nowrap">
      {k.split("+").map((key, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-muted">+</span>}
          <kbd className="keycap rounded-md px-1.5 py-0.5 font-sans text-[0.85em] font-medium">
            {key}
          </kbd>
        </span>
      ))}
    </span>
  );
}

export const Steps = ({ children }: { children: React.ReactNode }) => (
  <ol className="my-6 list-none! space-y-5 pl-0! [counter-reset:step]">{children}</ol>
);

export const Step = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <li className="relative pl-12 [counter-increment:step] before:absolute before:top-0 before:left-0 before:grid before:size-8 before:place-items-center before:rounded-full before:border before:border-line before:bg-card before:text-sm before:font-medium before:text-fg before:content-[counter(step)]">
    <p className="m-0! pt-1 font-semibold">{title}</p>
    {children && <div className="text-muted [&>p]:my-1!">{children}</div>}
  </li>
);

const Callout = ({ icon, children, tone }: { icon: React.ReactNode; children: React.ReactNode; tone: string }) => (
  <aside className={`my-6 flex gap-3 rounded-xl border p-4 ${tone}`}>
    <span className="mt-1 shrink-0">{icon}</span>
    <div className="[&>p]:my-0!">{children}</div>
  </aside>
);

export const Tip = ({ children }: { children: React.ReactNode }) => (
  <Callout tone="border-tang/25 bg-tang/5" icon={<Lightbulb className="size-4.5 text-accent" aria-hidden />}>
    {children}
  </Callout>
);

export const Note = ({ children }: { children: React.ReactNode }) => (
  <Callout tone="border-line bg-card" icon={<Info className="size-4.5 text-muted" aria-hidden />}>
    {children}
  </Callout>
);

const DEMOS = { wheel: WheelDemo, notch: NotchDemo, phone: PhoneDemo, ocr: OcrDemo, paste: PasteDemo, recipe: RecipeDemo };
export type DemoName = keyof typeof DEMOS;

export function Demo({ name, t }: { name: DemoName; t: Dict }) {
  const D = DEMOS[name];
  return <D captions={t.demo[name]} replayLabel={t.demo.replay} label={`Demo: ${name}`} />;
}

export const mdxComponents = (t: Dict) => ({
  Steps,
  Step,
  Screenshot,
  Keys,
  Tip,
  Note,
  Demo: ({ name }: { name: DemoName }) => <Demo name={name} t={t} />,
});

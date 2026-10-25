"use client";
// Shared pieces of the animated demos: a looping phase clock that runs only while visible,
// a "desktop" frame with step captions, a cursor, file icons and keycaps.
import { motion, useInView, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Steps through phases (ms each) on loop while on screen. Reduced motion: shows the last phase, still. */
export function usePhases(ms: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (reduce) return setPhase(ms.length - 1);
    if (!visible) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % ms.length), ms[phase]);
    return () => clearTimeout(t);
  }, [phase, visible, reduce, run, ms]);
  return { ref, phase, replay: () => (setPhase(0), setRun((r) => r + 1)) };
}

export function Frame({
  children,
  captions,
  step,
  replay,
  replayLabel,
  frameRef,
  label,
}: {
  children: React.ReactNode;
  captions: string[];
  step: number;
  replay: () => void;
  replayLabel: string;
  frameRef: React.Ref<HTMLDivElement>;
  label: string;
}) {
  return (
    <figure className="not-prose my-6" ref={frameRef}>
      <div
        role="img"
        aria-label={`${label}: ${captions.join(" → ")}`}
        className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-line bg-desk select-none"
      >
        <div aria-hidden className="absolute inset-0">
          {children}
        </div>
      </div>
      <figcaption className="mt-3 flex items-center gap-3 text-sm">
        <ol className="flex flex-1 flex-wrap gap-x-4 gap-y-1" aria-hidden>
          {captions.map((c, i) => (
            <li key={c} className={`flex items-center gap-1.5 transition-colors ${i === step ? "text-fg" : "text-muted"}`}>
              <span className={`size-1.5 shrink-0 rounded-full transition-colors ${i === step ? "bg-tang" : "bg-line"}`} />
              {c}
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={replay}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted hover:text-fg"
        >
          <RotateCcw className="size-3.5" aria-hidden /> {replayLabel}
        </button>
      </figcaption>
    </figure>
  );
}

const ease = { type: "spring", stiffness: 140, damping: 20 } as const;

/** Arrow cursor at x/y (percent of the frame). `grab`: holding something. */
export function Cursor({ x, y, grab = false }: { x: number; y: number; grab?: boolean }) {
  return (
    <motion.div className="absolute z-30" initial={false} animate={{ left: `${x}%`, top: `${y}%` }} transition={ease}>
      <motion.svg width="22" height="26" viewBox="0 0 22 26" animate={{ scale: grab ? 0.9 : 1 }} className="drop-shadow">
        <path d="M2 2 L2 21 L7 16.5 L10.5 24 L14 22.5 L10.6 15 L17.5 15 Z" fill="#111" stroke="#fff" strokeWidth="1.5" />
      </motion.svg>
    </motion.div>
  );
}

const TINT: Record<string, string> = {
  heic: "#3b82f6", jpg: "#3b82f6", png: "#22c55e", webp: "#14b8a6", pdf: "#ef4444", mp4: "#a855f7",
  docx: "#2563eb", txt: "#a1a1aa",
};

/** A document icon with its name. `onDark`: light lettering, for the black notch. */
export function FileIcon({ name, className = "", onDark = false }: { name: string; className?: string; onDark?: boolean }) {
  const ext = name.split(".").pop() ?? "";
  return (
    <div className={`flex w-16 flex-col items-center gap-1 ${className}`}>
      <div className="relative h-14 w-11 rounded-md border border-black/5 bg-white shadow-md">
        <div className="absolute top-0 right-0 size-3 rounded-bl-md bg-zinc-200" />
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded px-1 text-[9px] font-bold text-white uppercase"
          style={{ background: TINT[ext] ?? "#71717a" }}
        >
          {ext}
        </div>
      </div>
      <span className={`max-w-20 truncate text-[11px] ${onDark ? "text-zinc-200" : "text-fg"}`}>{name}</span>
    </div>
  );
}

export function Keycap({ children, down }: { children: React.ReactNode; down: boolean }) {
  return (
    <span data-down={down || undefined} className="keycap inline-block rounded-lg px-3.5 py-1.5 text-sm font-medium">
      {children}
    </span>
  );
}

/** A plain Explorer-like window (title + body), positioned in percent. */
export function Win({ title, className, children }: { title: string; className: string; children?: React.ReactNode }) {
  return (
    <div className={`absolute rounded-xl border border-line bg-card shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2 text-[11px] text-muted">
        <span className="size-2 rounded-full bg-line" />
        {title}
      </div>
      {children}
    </div>
  );
}

export const Toast = ({ show, children }: { show: boolean; children: React.ReactNode }) => (
  <motion.div
    initial={false}
    animate={{ opacity: show ? 1 : 0, y: show ? 0 : -8 }}
    className="absolute top-0 left-1/2 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-5 py-2 text-sm font-semibold whitespace-nowrap text-zinc-100"
  >
    {children}
  </motion.div>
);

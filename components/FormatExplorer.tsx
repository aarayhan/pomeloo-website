"use client";
// "What can PomeloO do with my file?": type or pick a format, see its conversions and tools (from catalog.json).
import { useState } from "react";
import type { Catalog } from "@/lib/github";
import type { Dict } from "@/lib/i18n";

const POPULAR = ["heic", "jpg", "png", "mp4", "mov", "mp3", "pdf", "docx", "pptx", "xlsx", "epub", "zip"];

const Chip = ({ children, hot = false }: { children: React.ReactNode; hot?: boolean }) => (
  <span
    className={`rounded-lg border px-2.5 py-1 text-sm ${hot ? "border-orange/50 bg-orange/10 font-semibold uppercase" : "border-line bg-bg"}`}
  >
    {children}
  </span>
);

export default function FormatExplorer({
  formats,
  tools,
  t,
}: {
  formats: Catalog["formats"];
  tools: Record<string, string>;
  t: Dict["explorer"];
}) {
  const [ext, setExt] = useState("heic");
  const key = ext.trim().toLowerCase().replace(/^\./, "");
  const f = formats[key];
  return (
    <div className="rounded-3xl border border-line bg-card p-5 sm:p-8">
      <label htmlFor="fmt" className="font-display text-2xl font-semibold sm:text-3xl">
        {t.title}
      </label>
      <p className="mt-2 text-muted">{t.sub}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <input
          id="fmt"
          list="fmt-list"
          value={ext}
          onChange={(e) => setExt(e.target.value)}
          placeholder={t.placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-40 rounded-xl border border-line bg-bg px-4 py-2.5 font-semibold uppercase outline-none focus:border-orange"
        />
        <datalist id="fmt-list">
          {Object.keys(formats).map((e) => (
            <option key={e} value={e} />
          ))}
        </datalist>
        {POPULAR.filter((p) => formats[p]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setExt(p)}
            aria-pressed={p === key}
            className={`rounded-lg px-2.5 py-1.5 text-sm uppercase ${p === key ? "bg-gradient font-semibold text-ink" : "text-muted hover:text-fg"}`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="mt-6 min-h-40" aria-live="polite">
        {!f ? (
          key && <p className="text-muted">{t.none}</p>
        ) : (
          <dl className="grid gap-5 md:grid-cols-[10rem_1fr]">
            {f.to.length > 0 && (
              <>
                <dt className="pt-1 text-sm font-semibold text-muted">{t.converts}</dt>
                <dd className="flex flex-wrap gap-2">
                  {f.to.map((x) => (
                    <Chip key={x} hot>
                      {x}
                    </Chip>
                  ))}
                </dd>
              </>
            )}
            {f.tools.length > 0 && (
              <>
                <dt className="pt-1 text-sm font-semibold text-muted">{t.tools}</dt>
                <dd className="flex flex-wrap gap-2">
                  {f.tools.map((x) => (
                    <Chip key={x}>{tools[x] ?? x}</Chip>
                  ))}
                </dd>
              </>
            )}
            {f.tools_many.length > 0 && (
              <>
                <dt className="pt-1 text-sm font-semibold text-muted">{t.toolsMany}</dt>
                <dd className="flex flex-wrap gap-2">
                  {f.tools_many.map((x) => (
                    <Chip key={x}>{tools[x] ?? x}</Chip>
                  ))}
                </dd>
              </>
            )}
          </dl>
        )}
      </div>
    </div>
  );
}

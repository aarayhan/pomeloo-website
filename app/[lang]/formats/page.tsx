import type { Metadata } from "next";
import FormatExplorer from "@/components/FormatExplorer";
import { Container, PageHead } from "@/components/ui";
import { catalog } from "@/lib/github";
import { alternates, dict, pageLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = dict(lang);
  return { title: t.formats.title, description: t.formats.sub, alternates: alternates(lang, "/formats/") };
}

export default async function Formats({ params }: Props) {
  const lang = await pageLang(params);
  const t = dict(lang);
  const cat = await catalog();
  const tools = Object.fromEntries(Object.entries(cat.tools).map(([k, v]) => [k, v.name]));
  const kinds = [...new Set(Object.values(cat.formats).map((f) => f.kind))];
  return (
    <Container>
      <PageHead title={t.formats.title} sub={t.formats.sub} />
      <FormatExplorer formats={cat.formats} tools={tools} t={t.explorer} />
      {kinds.map((kind) => (
        <section key={kind} className="mt-14">
          <h2 className="font-display text-2xl font-semibold">{t.kinds[kind] ?? kind}</h2>
          <div className="card mt-4 overflow-x-auto rounded-[18px]">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="font-display text-base text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">{t.formats.input}</th>
                  <th className="px-4 py-3 font-semibold">{t.formats.output}</th>
                  <th className="px-4 py-3 font-semibold">{t.formats.tools}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cat.formats)
                  .filter(([, f]) => f.kind === kind)
                  .map(([ext, f]) => (
                    <tr key={ext} id={ext} className="border-t border-line align-top">
                      <th scope="row" className="px-4 py-3 font-semibold uppercase">
                        {ext}
                      </th>
                      <td className="px-4 py-3 uppercase">{f.to.join(", ") || "–"}</td>
                      <td className="px-4 py-3 text-muted">
                        {[...f.tools, ...f.tools_many].map((x) => tools[x] ?? x).join(", ") || "–"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </Container>
  );
}

# PomeloO website

The introduction and how-to site for [PomeloO](https://github.com/aarayhan/PomeloO), the drag-and-tap file
converter for Windows. English and Indonesian. Fully static: no server, no cookies, no analytics.

**Stack:** Next.js 16 (App Router, `output: "export"`), Tailwind CSS 4, Motion for the animated demos, MDX guides
(next-mdx-remote + remark-gfm), Pagefind search, hosted on Netlify.

## Develop

```sh
npm install
npm run dev        # http://localhost:3000/en/ (search only works after a build)
npm run check      # TypeScript
npm run build      # out/ + the Pagefind index
npm run serve      # preview out/
```

## Where things are

| Path | What |
|---|---|
| `app/[lang]/` | Pages: home, features, formats, guides, download, faq, privacy, changelog |
| `content/guides/{en,id}/*.mdx` | One guide per file and language; front matter sets title, group and order |
| `components/Mdx.tsx` | What guides can use: `<Steps>`, `<Step>`, `<Screenshot>`, `<Keys>`, `<Tip>`, `<Note>`, `<Demo>` |
| `components/demos/` | The six animated demos (wheel, notch, phone, ocr, paste, recipe) |
| `dictionaries/{en,id}.ts` | All other text; `id.ts` is type-checked against `en.ts` |
| `lib/github.ts` | Build-time data: latest release, release notes, winget status, `catalog.json` |
| `public/screens/` | Real app screenshots |

## Data from PomeloO

At build time the site reads, from the PomeloO repo:

- `docs/catalog.json` (formats, conversions and tools; made by `scripts/export_catalog.py`). `data/catalog.json`
  is the fallback when GitHub can't be reached.
- The GitHub releases: the download buttons, sizes, SHA-256 and the changelog are always the latest.

Set `GITHUB_TOKEN` in Netlify's environment if builds ever hit GitHub's rate limit.

PomeloO's CI calls this site's Netlify build hook after every push, so a new release republishes the site.

## Screenshots

From the PomeloO repo (the notch hides from screen capture, so widgets are rendered directly):

```powershell
.venv\Scripts\python.exe scripts\screenshots.py ..\pomeloo-website\public\screens
```

They are rendered at 2.5 px per CSS pixel; `<Screenshot>` sizes them from the PNG itself.

## License

MIT. PomeloO itself is AGPL-3.0.

import { guides } from "@/lib/guides";
import { SITE } from "@/lib/i18n";

export const dynamic = "force-static";

// llms.txt: a plain summary for AI assistants. The guide list is built from the guides, so it never goes stale.
export function GET() {
  const list = guides("en")
    .map((g) => `- [${g.title}](${SITE}/en/guides/${g.slug}/): ${g.description}`)
    .join("\n");
  const body = `# PomeloO

> PomeloO is a free, open-source file converter and toolbox for Windows 10 (1809+) and Windows 11. Drag files, press Shift (or use the Explorer menu), and pick a format. Everything is processed on the PC; nothing is uploaded. It is a Windows alternative to Tangerine for macOS.

- Price: free, no ads, no account. License: GNU AGPL-3.0.
- Does: 275+ conversions between images, video, audio, documents and PDFs, 34 tools, file actions, recipes with watch folders, history with undo, copy text or QR links from the screen (OCR), paste an image as a file, send files to a phone by QR.
- Download: ${SITE}/en/download/
- Source code: https://github.com/aarayhan/PomeloO
- Indonesian version of this site: ${SITE}/id/

## Guides

${list}

## More

- [Supported formats](${SITE}/en/formats/)
- [Features](${SITE}/en/features/)
- [FAQ](${SITE}/en/faq/)
- [Privacy](${SITE}/en/privacy/)
- [Changelog](${SITE}/en/changelog/)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

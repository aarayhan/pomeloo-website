// English UI and page text. dictionaries/id.ts mirrors every key (it is typed against this file).
const en = {
  langName: "English",
  meta: {
    title: "PomeloO: drag a file, tap a key, pick a format",
    description:
      "A free file converter and toolbox for Windows. 275+ conversions, 34 tools, the notch, copy text from the screen, send files to your phone. Everything stays on your PC.",
  },
  nav: { features: "Features", formats: "Formats", guides: "Guides", download: "Download", faq: "FAQ" },
  theme: { toggle: "Switch light / dark", menu: "Menu", language: "Bahasa Indonesia" },
  hero: {
    tagline: "Drag a file, tap a key, pick a format.",
    sub: "A fast file converter and file toolbox for Windows. Everything happens on your PC: nothing is uploaded.",
    download: "Download for Windows",
    free: "Free and open source, for Windows 10 and 11.",
    winget: "or with winget",
    guides: "See how it works",
  },
  stats: [
    ["Conversion options", "Across images, video, audio, documents, slides and archives."],
    ["File types it opens", "From HEIC photos to EPUB books."],
    ["File tools", "Compress, crop, trim, merge, rename and more."],
  ],
  how: {
    title: "Three moves, any file",
    steps: [
      { title: "Drag a file", body: "Pick up any file in Explorer or on the desktop, like you always do." },
      { title: "Tap Shift", body: "A wheel of formats appears right under the cursor. Ctrl gives tools, Alt gives actions." },
      { title: "Drop it on a format", body: "The converted copy appears next to the original. The original is never touched." },
    ],
  },
  groups: {
    title: "Everything it does",
    sub: "One small tray app. No windows to open, no uploads, no accounts.",
    items: [
      {
        key: "convert",
        title: "275+ conversions",
        body: "Photos (HEIC, WebP, AVIF, SVG…), audio, video and GIF, PDF, Word, Markdown, EPUB, slides, spreadsheets, subtitles and archives, RAR too.",
        guide: "wheel",
      },
      {
        key: "tools",
        title: "34 tools",
        body: "Compress to a size, edit and annotate photos, crop, redact faces and text, trim, split and join video, normalize audio, PDF password, watermark and page numbers, OCR.",
        guide: "compress",
      },
      {
        key: "actions",
        title: "8 actions",
        body: "Share, Float, Copy, Move, Copy Path, Terminal, Rename with numbering and date taken, and Send to Phone.",
        guide: "rename",
      },
      {
        key: "notch",
        title: "The notch",
        body: "A black pill at the top of the screen: your shelf, running jobs, clipboard history, recent results. Drag a file to it for Fit WhatsApp, Fit Email and Fit Web.",
        guide: "notch",
      },
      {
        key: "phone",
        title: "Phone, both ways",
        body: "A QR code sends files to your phone over your own Wi-Fi, and the phone can send files back. No app, no cable, no cloud.",
        guide: "phone",
      },
      {
        key: "extras",
        title: "Everyday extras",
        body: "Copy any text on screen with Win+Ctrl+T, paste a copied image into a folder as a file, recipes with watch folders, and history with undo.",
        guide: "screen-text",
      },
    ],
  },
  explorer: {
    title: "What can PomeloO do with my file?",
    sub: "Pick or type a file type.",
    placeholder: "e.g. heic, mp4, pdf",
    converts: "Converts to",
    tools: "Tools",
    toolsMany: "With several files",
    none: "PomeloO doesn't open this type (yet).",
    all: "See every format",
  },
  privacy: {
    title: "Your files never leave your PC",
    body: "No telemetry, no accounts, no uploads. Conversions run on your own computer with well-known open-source engines.",
    more: "Read the privacy note",
  },
  faqTeaser: "Questions? Read the FAQ",
  kinds: {
    image: "Images",
    audio: "Audio",
    video: "Video",
    document: "Documents",
    spreadsheet: "Spreadsheets",
    subtitle: "Subtitles",
    archive: "Archives",
  } as Record<string, string>,
  features: {
    title: "Features",
    sub: "Every part of PomeloO, and the guide that shows you how.",
    howTo: "How to",
  },
  formats: {
    title: "Formats",
    sub: "Every file type PomeloO opens, what it converts to, and the tools you get for it.",
    input: "Input",
    output: "Converts to",
    tools: "Tools",
  },
  guidesPage: {
    title: "Guides",
    sub: "Short, step-by-step lessons for every feature. Start at the top if PomeloO is new to you.",
    search: "Search the guides",
    groups: {
      start: "Getting started",
      basics: "The basics",
      notch: "The notch",
      everyday: "Everyday extras",
      tools: "Tools",
      organize: "Organize",
      setup: "Setup",
    } as Record<string, string>,
    prev: "Previous",
    next: "Next",
    edit: "Improve this page on GitHub",
    all: "All guides",
  },
  download: {
    title: "Download PomeloO",
    sub: "Free and open source (AGPL-3.0). Windows 10 (1809 or newer) or Windows 11, 64-bit.",
    installer: "Installer",
    installerNote: "Recommended. No admin rights needed: it installs for your user only.",
    portable: "Portable zip",
    portableNote: "No installer. Unzip anywhere and run PomeloO.exe.",
    winget: "winget",
    wingetNote: "Waiting for the Windows Package Manager to accept it. Until then, use the installer.",
    version: "Version",
    released: "Released",
    sha: "SHA-256",
    copy: "Copy",
    copied: "Copied",
    smartscreenTitle: "“Windows protected your PC”?",
    smartscreen:
      "The installer isn't code-signed yet, so Windows SmartScreen warns about it. Click More info, then Run anyway. The source code and the build are public on GitHub.",
    allReleases: "All releases and release notes",
    next: "Next: install and first conversion",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "Is PomeloO free?", a: "Yes. It's free and open source under the GNU AGPL-3.0 license. No ads, no trial, no account." },
      {
        q: "Are my files uploaded anywhere?",
        a: "No. Every conversion runs on your PC. PomeloO only touches the network for two things you start yourself: the one-time slide engine download, and Send to Phone, which stays on your own Wi-Fi.",
      },
      {
        q: "Windows says “Windows protected your PC”. Is it safe?",
        a: "The installer isn't code-signed yet, so SmartScreen doesn't know it. Click More info, then Run anyway. The code and the build that made the installer are public on GitHub.",
      },
      {
        q: "Where does the converted file go?",
        a: "Next to the original, with the new extension (photo.webp). If the name is taken, PomeloO adds a number (photo 2.webp). The original is never changed.",
      },
      {
        q: "Tapping Shift while dragging does nothing.",
        a: "Check that PomeloO is running (the orange icon in the tray) and that Settings → Wheel while dragging is on. The tap has to happen while the mouse button is still held down.",
      },
      {
        q: "Why is the app so big?",
        a: "It carries its own engines (ffmpeg, pandoc, PDF and image libraries) so it works offline with nothing else installed. On first start it compresses its own folder with Windows' built-in compression, to about 240 MB on disk.",
      },
      {
        q: "Does it work on Mac or Linux?",
        a: "No, PomeloO is made for Windows 10 and 11. On a Mac, have a look at Tangerine, which inspired it.",
      },
      {
        q: "Which languages can Copy text (OCR) read?",
        a: "The languages installed in Windows (Settings → Time & language → Language). Add a language there and PomeloO can read it.",
      },
      {
        q: "How do I remove it?",
        a: "Settings → Apps → Installed apps → PomeloO → Uninstall. That also removes the right-click menu and the start-with-Windows entry.",
      },
    ],
  },
  privacyPage: {
    title: "Privacy",
    updated: "This note covers PomeloO the app and this website.",
    sections: [
      {
        h: "The app",
        p: [
          "PomeloO has no telemetry, no accounts and no uploads. Your files are converted on your own PC.",
          "It uses the network in only two cases, both started by you: the one-time download of a private LibreOffice copy (only if you convert slides and no Office suite is installed; from The Document Foundation, checksum-verified), and Send to Phone.",
          "Send to Phone serves files on your own Wi-Fi only, behind a random link, and only while its QR code is open.",
          "The notch's clipboard history stays in memory, is never written to disk, and skips anything a password manager marks as private. The notch never shows in screenshots or screen sharing.",
          "To spot the drag-and-tap and Ctrl+V gestures, PomeloO watches whether those keys are down. Nothing you type is recorded.",
        ],
      },
      {
        h: "This website",
        p: [
          "This site is a set of static pages. It sets no cookies, has no analytics and loads no third-party scripts. Fonts are served from this site.",
          "Our host (Netlify) keeps standard server logs, like any web server.",
        ],
      },
    ],
  },
  changelog: { title: "What's new", sub: "Every PomeloO release, newest first.", none: "Release notes are on GitHub." },
  notFound: { title: "Page not found", body: "This page doesn't exist (anymore).", home: "Go to the home page" },
  footer: {
    tagline: "A file converter and toolbox for Windows.",
    source: "Source code",
    issues: "Report a problem",
    privacy: "Privacy",
    changelog: "What's new",
    license: "PomeloO is free software (AGPL-3.0). This website is MIT-licensed.",
    tangerine: "Inspired by Tangerine for macOS; not affiliated with it.",
  },
  demo: {
    replay: "Replay",
    wheel: ["Drag photo.heic…", "tap Shift", "drop on PNG", "photo.png is ready"],
    notch: ["Hover the notch", "the panel opens", "drag a file to the top", "drop on Fit WhatsApp"],
    phone: ["Choose Send to Phone", "scan the QR code", "the file opens on the phone"],
    ocr: ["Press Win+Ctrl+T", "drag over the text", "it's on the clipboard"],
    paste: ["Copy an image", "press Ctrl+V in a folder", "it is saved there as a PNG"],
    recipe: ["Pick steps", "save as a recipe", "one ★ button runs them all"],
  },
};

export default en;

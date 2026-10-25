// Teks Indonesia. Kunci-kuncinya sama persis dengan dictionaries/en.ts (dicek oleh TypeScript).
// Nama tombol dan menu PomeloO tetap dalam bahasa Inggris, sama seperti di aplikasinya.
import type en from "./en";

const id: typeof en = {
  langName: "Bahasa Indonesia",
  meta: {
    title: "PomeloO: seret file, ketuk tombol, pilih format",
    description:
      "Konverter dan kotak perkakas file gratis untuk Windows. 275+ konversi, 34 alat, notch, salin teks dari layar, kirim file ke HP. Semua diproses di PC kamu.",
  },
  nav: { features: "Fitur", formats: "Format", guides: "Panduan", download: "Unduh", faq: "FAQ" },
  theme: { toggle: "Ganti terang / gelap", menu: "Menu", language: "English" },
  hero: {
    tagline: "Seret file, ketuk tombol, pilih format.",
    sub: "Konverter dan kotak perkakas file yang cepat untuk Windows. Semuanya terjadi di PC kamu: tidak ada yang diunggah.",
    download: "Unduh untuk Windows",
    free: "Gratis dan open source, untuk Windows 10 dan 11.",
    winget: "atau lewat winget",
    guides: "Lihat cara kerjanya",
  },
  stats: [
    ["Pilihan konversi", "Untuk foto, video, audio, dokumen, slide, dan arsip."],
    ["Jenis file yang bisa dibuka", "Dari foto HEIC sampai buku EPUB."],
    ["Alat file", "Kompres, potong, pangkas, gabung, ganti nama, dan lainnya."],
  ],
  how: {
    title: "Tiga gerakan, file apa saja",
    steps: [
      { title: "Seret file", body: "Ambil file apa saja di Explorer atau desktop, seperti biasa." },
      { title: "Ketuk Shift", body: "Roda format muncul tepat di bawah kursor. Ctrl untuk alat, Alt untuk aksi." },
      { title: "Lepas di format", body: "Salinan hasil konversi muncul di sebelah file asli. File aslinya tidak pernah diubah." },
    ],
  },
  groups: {
    title: "Semua yang bisa dilakukan",
    sub: "Satu aplikasi kecil di tray. Tanpa jendela, tanpa unggah, tanpa akun.",
    items: [
      {
        key: "convert",
        title: "275+ konversi",
        body: "Foto (HEIC, WebP, AVIF, SVG…), audio, video dan GIF, PDF, Word, Markdown, EPUB, slide, spreadsheet, subtitle dan arsip, termasuk RAR.",
        guide: "wheel",
      },
      {
        key: "tools",
        title: "34 alat",
        body: "Kompres ke ukuran tertentu, edit dan coret foto, crop, sensor wajah dan teks, potong, bagi dan gabung video, samakan volume audio, password PDF, watermark dan nomor halaman, OCR.",
        guide: "compress",
      },
      {
        key: "actions",
        title: "8 aksi",
        body: "Share, Float, Copy, Move, Copy Path, Terminal, Rename dengan penomoran dan tanggal foto, dan Send to Phone.",
        guide: "rename",
      },
      {
        key: "notch",
        title: "Notch",
        body: "Pil hitam di atas layar: rak file, proses yang berjalan, riwayat clipboard, hasil terbaru. Seret file ke sana untuk Fit WhatsApp, Fit Email dan Fit Web.",
        guide: "notch",
      },
      {
        key: "phone",
        title: "HP, dua arah",
        body: "Kode QR mengirim file ke HP lewat Wi-Fi kamu sendiri, dan HP bisa mengirim file balik. Tanpa aplikasi, tanpa kabel, tanpa cloud.",
        guide: "phone",
      },
      {
        key: "extras",
        title: "Fitur sehari-hari",
        body: "Salin teks apa pun di layar dengan Win+Ctrl+T, tempel gambar yang disalin ke folder sebagai file, resep dengan folder pantau, dan riwayat dengan undo.",
        guide: "screen-text",
      },
    ],
  },
  explorer: {
    title: "PomeloO bisa apa dengan file saya?",
    sub: "Pilih atau ketik jenis file.",
    placeholder: "misalnya heic, mp4, pdf",
    converts: "Bisa diubah ke",
    tools: "Alat",
    toolsMany: "Untuk beberapa file",
    none: "PomeloO belum bisa membuka jenis file ini.",
    all: "Lihat semua format",
  },
  privacy: {
    title: "File kamu tidak pernah keluar dari PC",
    body: "Tanpa telemetri, tanpa akun, tanpa unggah. Konversi berjalan di komputer kamu sendiri dengan mesin open source yang sudah terkenal.",
    more: "Baca catatan privasi",
  },
  faqTeaser: "Ada pertanyaan? Baca FAQ",
  kinds: {
    image: "Gambar",
    audio: "Audio",
    video: "Video",
    document: "Dokumen",
    spreadsheet: "Spreadsheet",
    subtitle: "Subtitle",
    archive: "Arsip",
  },
  features: {
    title: "Fitur",
    sub: "Setiap bagian PomeloO, dan panduan yang menunjukkan caranya.",
    howTo: "Caranya",
  },
  formats: {
    title: "Format",
    sub: "Setiap jenis file yang bisa dibuka PomeloO, bisa diubah ke apa, dan alat yang tersedia.",
    input: "Masukan",
    output: "Bisa diubah ke",
    tools: "Alat",
  },
  guidesPage: {
    title: "Panduan",
    sub: "Pelajaran singkat langkah demi langkah untuk setiap fitur. Mulai dari atas kalau kamu baru kenal PomeloO.",
    search: "Cari di panduan",
    groups: {
      start: "Mulai",
      basics: "Dasar",
      notch: "Notch",
      everyday: "Fitur sehari-hari",
      tools: "Alat",
      organize: "Merapikan",
      setup: "Pengaturan",
    },
    prev: "Sebelumnya",
    next: "Berikutnya",
    edit: "Perbaiki halaman ini di GitHub",
    all: "Semua panduan",
  },
  download: {
    title: "Unduh PomeloO",
    sub: "Gratis dan open source (AGPL-3.0). Windows 10 (1809 atau lebih baru) atau Windows 11, 64-bit.",
    installer: "Installer",
    installerNote: "Disarankan. Tidak perlu hak admin: terpasang hanya untuk akun kamu.",
    portable: "Zip portabel",
    portableNote: "Tanpa installer. Ekstrak di mana saja lalu jalankan PomeloO.exe.",
    winget: "winget",
    wingetNote: "Sedang menunggu diterima oleh Windows Package Manager. Sementara itu, pakai installer.",
    version: "Versi",
    released: "Rilis",
    sha: "SHA-256",
    copy: "Salin",
    copied: "Tersalin",
    smartscreenTitle: "Muncul “Windows protected your PC”?",
    smartscreen:
      "Installer-nya belum punya tanda tangan kode, jadi Windows SmartScreen memberi peringatan. Klik More info, lalu Run anyway. Kode sumber dan proses build-nya terbuka di GitHub.",
    allReleases: "Semua rilis dan catatan rilis",
    next: "Berikutnya: pasang dan konversi pertama",
  },
  faq: {
    title: "Pertanyaan yang sering diajukan",
    items: [
      { q: "Apakah PomeloO gratis?", a: "Ya. Gratis dan open source dengan lisensi GNU AGPL-3.0. Tanpa iklan, tanpa masa coba, tanpa akun." },
      {
        q: "Apakah file saya diunggah ke suatu tempat?",
        a: "Tidak. Semua konversi berjalan di PC kamu. PomeloO hanya memakai internet untuk dua hal yang kamu mulai sendiri: unduhan sekali untuk mesin slide, dan Send to Phone, yang hanya lewat Wi-Fi kamu sendiri.",
      },
      {
        q: "Windows bilang “Windows protected your PC”. Amankah?",
        a: "Installer-nya belum ditandatangani, jadi SmartScreen belum mengenalnya. Klik More info, lalu Run anyway. Kode dan proses build installer-nya terbuka di GitHub.",
      },
      {
        q: "File hasil konversinya ke mana?",
        a: "Di sebelah file asli, dengan ekstensi baru (photo.webp). Kalau namanya sudah dipakai, PomeloO menambahkan angka (photo 2.webp). File asli tidak pernah diubah.",
      },
      {
        q: "Mengetuk Shift saat menyeret tidak memunculkan apa-apa.",
        a: "Pastikan PomeloO berjalan (ikon oranye di tray) dan Settings → Wheel while dragging menyala. Ketukannya harus terjadi saat tombol mouse masih ditahan.",
      },
      {
        q: "Kenapa aplikasinya besar?",
        a: "PomeloO membawa mesinnya sendiri (ffmpeg, pandoc, pustaka PDF dan gambar) supaya bisa jalan offline tanpa memasang apa pun lagi. Saat pertama jalan, PomeloO memampatkan foldernya sendiri dengan kompresi bawaan Windows, jadi sekitar 240 MB di disk.",
      },
      {
        q: "Bisa dipakai di Mac atau Linux?",
        a: "Tidak, PomeloO dibuat untuk Windows 10 dan 11. Di Mac, coba Tangerine yang menjadi inspirasinya.",
      },
      {
        q: "Bahasa apa saja yang bisa dibaca Copy text (OCR)?",
        a: "Bahasa yang terpasang di Windows (Settings → Time & language → Language). Tambahkan bahasa di sana, maka PomeloO bisa membacanya.",
      },
      {
        q: "Bagaimana cara menghapusnya?",
        a: "Settings → Apps → Installed apps → PomeloO → Uninstall. Menu klik kanan dan entri mulai bersama Windows juga ikut terhapus.",
      },
    ],
  },
  privacyPage: {
    title: "Privasi",
    updated: "Catatan ini berlaku untuk aplikasi PomeloO dan situs ini.",
    sections: [
      {
        h: "Aplikasinya",
        p: [
          "PomeloO tidak punya telemetri, akun, maupun unggahan. File kamu dikonversi di PC kamu sendiri.",
          "Internet hanya dipakai dalam dua hal, keduanya kamu mulai sendiri: unduhan sekali untuk salinan pribadi LibreOffice (hanya jika kamu mengonversi slide dan tidak ada aplikasi Office terpasang; dari The Document Foundation, dicek checksum-nya), dan Send to Phone.",
          "Send to Phone hanya melayani file di Wi-Fi kamu sendiri, di balik tautan acak, dan hanya selama kode QR-nya terbuka.",
          "Riwayat clipboard di notch hanya ada di memori, tidak pernah ditulis ke disk, dan melewati apa pun yang ditandai privat oleh password manager. Notch tidak pernah terlihat di screenshot atau saat berbagi layar.",
          "Untuk mengenali gerakan seret-lalu-ketuk dan Ctrl+V, PomeloO hanya melihat apakah tombol-tombol itu sedang ditekan. Apa pun yang kamu ketik tidak direkam.",
        ],
      },
      {
        h: "Situs ini",
        p: [
          "Situs ini berupa halaman statis. Tidak ada cookie, tidak ada analitik, dan tidak ada skrip pihak ketiga. Font disajikan dari situs ini sendiri.",
          "Hosting kami (Netlify) menyimpan log server standar, seperti server web pada umumnya.",
        ],
      },
    ],
  },
  changelog: { title: "Yang baru", sub: "Setiap rilis PomeloO, dari yang terbaru.", none: "Catatan rilis ada di GitHub." },
  notFound: { title: "Halaman tidak ditemukan", body: "Halaman ini tidak ada (lagi).", home: "Ke halaman utama" },
  footer: {
    tagline: "Konverter dan kotak perkakas file untuk Windows.",
    source: "Kode sumber",
    issues: "Laporkan masalah",
    privacy: "Privasi",
    changelog: "Yang baru",
    license: "PomeloO adalah perangkat lunak bebas (AGPL-3.0). Situs ini berlisensi MIT.",
    tangerine: "Terinspirasi dari Tangerine untuk macOS; tidak berafiliasi dengannya.",
  },
  demo: {
    replay: "Putar ulang",
    wheel: ["Seret photo.heic…", "ketuk Shift", "lepas di PNG", "photo.png sudah jadi"],
    notch: ["Arahkan ke notch", "panelnya terbuka", "seret file ke atas", "lepas di Fit WhatsApp"],
    phone: ["Pilih Send to Phone", "pindai kode QR", "file terbuka di HP"],
    ocr: ["Tekan Win+Ctrl+T", "seret di atas teks", "teksnya sudah di clipboard"],
    paste: ["Salin gambar", "tekan Ctrl+V di folder", "tersimpan di sana sebagai PNG"],
    recipe: ["Pilih langkah", "simpan sebagai resep", "satu tombol ★ menjalankan semuanya"],
  },
};

export default id;

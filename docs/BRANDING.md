# Branding untuk Klien Baru

Checklist saat memakai template untuk BUMN baru.

## 1. Identitas

Ubah `src/config/site.ts`: `legalName`, `shortName`, `foundingYear`, `tagline`, `contact`, `social`, `stats`.

## 2. Warna

Semua warna ada di blok `@theme` di `src/styles/global.css`. Default template adalah grayscale netral (hitam–putih–abu). Ganti nilai hex skala `primary-*` dan `accent-*`; **nama token jangan diubah** karena dipakai oleh komponen.

- Buat skala 50–950 dari warna utama brand (mis. dengan uicolors.app atau tailwindcss.com/docs/colors sebagai acuan).
- Pastikan kontras:
  - teks `neutral-600` di atas putih ≥ 4.5:1 (sudah aman),
  - teks putih di atas `primary-900/950` ≥ 4.5:1,
  - `accent-700` di atas putih ≥ 4.5:1 (untuk teks kecil),
  - `accent-400/500` di atas `primary-950` ≥ 4.5:1.
- Setelah mengganti warna, jalankan `npm run test:ci` — tes aksesibilitas akan gagal jika ada kontras yang kurang.
- Ubah juga `theme-color` di `src/layouts/BaseLayout.astro` dan warna di `public/favicon.svg`.

## 3. Font

1. `npm i @fontsource-variable/<nama-font>` (lihat fontsource.org).
2. Di `global.css`, ganti baris `@import '@fontsource-variable/...'` dan nilai `--font-sans` (teks) / `--font-serif` (judul). Untuk tampilan sans penuh, set `--font-serif` sama dengan `--font-sans`.
3. Hapus paket font lama dari `package.json`.

Font selalu di-hosting sendiri (bukan Google Fonts CDN) demi privasi dan CSP.

## 3a. Ukuran teks, jarak, dan rasio gambar

Juga di blok `@theme` di `global.css` — ubah nilainya, jangan namanya:

- **Tipografi besar:** `--text-display` (judul hero), `--text-headline` (judul section), `--text-statement`, `--text-lead`, `--text-eyebrow`.
- **Skala teks semantik:** `--text-caption`, `--text-small`, `--text-body`, `--text-body-lg`, `--text-title-sm`, `--text-title`, `--text-title-lg`, `--text-figure(-lg)` (angka statistik). Komponen memakai kelas ini, bukan `text-sm`/`text-lg` bawaan Tailwind.
- **Jarak section:** `--spacing-section(-lg)` dan `--spacing-section-compact(-lg)` — dipakai komponen `Section` di semua section. Perkecil untuk tampilan yang lebih rapat.
- **Tinggi header:** `--spacing-header` (juga menentukan offset scroll ke anchor section).
- **Rasio gambar:** `--aspect-landscape`, `--aspect-portrait` (foto manajemen), `--aspect-card`.

## 4. Logo & ikon

- **Logo header/footer:** ganti SVG di `src/components/ui/Logo.tsx`. Gunakan `currentColor` agar logo otomatis putih di atas hero gelap dan gelap saat header berlatar putih. Jika logo resmi multiwarna, siapkan dua versi (terang & gelap).
- **Favicon:** ganti `public/favicon.svg`.
- **Apple touch icon & OG image:** jalankan `npm run images -- "Nama Singkat"`, atau ganti langsung `public/apple-touch-icon.png` (180×180) dan `src/assets/og-default.jpg` (1200×630).

## 5. Motif latar

Section gelap memakai motif kawung (`src/components/ui/NusantaraPattern.tsx`). Untuk klien dengan motif khas (mis. ornamen daerah atau geometri dari logo), ganti isi `<pattern>` di komponen tersebut; gunakan `stroke="currentColor"` agar warnanya mengikuti token.

## 6. Gambar hero (opsional)

Hero memakai latar grafis (gradien + grid). Untuk memakai foto/video, tambahkan elemen `<img>` (props dari `responsiveImage()` di `src/lib/image.ts`) atau `<video>` di dalam `div[data-parallax]` pada `src/components/sections/Hero.tsx`, pertahankan overlay gradien agar teks tetap terbaca. Video: `muted`, `playsinline`, `poster`, maksimal ±3 MB.

## 7. Konten & legal

Ganti semua konten contoh (lihat `docs/CONTENT_GUIDE.md`). Teks Kebijakan Privasi, Cookie, dan Syarat Penggunaan **wajib ditinjau legal klien**. Perbarui `public/.well-known/security.txt`.

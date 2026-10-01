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

## 6. Foto

Template berisi foto contoh Nusantara (kredit di `docs/CONTENT_GUIDE.md`). Ganti dengan foto klien — idealnya foto aset/operasi/wilayah kerja mereka sendiri.

| Foto                                | Diatur di                                                    | File contoh                             |
| ----------------------------------- | ------------------------------------------------------------ | --------------------------------------- |
| Latar hero                          | `src/config/media.ts` → `hero`                               | `src/assets/photos/hero.jpg`            |
| Foto lebar di profil                | `src/config/media.ts` → `about`                              | `src/assets/photos/archipelago.jpg`     |
| Latar Visi & Misi                   | `src/config/media.ts` → `vision`                             | `src/assets/photos/highlands.jpg`       |
| Peta titik di belakang angka kunci  | `src/config/media.ts` → `map`                                | `src/assets/graphics/nusantara-map.svg` |
| Lini bisnis                         | `image` + `imageAlt` di `src/content/business/*.yaml`        | `src/assets/photos/business-*.jpg`      |
| Section Tata Kelola & Keberlanjutan | `image`, `imageAlt`, `imageCaption` di `src/content/pages/…` | `towers.jpg`, `rice-terraces.jpg`       |

Aturan memilih & memasang foto:

- **Latar hero:** lanskap, lebar ≥ 2400 px, bernuansa gelap/tenang (fajar, senja, kabut), dengan subjek utama di **kanan** — judul berada di kiri-bawah. Efek vignette satu sisi + grain diterapkan otomatis oleh `Backdrop`; jangan menambah teks/logo di dalam foto.
- **Wajib cek kontras** setelah mengganti foto latar: teks putih di atas foto harus ≥ 4.5:1 (judul besar ≥ 3:1) di lebar 390, 1024, dan 1440 px. Tes otomatis (axe) tidak bisa mengukur kontras di atas gambar. Jika kurang, pilih foto yang lebih gelap di sisi teks, atau pertebal lapisan gelap di utilitas `vignette-left` (`src/styles/global.css`).
- **Latar Visi & Misi:** foto diredupkan merata (≥ 70%), jadi pilih foto bertekstur (hutan, laut, awan) — detail halus tidak akan terlihat.
- **Tanpa foto:** hapus entri di `media.ts`; hero dan Visi & Misi kembali ke gradien + motif kawung + grain.
- **Jangan** memakai foto yang memuat logo/merek pihak lain, atau wajah orang yang bukan insan perusahaan.
- Keterangan lokasi (`caption`) tampil di samping foto; isi dua bahasa.

Video hero (opsional): ganti `<img>` di `src/components/ui/Backdrop.tsx` dengan `<video>` — `muted`, `playsinline`, `poster`, maksimal ±3 MB, tidak diputar saat reduced-motion.

## 7. Konten & legal

Ganti semua konten contoh (lihat `docs/CONTENT_GUIDE.md`). Teks Kebijakan Privasi, Cookie, dan Syarat Penggunaan **wajib ditinjau legal klien**. Perbarui `public/.well-known/security.txt`.

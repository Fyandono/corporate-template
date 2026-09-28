# Keamanan

## Prinsip

Situs ini statis: tidak ada server aplikasi, database, form, atau login. Yang dilindungi adalah **integritas halaman** (tidak bisa disisipi script), **privasi pengunjung**, dan **akses deploy**.

## Content Security Policy (CSP)

CSP dibuat otomatis oleh Astro (`security.csp` di `astro.config.mjs`) sebagai `<meta>` di setiap halaman, lengkap dengan hash untuk setiap script/style yang dirender. Artinya **hanya script milik situs** (dan `googletagmanager.com` untuk GA) yang boleh berjalan.

Direktif yang tidak didukung `<meta>` (`frame-ancestors`) dikirim sebagai header dari `firebase.json`.

Aturan:

- Jangan pakai atribut `style="..."` di markup, `define:vars`, atau `onclick="..."` — diblokir CSP. Pakai class Tailwind dan `<script>` yang di-bundle.
- Jangan memuat font/CSS/JS dari CDN. Pasang lewat npm.
- Aset tidak di-inline sebagai `data:` (`assetsInlineLimit: 0`).
- Syntax highlighting Markdown dimatikan (Shiki memakai inline style).

### Menambah layanan pihak ketiga

1. Tambahkan domainnya ke direktif yang relevan di `astro.config.mjs` (`scriptDirective.resources`, `connect-src`, `img-src`, `frame-src`, …).
2. Jika layanan memasang cookie, tambahkan kategori di `src/scripts/consent.ts` dan perbarui `src/content/pages/*/cookies.md`.
3. Catat di bagian "Pihak ketiga" di bawah.
4. Jalankan `npm run test:ci` — tes gagal jika ada pelanggaran CSP di console.

## Header HTTP (`firebase.json`)

| Header                                                                      | Fungsi                                          |
| --------------------------------------------------------------------------- | ----------------------------------------------- |
| `Strict-Transport-Security`                                                 | Paksa HTTPS                                     |
| `Content-Security-Policy: frame-ancestors 'none'` + `X-Frame-Options: DENY` | Cegah situs ditanam di iframe (clickjacking)    |
| `X-Content-Type-Options: nosniff`                                           | Cegah browser menebak tipe file                 |
| `Referrer-Policy`                                                           | Batasi informasi URL yang dikirim ke situs lain |
| `Permissions-Policy`                                                        | Matikan akses kamera, mikrofon, lokasi, dll.    |
| `Cross-Origin-Opener-Policy`                                                | Isolasi jendela dari situs lain                 |

## Privasi & cookie

- GA4 **tidak dimuat** sebelum pengunjung menyetujui kategori analytics (diuji di `tests/e2e/consent.spec.ts`).
- Google Signals & personalisasi iklan dimatikan; Consent Mode v2 `ad_*` = denied.
- Menarik persetujuan menghapus cookie `_ga*`.
- Peta di halaman Kontak berupa gambar statis + tautan (tanpa iframe Google Maps).

## Dependency

- `npm ci` dengan lockfile; `npm audit --audit-level=high` di CI.
- Dependabot mingguan untuk npm dan GitHub Actions. Review changelog sebelum merge update major.
- Tambah dependency hanya jika perlu; hindari yang menambah JS ke browser.

## Akses

- Repo private; branch `main` diproteksi.
- Secret hanya di GitHub Actions (`FIREBASE_SERVICE_ACCOUNT`). Jangan commit `.env`.
- Service account Firebase cukup berperan **Firebase Hosting Admin**.
- Aktifkan 2FA di akun GitHub dan Google.

## Pelaporan kerentanan

`/.well-known/security.txt` (RFC 9116). Perbarui kontak dan tanggal `Expires` setiap tahun.

## Pihak ketiga

| Layanan                                                             | Tujuan               | Kapan dimuat              |
| ------------------------------------------------------------------- | -------------------- | ------------------------- |
| Google Analytics 4 (`googletagmanager.com`, `google-analytics.com`) | Statistik pengunjung | Setelah consent analytics |

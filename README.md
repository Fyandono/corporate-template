# Corporate Website Template (BUMN)

Template website company profile statis dwibahasa (ID/EN) untuk BUMN.
Dibangun dengan **Astro + TypeScript + Tailwind CSS v4**, di-hosting di **Firebase Hosting**.

Spesifikasi & keputusan arsitektur: [`SPEC.md`](SPEC.md).

## Prasyarat

- Node.js versi di `.nvmrc` (`nvm use`)
- npm
- Firebase CLI (hanya untuk deploy manual): `npm i -g firebase-tools`

## Mulai

```bash
npm install
cp .env.example .env      # opsional: isi PUBLIC_GA_MEASUREMENT_ID
npm run dev               # http://localhost:4321/id
```

## Perintah

| Perintah          | Fungsi                                                    |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Server pengembangan dengan hot reload                     |
| `npm run build`   | Build situs statis ke `dist/`                             |
| `npm run preview` | Menyajikan `dist/` secara lokal                           |
| `npm run check`   | Typecheck (TypeScript + Astro + skema konten)             |
| `npm run lint`    | ESLint + cek format Prettier                              |
| `npm run format`  | Merapikan format semua file                               |
| `npm run test`    | Tes E2E, aksesibilitas, link, dan consent (butuh `dist/`) |
| `npm run test:ci` | Build lalu tes                                            |
| `npm run images`  | Membuat ulang `apple-touch-icon.png` dan OG image         |

Pertama kali menjalankan tes: `npx playwright install chromium`.

## Struktur

```
src/
├── config/        site.ts (identitas, kontak, feature flags), navigation.ts
├── content/       konten: manajemen, bisnis, sejarah, nilai, halaman teks, berita
├── i18n/          id.json, en.json, helper bahasa
├── components/    ui/, layout/, sections/, seo/
├── layouts/       BaseLayout, MarkdownPageLayout
├── pages/[lang]/  semua halaman (dibangun untuk id & en)
├── scripts/       animasi, header, consent, analytics
└── styles/        global.css (design tokens)
tests/e2e/         Playwright + axe
docs/              panduan konten, branding, deploy, keamanan
```

## Dokumentasi

- [Panduan konten](docs/CONTENT_GUIDE.md) — mengubah teks, direksi, bisnis, berita
- [Branding klien baru](docs/BRANDING.md) — logo, warna, font
- [Deployment](docs/DEPLOYMENT.md) — Firebase, GitHub Actions, domain
- [Keamanan](docs/SECURITY.md) — header, CSP, dependency
# corporate-template

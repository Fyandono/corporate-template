# Deployment

Situs di-build menjadi file statis (`dist/`) dan di-hosting di **Firebase Hosting**. Deploy dijalankan oleh **GitHub Actions**.

```
branch fitur ──PR──▶ CI (lint, typecheck, build, tes, Lighthouse)
                 └─▶ deploy ke preview channel (URL sementara, noindex, 7 hari)
merge ke main ─────▶ deploy ke production
```

## 1. Setup awal (sekali per klien)

### Firebase

1. Buat project di <https://console.firebase.google.com>.
2. Aktifkan **Hosting**.
3. (Opsional) Aktifkan **Google Analytics** untuk project → catat **Measurement ID** (`G-XXXXXXXXXX`) di Project settings → Integrations → Google Analytics. Di GA4, matikan Google Signals dan atur retensi data (mis. 14 bulan).
4. Ubah `.firebaserc` → isi project ID.

### Paket & biaya

Paket **Spark (gratis)** membatasi transfer ±360 MB/hari. Untuk production, gunakan **Blaze** (bayar sesuai pemakaian; tetap ada kuota gratis) dan pasang **budget alert** di Google Cloud Console → Billing → Budgets & alerts (mis. Rp 150.000/bulan).

### GitHub

1. Buat repo **private**, push kode.
2. Jalankan sekali dari komputer lokal:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase init hosting:github
   ```
   Perintah ini membuat service account dan menyimpan secret di repo. Jika workflow yang dibuat berbeda nama, hapus file workflow buatan Firebase dan pakai yang ada di `.github/workflows/`. Pastikan nama secret-nya `FIREBASE_SERVICE_ACCOUNT` (ubah nama di workflow jika berbeda).
3. Di repo → Settings → Secrets and variables → Actions → **Variables**, tambahkan:
   | Nama                  | Contoh                                          |
   | --------------------- | ----------------------------------------------- |
   | `FIREBASE_PROJECT_ID` | `nama-bumn-web`                                 |
   | `SITE_URL`            | `https://www.namabumn.co.id`                    |
   | `GA_MEASUREMENT_ID`   | `G-XXXXXXXXXX` (kosongkan jika tanpa analytics) |
4. Settings → Environments → buat `production` (opsional: wajibkan approval).
5. Settings → Branches → proteksi `main`: wajib PR, wajib status check `CI` lulus.

## 2. Domain

Firebase Console → Hosting → **Add custom domain** → ikuti instruksi record DNS (A/TXT). SSL diterbitkan otomatis. Setelah domain aktif dan stabil, pertimbangkan menambahkan `preload` pada header HSTS di `firebase.json` lalu daftarkan di hstspreload.org.

## 3. Deploy manual (darurat)

```bash
SITE_URL=https://www.namabumn.co.id PUBLIC_GA_MEASUREMENT_ID=G-XXXX npm run build
firebase deploy --only hosting
```

## 4. Rollback

Firebase Console → Hosting → **Release history** → pilih versi sebelumnya → **Rollback**. Setelah itu perbaiki kode lewat PR seperti biasa.

## 5. Setelah go-live

- Cek header: <https://securityheaders.com> (target A+) dan <https://developer.mozilla.org/observatory>.
- Cek performa: <https://pagespeed.web.dev>.
- Daftarkan sitemap (`/sitemap-index.xml`) di Google Search Console.

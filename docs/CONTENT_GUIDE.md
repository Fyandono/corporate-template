# Panduan Konten

Semua konten ada di repo. Alur umum: **edit file → commit ke branch → buka Pull Request → cek URL preview → merge ke `main`** (otomatis live).

Jalankan `npm run dev` untuk melihat perubahan secara langsung. Jika ada field yang salah/kosong, `npm run build` akan gagal dengan pesan yang menunjuk file bermasalah.

## Di mana mengubah apa

| Yang ingin diubah                                                              | File                                      |
| ------------------------------------------------------------------------------ | ----------------------------------------- |
| Nama perusahaan, alamat, telepon, email, sosial media, angka kunci beranda     | `src/config/site.ts`                      |
| Menyalakan/mematikan halaman Tata Kelola, Keberlanjutan, Berita, detail Bisnis | `src/config/site.ts` → `features`         |
| Teks beranda, Tentang Kami (profil, visi, misi), label menu & tombol           | `src/i18n/id.json` dan `src/i18n/en.json` |
| Dewan Komisaris & Direksi                                                      | `src/content/management/*.yaml`           |
| Lini bisnis                                                                    | `src/content/business/*.yaml`             |
| Sejarah (timeline)                                                             | `src/content/milestones.yaml`             |
| Nilai perusahaan                                                               | `src/content/values.yaml`                 |
| Kebijakan Privasi, Cookie, Syarat, Tata Kelola, Keberlanjutan                  | `src/content/pages/{id,en}/*.md`          |
| Berita                                                                         | `src/content/news/{id,en}/*.md`           |
| Foto hero beranda, foto profil, latar Visi & Misi, peta titik                  | `src/config/media.ts`                     |

## Teks dwibahasa

`id.json` adalah acuan. Setiap key yang ada di `id.json` **wajib** ada di `en.json`; jika tidak, `npm run check` gagal.

Data konten memakai bentuk:

```yaml
position:
  id: Direktur Utama
  en: President Director
```

## Menambah anggota Direksi/Komisaris

1. Simpan foto di `src/assets/management/` (JPG/PNG, rasio 3:4, minimal 640×853 px).
2. Buat file `src/content/management/14-nama-direktur.yaml`:

```yaml
name: Nama Lengkap
group: director # atau: commissioner
order: 5 # urutan tampil
position:
  id: Direktur Pemasaran
  en: Director of Marketing
bio:
  id: Menjabat sejak 2025. ...
  en: Serving since 2025. ...
photo: ../../assets/management/nama-lengkap.jpg
```

Foto otomatis dikompres dan dibuat dalam beberapa ukuran (AVIF/WebP) saat build.

### Sambutan pimpinan

Tambahkan `message` (satu–dua kalimat, dua bahasa) pada file orang yang sambutannya ingin ditampilkan, biasanya Direktur Utama. Kutipan tampil besar di awal halaman Manajemen, ditutup nama dan jabatan orang tersebut. Jika beberapa orang mengisinya, yang dipakai adalah yang `order`-nya terkecil; jika tidak ada, blok sambutan tidak tampil. Labelnya ("Sambutan Direktur Utama") ada di `management.messageEyebrow` pada `id.json`/`en.json`.

```yaml
message:
  id: Amanah kami bukan sekadar mengelola aset negara, …
  en: Our mandate is not merely to manage state assets, …
```

## Menambah lini bisnis

Salin salah satu file di `src/content/business/`, ubah isinya. Nama file menjadi URL detail (mis. `energi.yaml` → `/id/business/energi` bila `businessDetailPages` aktif). `imageAlt` wajib diisi: jelaskan isi gambar untuk pengguna pembaca layar.

Dengan 3–4 lini, lini ber-`order` terkecil tampil sebagai **lini utama** (foto besar + `summary` + `description`) dan sisanya sebagai baris ringkas di sampingnya, baik di beranda maupun di halaman Bisnis; dengan jumlah lain, semua lini tampil sebagai grid kartu sama besar.

## Berita

1. Aktifkan `features.news: true` di `site.ts`.
2. Buat dua file dengan `translationKey` yang sama:
   - `src/content/news/id/judul-berita.md`
   - `src/content/news/en/news-title.md`

```markdown
---
title: Judul Berita
description: Ringkasan 1–2 kalimat.
date: 2026-10-01
cover: ../../../assets/news/judul-berita.jpg
coverAlt: Deskripsi gambar
translationKey: judul-berita-2026-10
draft: false
---

Isi berita dalam Markdown.
```

Jika versi bahasa lain belum ada, tombol bahasa mengarah ke daftar berita bahasa tersebut. `draft: true` menyembunyikan berita.

## Foto di halaman teks (Tata Kelola, Keberlanjutan)

Tambahkan di frontmatter `src/content/pages/{id,en}/<slug>.md` (opsional; bila `image` diisi, `imageAlt` wajib):

```markdown
image: ../../../assets/photos/rice-terraces.jpg
imageAlt: Sawah terasering dan pohon kelapa di Bali dilihat dari udara
imageCaption: Ubud, Bali
```

Foto tampil di kolom kiri dengan rasio 4:5 (desktop) / 3:2 (mobile) dan teks di kanan. Hapus ketiga baris untuk halaman tanpa foto (teks kembali ke satu kolom di tengah).

## Gambar

- Simpan di `src/assets/…` (bukan `public/`) agar dioptimasi otomatis. Foto di `src/assets/photos/`.
- Gunakan foto berukuran wajar (lebar ≤ 2400 px; foto latar hero tepat 2400 px). Hindari file > 2 MB.
- Setiap gambar informatif wajib punya teks alternatif. Foto latar (hero, Visi & Misi) bersifat dekoratif dan tidak memerlukannya.
- Panduan memilih foto latar dan mengecek kontras: `docs/BRANDING.md` §6.

### Kredit foto contoh

Foto bawaan template berasal dari [Unsplash](https://unsplash.com/license) (lisensi Unsplash: bebas dipakai komersial, atribusi tidak wajib). Ini **foto contoh** — ganti dengan foto milik klien sebelum rilis.

| File (`src/assets/photos/`)   | Isi                                    | Fotografer             | Sumber                          |
| ----------------------------- | -------------------------------------- | ---------------------- | ------------------------------- |
| `hero.jpg`                    | Gunung Bromo, Jawa Timur               | Mario La Pergola       | unsplash.com/photos/cn51tm7V0mU |
| `archipelago.jpg`             | Misool, Raja Ampat                     | Danang Himawan         | unsplash.com/photos/VyPoDS9dzHs |
| `highlands.jpg`               | Perbukitan berkabut, Yogyakarta        | Iqbal Aditama          | unsplash.com/photos/8-97yne0EFg |
| `rice-terraces.jpg`           | Sawah terasering, Ubud, Bali           | Geio Tischler          | unsplash.com/photos/SsqqO1COB18 |
| `towers.jpg`                  | Gedung perkantoran, Jakarta (dipotong) | Bagus Alif Widhiwipati | unsplash.com/photos/Vp0UbeIFhHY |
| `business-energy.jpg`         | Menara transmisi saat senja            | DM David               | unsplash.com/photos/qAqJuXya6S4 |
| `business-infrastructure.jpg` | Simpang susun Semanggi, Jakarta        | Rifki Kurniawan        | unsplash.com/photos/3Fjnd2SO5wI |
| `business-finance.jpg`        | Jakarta pada malam hari                | dapiki moto            | unsplash.com/photos/V7iMLpenocw |
| `business-digital.jpg`        | Rak server (bukan di Indonesia)        | Taylor Vick            | unsplash.com/photos/M5tzZtFCOfs |

`src/assets/graphics/nusantara-map.svg` dibangkitkan dari geometri Natural Earth 1:50m (public domain); bersifat dekoratif dan tidak menggambarkan batas wilayah secara presisi.

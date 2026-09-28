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

## Menambah lini bisnis

Salin salah satu file di `src/content/business/`, ubah isinya. Nama file menjadi URL detail (mis. `energi.yaml` → `/id/business/energi` bila `businessDetailPages` aktif). `imageAlt` wajib diisi: jelaskan isi gambar untuk pengguna pembaca layar.

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

## Gambar

- Simpan di `src/assets/…` (bukan `public/`) agar dioptimasi otomatis.
- Gunakan foto berukuran wajar (lebar ≤ 2400 px). Hindari file > 2 MB.
- Setiap gambar informatif wajib punya teks alternatif.

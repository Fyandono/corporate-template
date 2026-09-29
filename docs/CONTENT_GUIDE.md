# Panduan Konten

Semua konten ada di repo. Alur umum: **edit file → commit ke branch → buka Pull Request → cek URL preview → merge ke `main`** (otomatis live).

Jalankan `npm run dev` untuk melihat perubahan secara langsung. Jika ada field yang salah/kosong, `npm run build` akan gagal dengan pesan yang menunjuk file bermasalah.

## Di mana mengubah apa

| Yang ingin diubah                                                           | File                                      |
| --------------------------------------------------------------------------- | ----------------------------------------- |
| Nama perusahaan, alamat, telepon, email, sosial media, angka kunci beranda  | `src/config/site.ts`                      |
| Menyalakan/mematikan section Tata Kelola, Keberlanjutan, Berita             | `src/config/site.ts` → `features`         |
| Teks section beranda (hero, profil, visi, misi, judul section), label menu  | `src/i18n/id.json` dan `src/i18n/en.json` |
| Dewan Komisaris & Direksi                                                   | `src/content/management/*.yaml`           |
| Lini bisnis                                                                 | `src/content/business/*.yaml`             |
| Sejarah (timeline)                                                          | `src/content/milestones.yaml`             |
| Nilai perusahaan                                                            | `src/content/values.yaml`                 |
| Kebijakan Privasi, Cookie, Syarat; teks section Tata Kelola & Keberlanjutan | `src/content/pages/{id,en}/*.md`          |
| Berita (3 terbaru tampil di section Berita)                                 | `src/content/news/{id,en}/*.md`           |

## Struktur one-page

Semua konten tampil di satu halaman (`/id`, `/en`) yang terbagi menjadi section; menu di header adalah anchor ke section tersebut (`/id#about`). Daftar & urutan menu ada di `src/config/navigation.ts`; `id` tiap item harus sama dengan `id` section di `src/pages/[lang]/index.astro`. Halaman terpisah hanya untuk Kebijakan Privasi, Cookie, dan Syarat Penggunaan.

Section Tata Kelola dan Keberlanjutan diambil dari `src/content/pages/{id,en}/governance.md` dan `sustainability.md`. Karena judul section sudah berupa `<h2>`, subjudul di dalam file tersebut memakai `###`.

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

Salin salah satu file di `src/content/business/`, ubah isinya; kartu otomatis muncul di section Bisnis (urut berdasarkan `order`). `imageAlt` wajib diisi: jelaskan isi gambar untuk pengguna pembaca layar.

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

Isi berita dalam Markdown (disimpan untuk arsip; situs one-page hanya menampilkan judul, tanggal, ringkasan, dan gambar).
```

Tiga berita terbaru per bahasa tampil sebagai kartu di section Berita. `draft: true` menyembunyikan berita.

## Gambar

- Simpan di `src/assets/…` (bukan `public/`) agar dioptimasi otomatis.
- Gunakan foto berukuran wajar (lebar ≤ 2400 px). Hindari file > 2 MB.
- Setiap gambar informatif wajib punya teks alternatif.

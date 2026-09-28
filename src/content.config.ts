import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Teks dwibahasa: kedua bahasa wajib diisi. */
const localized = z.object({ id: z.string().min(1), en: z.string().min(1) });

const management = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/management' }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      group: z.enum(['commissioner', 'director']),
      position: localized,
      bio: localized,
      photo: image(),
      order: z.number().int(),
    }),
});

const business = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/business' }),
  schema: ({ image }) =>
    z.object({
      title: localized,
      summary: localized,
      description: localized,
      image: image(),
      imageAlt: localized,
      order: z.number().int(),
    }),
});

const milestones = defineCollection({
  loader: file('src/content/milestones.yaml'),
  schema: z.object({ year: z.number().int(), title: localized, description: localized }),
});

const values = defineCollection({
  loader: file('src/content/values.yaml'),
  schema: z.object({ title: localized, description: localized, order: z.number().int() }),
});

/** Halaman teks (legal, tata kelola, keberlanjutan). Path: pages/<lang>/<slug>.md */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    updatedAt: z.coerce.date(),
  }),
});

/** Berita. Path: news/<lang>/<slug>.md; `translationKey` menghubungkan versi ID dan EN. */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      date: z.coerce.date(),
      cover: image(),
      coverAlt: z.string().min(1),
      translationKey: z.string().min(1),
      draft: z.boolean().default(false),
    }),
});

export const collections = { management, business, milestones, values, pages, news };

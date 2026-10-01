import { describe, expect, test } from 'vitest';
import {
  mapMilestones,
  mapStats,
  mapValues,
  photoText,
  splitLead,
} from '../../src/lib/sections/about';
import { addressLines, contactDetails, telHref } from '../../src/lib/sections/contact';
import { heroMeta } from '../../src/lib/sections/hero';
import { businessHref, businessLayout, cardImageSpec } from '../../src/lib/sections/business';
import { groupPeople, messageEntry } from '../../src/lib/sections/management';
import { latestNews, newsHref } from '../../src/lib/sections/news';
import { byOrder } from '../../src/lib/sections/shared';

const ls = (id: string, en = `${id} (en)`) => ({ id, en });

describe('hero', () => {
  test('heroMeta menyusun tahun berdiri dan lokasi', () => {
    expect(heroMeta('Didirikan', 1975, 'Jakarta, Indonesia')).toEqual([
      'Didirikan 1975',
      'Jakarta, Indonesia',
    ]);
  });
});

describe('about', () => {
  test('photoText melokalkan keterangan & alt', () => {
    const photo = { caption: ls('Bromo', 'Mount Bromo'), alt: ls('Gunung', 'A mountain') };
    expect(photoText(photo, 'en')).toEqual({ caption: 'Mount Bromo', alt: 'A mountain' });
  });

  test('photoText: alt jatuh ke keterangan, lalu ke string kosong (dekoratif)', () => {
    expect(photoText({ caption: ls('Bromo') }, 'id')).toEqual({ caption: 'Bromo', alt: 'Bromo' });
    expect(photoText({}, 'id')).toEqual({ caption: undefined, alt: '' });
  });

  test('splitLead: paragraf pertama jadi lead, sisanya isi', () => {
    expect(splitLead(['a', 'b', 'c'])).toEqual({ lead: 'a', body: ['b', 'c'] });
    expect(splitLead([])).toEqual({ lead: '', body: [] });
  });

  test('mapStats melokalkan label & suffix', () => {
    expect(mapStats([{ value: 25, suffix: ls('rb+', 'k+'), label: ls('Insan') }], 'en')).toEqual([
      { value: 25, suffix: 'k+', label: 'Insan (en)' },
    ]);
  });

  test('mapValues urut berdasarkan order', () => {
    const values = [
      { data: { order: 2, title: ls('B'), description: ls('b') } },
      { data: { order: 1, title: ls('A'), description: ls('a') } },
    ];
    expect(mapValues(values, 'id').map((v) => v.title)).toEqual(['A', 'B']);
  });

  test('mapMilestones urut berdasarkan tahun tanpa mengubah input', () => {
    const input = [
      { id: 'b', data: { year: 2012, title: ls('B'), description: ls('b') } },
      { id: 'a', data: { year: 1975, title: ls('A'), description: ls('a') } },
    ];
    expect(mapMilestones(input, 'id').map((m) => m.year)).toEqual([1975, 2012]);
    expect(input[0]!.data.year).toBe(2012);
  });
});

describe('management', () => {
  test('groupPeople mengelompokkan sesuai urutan grup dan mengurutkan order', () => {
    const people = [
      { data: { group: 'director', order: 11, name: 'D2' } },
      { data: { group: 'commissioner', order: 1, name: 'K1' } },
      { data: { group: 'director', order: 10, name: 'D1' } },
    ] as const;
    const groups = groupPeople([...people] as never[], [
      { key: 'commissioner', title: 'Komisaris' },
      { key: 'director', title: 'Direksi' },
    ]) as unknown as { title: string; entries: (typeof people)[number][] }[];
    expect(groups.map((g) => [g.title, g.entries.map((e) => e.data.name)])).toEqual([
      ['Komisaris', ['K1']],
      ['Direksi', ['D1', 'D2']],
    ]);
  });

  test('messageEntry: pengisi `message` dengan order terkecil; tanpa sambutan → undefined', () => {
    const msg = { id: 'x', en: 'x' };
    const entries = [
      { data: { order: 3, name: 'C', message: msg } },
      { data: { order: 1, name: 'A' } },
      { data: { order: 2, name: 'B', message: msg } },
    ] as never[];
    expect((messageEntry(entries) as { data: { name: string } } | undefined)?.data.name).toBe('B');
    expect(messageEntry([{ data: { order: 1 } }] as never[])).toBeUndefined();
  });
});

describe('business', () => {
  test('businessLayout: 3–4 lini → featured, selain itu grid', () => {
    expect([1, 2, 3, 4, 5, 8].map(businessLayout)).toEqual([
      'grid',
      'grid',
      'featured',
      'featured',
      'grid',
      'grid',
    ]);
  });

  test('businessHref: link detail hanya bila modul halaman detail aktif', () => {
    expect(businessHref('en', 'energi', true)).toBe('/en/business/energi');
    expect(businessHref('en', 'energi', false)).toBeUndefined();
  });

  test('cardImageSpec: lini utama mendapat gambar lebih lebar daripada baris ringkas', () => {
    const lead = cardImageSpec('featured', 0);
    const row = cardImageSpec('featured', 1);
    expect(Math.max(...lead.widths)).toBeGreaterThan(Math.max(...row.widths));
    expect(cardImageSpec('grid', 0)).toEqual(cardImageSpec('grid', 3));
  });
});

describe('news', () => {
  const entry = (id: string, date: string, draft = false) =>
    ({ id, data: { date: new Date(date), draft } }) as never;

  test('latestNews: satu bahasa, tanpa draft, terbaru dulu, dibatasi', () => {
    const entries = [
      entry('id/lama', '2026-01-01'),
      entry('en/english', '2026-06-01'),
      entry('id/baru', '2026-05-01'),
      entry('id/draf', '2026-07-01', true),
      entry('id/tengah', '2026-03-01'),
    ];
    const result = latestNews(entries, 'id', 2) as unknown as { id: string }[];
    expect(result.map((e) => e.id)).toEqual(['id/baru', 'id/tengah']);
  });
});

test('newsHref membuang prefix bahasa dari id entri', () => {
  expect(newsHref({ id: 'id/laporan-kinerja' }, 'id')).toBe('/id/news/laporan-kinerja');
});

describe('contact', () => {
  const contact = {
    phone: '+62 21 000 0000',
    email: 'info@example.co.id',
    hours: ls('Senin – Jumat', 'Monday – Friday'),
    address: { street: 'Jl. Sudirman 1', city: 'Jakarta', region: 'DKI', postalCode: '10220' },
  };

  test('telHref hanya menyisakan angka dan +', () => {
    expect(telHref('+62 (21) 000-0000')).toBe('tel:+62210000000');
  });

  test('contactDetails', () => {
    expect(
      contactDetails(contact, { phone: 'Phone', email: 'Email', hours: 'Hours' }, 'en'),
    ).toEqual([
      { label: 'Phone', value: '+62 21 000 0000', href: 'tel:+62210000000' },
      { label: 'Email', value: 'info@example.co.id', href: 'mailto:info@example.co.id' },
      { label: 'Hours', value: 'Monday – Friday' },
    ]);
  });

  test('addressLines', () => {
    expect(addressLines(contact)).toEqual(['Jl. Sudirman 1', 'Jakarta, DKI 10220']);
  });
});

test('byOrder', () => {
  expect([{ data: { order: 3 } }, { data: { order: 1 } }].sort(byOrder)).toEqual([
    { data: { order: 1 } },
    { data: { order: 3 } },
  ]);
});

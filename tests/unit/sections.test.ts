import { describe, expect, test } from 'vitest';
import { mapMilestones, mapStats, mapValues } from '../../src/lib/sections/about';
import { addressLines, contactDetails, telHref } from '../../src/lib/sections/contact';
import { groupPeople } from '../../src/lib/sections/management';
import { latestNews } from '../../src/lib/sections/news';
import { byOrder } from '../../src/lib/sections/shared';

const ls = (id: string, en = `${id} (en)`) => ({ id, en });

describe('about', () => {
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

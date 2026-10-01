/**
 * Props section tanpa `id`/`index`: keduanya ditentukan halaman dari urutan menu
 * (src/config/navigation.ts), bukan oleh loader data.
 */
export type SectionData<P> = Omit<P, 'id' | 'index' | 'titleId'>;

/** Urutkan entri koleksi berdasarkan field `order` (naik). */
export const byOrder = <T extends { data: { order: number } }>(a: T, b: T) =>
  a.data.order - b.data.order;

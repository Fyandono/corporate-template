import type { ResponsiveImage } from '../types';
import { cx } from '../cx';

export type BackdropVignette = 'left' | 'right' | 'center';

const vignettes: Record<BackdropVignette, string> = {
  left: 'vignette-left',
  right: 'vignette-right',
  center: 'vignette-center',
};

export type BackdropProps = {
  /** Foto latar (dekoratif; `alt` diabaikan karena teks section sudah menjelaskan isinya). */
  image: ResponsiveImage;
  /** Sisi yang digelapkan — taruh di sisi teks. `center` menggelapkan tepi secara merata. */
  vignette?: BackdropVignette;
  /** `true` untuk foto di layar pertama (hero): dimuat segera, mengendap perlahan. */
  priority?: boolean;
  className?: string;
};

/**
 * Foto latar full-bleed untuk section gelap: foto + vignette + grain. `left`/`right` membuka
 * foto di sisi seberang teks (pilih foto yang tenang di sisi teks dan cek kontrasnya); `center`
 * meredupkan foto merata untuk section dengan teks di kedua sisi. Letakkan sebagai anak pertama
 * section yang `relative isolate overflow-hidden bg-primary-950`.
 */
export default function Backdrop({
  image,
  vignette = 'left',
  priority = false,
  className,
}: BackdropProps) {
  return (
    <div
      className={cx('pointer-events-none absolute inset-0 -z-20 overflow-hidden', className)}
      aria-hidden="true"
    >
      <div data-parallax className="absolute inset-0">
        <img
          {...image}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className={cx('size-full object-cover', priority && 'photo-settle')}
        />
      </div>
      <div className={cx('absolute inset-0', vignettes[vignette])} />
      {/* Di layar sempit judul menimpa sisi foto yang terbuka, jadi foto diredupkan sedikit lagi. */}
      {vignette !== 'center' && <div className="absolute inset-0 bg-primary-950/25 xl:hidden" />}
      <div className="absolute inset-0 grain" />
    </div>
  );
}

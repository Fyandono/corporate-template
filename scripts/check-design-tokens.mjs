// Menegakkan aturan design token (SPEC §5.2) yang tidak bisa dicek ESLint:
// komponen & halaman hanya boleh memakai utilitas dari token di src/styles/global.css.
// Dijalankan oleh `npm run lint`. Keluar dengan kode 1 bila ada pelanggaran.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const targets = ['src/components', 'src/pages', 'src/layouts', '.design-sync/previews'];
const extensions = ['.astro', '.tsx', '.ts'];

const rules = [
  {
    name: 'nilai arbitrary Tailwind',
    hint: 'tambahkan token di @theme (global.css) lalu pakai utilitasnya',
    pattern: /(?<![\w$.-])(?:[a-z0-9-]+:)*[a-z][a-z0-9-]*-\[[^\]\s]+\]/g,
  },
  {
    name: 'ukuran teks bawaan Tailwind',
    hint: 'pakai skala semantik: text-caption/small/body/body-lg/title-sm/title/title-lg/figure',
    pattern: /(?<![\w-])text-(?:xs|sm|base|lg|xl|[2-9]xl)\b/g,
  },
  {
    name: 'warna hex langsung',
    hint: 'pakai token warna (bg-primary-900, text-accent-500, …)',
    pattern: /#[0-9a-fA-F]{3,8}\b/g,
    // Preview memakai gambar SVG data-URI; theme-color <meta> wajib hex.
    skip: (file, line) => file.startsWith('.design-sync/') || /name="theme-color"/.test(line),
  },
  {
    name: 'atribut style inline',
    hint: 'melanggar CSP; pakai class utilitas',
    pattern: /\sstyle=[{"']/g,
  },
];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return extensions.some((ext) => entry.name.endsWith(ext)) ? [path] : [];
  });
}

const violations = [];
for (const target of targets) {
  for (const path of walk(join(root, target))) {
    const file = relative(root, path);
    readFileSync(path, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        for (const rule of rules) {
          if (rule.skip?.(file, line)) continue;
          for (const match of line.matchAll(rule.pattern)) {
            violations.push(`${file}:${i + 1}  ${rule.name}: "${match[0]}" — ${rule.hint}`);
          }
        }
      });
  }
}

if (violations.length > 0) {
  console.error(`Pelanggaran design token (${violations.length}):\n${violations.join('\n')}`);
  process.exit(1);
}
console.log('Design token: OK');

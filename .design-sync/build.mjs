// Membangun paket .design-sync/pkg (JS + .d.ts + CSS Tailwind) dari src/components
// sebagai input konverter design-sync. Jalankan dari root repo: node .design-sync/build.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { compile } from '@tailwindcss/node';
import { Scanner } from '@tailwindcss/oxide';

const root = process.cwd();
const pkg = resolve(root, '.design-sync/pkg');
const dist = resolve(pkg, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// 1. JS: satu modul ESM, react eksternal.
await build({
  entryPoints: [resolve(root, 'src/components/index.ts')],
  outfile: resolve(dist, 'index.js'),
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  target: 'es2020',
  external: ['react', 'react/jsx-runtime', 'react-dom'],
  logLevel: 'warning',
});

// 2. Tipe: .d.ts per komponen.
execFileSync(resolve(root, 'node_modules/.bin/tsc'), ['-p', resolve(pkg, 'tsconfig.json')], {
  stdio: 'inherit',
});

// 3. CSS: token + utilitas Tailwind yang dipakai komponen & halaman situs, plus kosakata
//    layout umum agar design agent bisa menyusun halaman. Font dikirim lewat cfg.extraFonts.
const globalCss = readFileSync(resolve(root, 'src/styles/global.css'), 'utf8').replace(
  /^@import '@fontsource[^;]*;\n/gm,
  '',
);
const layoutVocab = [
  'grid',
  'flex',
  'flex-col',
  'flex-row',
  'flex-wrap',
  'items-{start,center,end,baseline}',
  'justify-{start,center,end,between}',
  'gap-{1,2,3,4,5,6,8,10,12,16,20,24}',
  'gap-x-{4,6,8}',
  'gap-y-{6,8,10,12}',
  'grid-cols-{1,2,3,4,6,12}',
  'sm:grid-cols-{2,3}',
  'md:grid-cols-{2,3,4,12}',
  'lg:grid-cols-{2,3,4,12}',
  'col-span-{1,2,3,4,5,6,7,8,12}',
  'md:col-span-{3,4,5,6,7,8}',
  'lg:col-span-{3,4,5,6,7,8}',
  'p{,x,y,t,b}-{0,2,4,6,8,10,12,16,20,24,28,32}',
  'md:py-{16,20,24,28,32}',
  'p{y,t,b}-{section,section-compact}',
  'md:p{y,t,b}-{section-lg,section-compact-lg}',
  'm{,x,y,t,b}-{0,2,4,6,8,10,12,16}',
  'mx-auto',
  'space-y-{2,3,4,5,6,8}',
  'max-w-{sm,md,lg,xl,2xl,3xl,4xl,5xl,7xl}',
  'w-full',
  'text-{caption,small,body,body-lg,title-sm,title,title-lg,figure,figure-lg}',
  'text-{display,headline,statement,lead,eyebrow}',
  'font-{light,normal,sans,serif}',
  'pattern-fade-{right,left,center}',
  'tabular-nums',
  'column-lines',
  'border-white/15',
  'text-primary-200',
  'aspect-{landscape,portrait,card}',
  'text-{left,center}',
  'font-{medium,semibold,bold}',
  'leading-{tight,snug,relaxed}',
  'tracking-{tight,wide,widest}',
  'uppercase',
  'bg-{white,neutral-50,neutral-100,primary-50,primary-900,primary-950}',
  'text-{white,neutral-500,neutral-600,neutral-700,primary-100,primary-900,accent-400,accent-700}',
  'border{,-t,-b,-y,-l-2,-t-2}',
  'border-{neutral-200,accent-500,white/10}',
  'rounded-card',
  'overflow-hidden',
  'aspect-{video,square}',
  'object-cover',
  'size-full',
  'sr-only',
].join(' ');
const input = `${globalCss}\n@source inline("${layoutVocab}");\n`;
const base = resolve(root, 'src/styles');
const compiler = await compile(input, { base, onDependency: () => {} });
const sources = [
  ...(compiler.root && compiler.root !== 'none'
    ? [
        {
          base: compiler.root.base ?? root,
          pattern: compiler.root.pattern ?? '**/*',
          negated: false,
        },
      ]
    : [{ base: root, pattern: 'src/**/*', negated: false }]),
  { base: resolve(root, '.design-sync/previews'), pattern: '**/*.tsx', negated: false },
  ...compiler.sources,
];
const candidates = new Scanner({ sources }).scan();
writeFileSync(resolve(dist, 'styles.css'), compiler.build(candidates));
console.log(`OK: ${dist} (${candidates.length} kandidat class)`);

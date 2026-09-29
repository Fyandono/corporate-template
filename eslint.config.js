import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      'playwright-report/',
      'test-results/',
      '.lighthouseci/',
      '.ds-sync/',
      'ds-bundle/',
      '.design-sync/pkg/dist/',
      '.design-sync/.cache/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    // Komponen presentasional hanya menerima props polos (SPEC §3, CLAUDE.md): tanpa Astro,
    // i18n, config, atau akses konten. Data disiapkan oleh halaman lewat src/lib/.
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['astro', 'astro:*', 'astro/*', '@astrojs/*'],
              message: 'Komponen React presentasional tidak boleh bergantung pada Astro.',
            },
            {
              group: ['**/i18n', '**/i18n/*', '**/config/*', '**/lib/*', '**/content/*'],
              message:
                'Komponen hanya menerima props polos; siapkan data di halaman Astro / src/lib.',
            },
          ],
        },
      ],
    },
  },
];

# design-sync notes: corporate-template

## How this repo is shaped

- This is an Astro site, not a DS package. The React presentational components live in `src/components/{ui,sections,layout}/*.tsx` with a barrel at `src/components/index.ts`.
- `.design-sync/pkg/` is a wrapper package (`corporate-template-ui`). `node .design-sync/build.mjs` (= `cfg.buildCmd`) builds `pkg/dist/`: an esbuild ESM bundle, a tsc `.d.ts` tree (rootDir `src/components`), and a compiled Tailwind v4 `styles.css`.
- Converter invocation: `--node-modules ./node_modules --entry ./.design-sync/pkg/dist/index.js --out ./ds-bundle`.
- The Tailwind CSS is compiled from `src/styles/global.css` minus its fontsource `@import`. It scans `src/**` and `.design-sync/previews/**` and adds an `@source inline(...)` layout vocabulary (see `build.mjs`) so the design agent has common grid/spacing classes. The font ships via `cfg.extraFonts` (the fontsource index.css).
- Components must stay free of `astro:*`, i18n and `site.ts` imports (plain props only), or the wrapper build breaks. Image props use the `ResponsiveImage` type in `src/components/types.ts`.
- Astro-only pieces (Header, LanguageSwitcher, ConsentManager, SkipLink, SEO, Container.astro) are intentionally not synced.

## Previews

- All 12 components have authored previews in `.design-sync/previews/`. Card images are inline data-URI SVGs (grayscale gradients), because repo assets aren't shipped.
- Full-width sections and grids use `cardMode: column` (`cfg.overrides`). Hero also needs `viewport: 1280x1100` (min-h-svh plus content taller than the default cell, which otherwise crops the CTAs).
- `ColumnLines` is decorative (aria-hidden) and is previewed inside a dark section.
- `ui/` components land in group `general` (the converter treats `ui` as a generic folder name).

## Known render warns

- (none)

## Re-sync risks

- The `@source inline` vocabulary in `build.mjs` is hand-maintained. If `conventions.md` starts naming new utility classes, add them there and re-verify.
- `conventions.md` names token classes. After a theme/token change in `global.css`, re-run the class-existence check against `ds-bundle/_ds_bundle.css`.
- Toolchain assumption: esbuild, tsc, `@tailwindcss/node` and `@tailwindcss/oxide` come from the repo's own `node_modules` (transitive deps of astro/@tailwindcss/vite). A major bump of those may change the compile API used in `build.mjs`.

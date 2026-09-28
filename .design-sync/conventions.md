# Corporate UI — conventions for building with this library

Company-profile website for an Indonesian state-owned enterprise (BUMN). The look is **corporate grayscale, architectural-editorial**: black, white and grey only, no hues. It is formal, very spacious and typographic. Signature details: very large _light-weight_ display headings, tiny wide-tracked uppercase labels, numbered sections (`01`, `02`…), hairline rules instead of boxes, faint vertical column lines with a slow light sweep (`ColumnLines`), and a fading **kawung** batik motif (`NusantaraPattern`) in the background. Fonts (already loaded by `styles.css`): **Newsreader** serif (`font-serif`) for h1/h2, big statements and stat numbers; **Plus Jakarta Sans** (`font-sans`) for everything else. h1 and h2 are serif by default. Use `font-sans` on an h2 only when it is a small label.

## Setup

No provider or wrapper needed. Components are plain presentational React (props in, markup out; no state, no context). Only `styles.css` has to be loaded.

- Every visible string is passed in as a prop. Components never hardcode copy. Write Indonesian copy by default.
- `Button` is always a link (`<a>`), so `href` is required. The site is static, with no forms and no submit buttons.
- There must be exactly one `<h1>` per page. It comes from `Hero` (homepage) or `PageHero` (inner pages). Everything else uses `SectionHeading` (h2) or plain h3.
- The site header/navigation is not part of this library. Leave room for a fixed 64px header over the top of `Hero`/`PageHero`.

## Styling idiom: Tailwind utility classes on design tokens

Style your own layout glue with the Tailwind classes compiled into `styles.css` (tokens + utilities). **Only classes that exist in `styles.css` work.** No arbitrary values (`bg-[#...]`, `p-[13px]`) and no inline hex colours.

| Family                                                                | Classes                                                                                                                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand grey scale                                                      | `bg-primary-{50,900,950}`, `text-primary-{100,200,500,900}`, `border-primary-900`                                                                             |
| Accent (light/mid grey, use sparingly: thin lines, numbers, eyebrows) | `bg-accent-500`, `text-accent-{400,600,700}`, `border-accent-500`                                                                                             |
| Neutral text & surfaces                                               | `text-neutral-{500,600,700}`, `bg-neutral-{50,100}`, `border-neutral-200`                                                                                     |
| Display type                                                          | `text-display` (hero h1), `text-headline` (section h2), `text-statement` (big quote)                                                                          |
| Radius                                                                | `rounded-card`                                                                                                                                                |
| Layout                                                                | `grid`, `grid-cols-*`, `sm:/md:/lg:grid-cols-*`, `col-span-*`, `flex`, `gap-*`, `max-w-*`, `mx-auto`, `py-28 md:py-40` (standard section rhythm; be generous) |

Backgrounds alternate `bg-white` → `bg-neutral-50` → one dark `bg-primary-950 text-white` section. Use at most 1–2 dark sections per page, each with `<NusantaraPattern fade="right" />` then `<ColumnLines />` as its first children (section must be `relative isolate overflow-hidden`). Number the homepage sections with `SectionHeading index="01"`… On dark sections, pass `tone="dark"` to `SectionHeading` and use `Button` variants `accent` / `ghost-light`. On light sections use `primary` / `secondary`.

## Where the truth lives

- `styles.css` and its imports: tokens (`--color-primary-*`, `--color-accent-*`, `--text-display`…) and every utility class available.
- `components/<group>/<Name>/<Name>.d.ts` (props) and `<Name>.prompt.md` (usage) for each component.

## Components

`Hero`, `PageHero`, `SectionHeading`, `ColumnLines`, `NusantaraPattern` (`tone="light"` for light sections, used sparingly), `StatsBand`, `BusinessCard`, `NewsCard`, `CinematicStatement`, `CtaBand`, `Footer`, `Button`, `Logo`, `Container`. `Container` gives the page width (`max-w-7xl` + gutters). Wrap every section's content in it.

## Example: a homepage section

```jsx
<section className="bg-neutral-50">
  <Container className="py-28 md:py-40">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <SectionHeading
        index="02"
        eyebrow="Lini Bisnis"
        title="Portofolio yang menopang perekonomian"
      />
      <Button href="/id/business" variant="secondary" className="shrink-0">
        Selengkapnya
      </Button>
    </div>
    <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      <BusinessCard
        index={0}
        href="#"
        title="Energi"
        summary="Penyediaan energi yang andal."
        image={{ src: '/energi.jpg', alt: 'Pembangkit listrik', width: 1200, height: 800 }}
      />
    </div>
  </Container>
</section>
```

# Corporate UI — conventions for building with this library

Company-profile website for an Indonesian state-owned enterprise (BUMN). The look is **corporate grayscale, architectural-editorial**: black, white and grey only, no hues. It is formal, very spacious and typographic. Signature details: very large _light-weight_ display headings, tiny wide-tracked uppercase labels, numbered sections (`01`, `02`…), hairline rules instead of boxes, faint vertical column lines with a slow light sweep (`ColumnLines`), a fading **kawung** batik motif (`NusantaraPattern`) in the background, and **photography of Indonesia** (landscapes, infrastructure) as the only colour on the page: full-bleed behind dark sections with a one-sided vignette and fine film grain (`Backdrop`), or as framed editorial figures with a location caption (`PhotoFigure`). Fonts (already loaded by `styles.css`): **Newsreader** serif (`font-serif`) for h1/h2, big statements and stat numbers; **Plus Jakarta Sans** (`font-sans`) for everything else. h1 and h2 are serif by default. Use `font-sans` on an h2 only when it is a small label.

## Setup

No provider or wrapper needed. Components are plain presentational React (props in, markup out; no state, no context). Only `styles.css` has to be loaded.

- Every visible string is passed in as a prop. Components never hardcode copy. Write Indonesian copy by default.
- `Button` is always a link (`<a>`), so `href` is required. The site is static, with no forms and no submit buttons.
- There must be exactly one `<h1>` per page. It comes from `Hero` (homepage) or `PageHero` (inner pages). Everything else uses `SectionHeading` (h2) or plain h3.
- The site header/navigation is not part of this library. Leave room for a fixed 64px header over the top of `Hero`/`PageHero`.

## Styling idiom: Tailwind utility classes on design tokens

Style your own layout glue with the Tailwind classes compiled into `styles.css` (tokens + utilities). **Only classes that exist in `styles.css` work.** No arbitrary values (`bg-[#...]`, `p-[13px]`) and no inline hex colours.

| Family                                                                | Classes                                                                                                                                                                                     |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand grey scale                                                      | `bg-primary-{50,900,950}`, `text-primary-{100,200,500,900}`, `border-primary-900`                                                                                                           |
| Accent (light/mid grey, use sparingly: thin lines, numbers, eyebrows) | `bg-accent-500`, `text-accent-{400,600,700}`, `border-accent-500`                                                                                                                           |
| Neutral text & surfaces                                               | `text-neutral-{500,600,700}`, `bg-neutral-{50,100}`, `border-neutral-200`                                                                                                                   |
| Display type                                                          | `text-display` (hero h1), `text-headline` (section h2), `text-statement` (big quote), `text-lead` (intro paragraph), `text-eyebrow` (via `Eyebrow`)                                         |
| Text scale (semantic, use instead of `text-sm/lg/xl`)                 | `text-caption`, `text-small`, `text-body`, `text-body-lg`, `text-title-sm`, `text-title`, `text-title-lg`, `text-figure`, `text-figure-lg`                                                  |
| Image ratio                                                           | `aspect-landscape` (3:2), `aspect-portrait` (3:4), `aspect-card` (4:5), `aspect-panorama` (21:9)                                                                                            |
| Photo effects (dark sections only)                                    | `vignette-{left,right,center}`, `grain` — normally via `Backdrop` / `Grain`, not by hand                                                                                                    |
| Radius                                                                | `rounded-card`                                                                                                                                                                              |
| Layout                                                                | `grid`, `grid-cols-*`, `sm:/md:/lg:grid-cols-*`, `col-span-*`, `flex`, `gap-*`, `max-w-*`, `mx-auto`, `py-section md:py-section-lg` (standard section rhythm; `Section` applies it for you) |

Backgrounds alternate `bg-white` → `bg-neutral-50` → one dark `bg-primary-950 text-white` section. Use at most 1–2 dark sections per page (section must be `relative isolate overflow-hidden`). Its first children are either a photo — `<Backdrop image={…} vignette="left" />` (text on the left; use `vignette="center"` when text spans both sides) — or, without a photo, `<NusantaraPattern fade="right" />` + `<Grain />`; then `<ColumnLines />`. Never put a pattern on top of a photo. On light sections use photos only inside `PhotoFigure` or cards, and `<ColumnLines tone="light" />` at most once or twice per page. Number the homepage sections with `SectionHeading index="01"`… On dark sections, pass `tone="dark"` to `SectionHeading` and use `Button` variants `accent` / `ghost-light`. On light sections use `primary` / `secondary`.

## Where the truth lives

- `styles.css` and its imports: tokens (`--color-primary-*`, `--color-accent-*`, `--text-display`…) and every utility class available.
- `components/<group>/<Name>/<Name>.d.ts` (props) and `<Name>.prompt.md` (usage) for each component.

## Components

**Core (`ui/`):** `Section` (background tone `light`/`muted`/`dark` + Container + vertical rhythm — start every section with it), `SectionHeading`, `Eyebrow` (small wide-tracked label, tones `light`/`strong`/`dark`), `Button`, `PersonCard`, `Container`, `Logo`, `ColumnLines`, `NusantaraPattern` (`tone="light"` for light sections, used sparingly), `Backdrop` (photo + vignette + grain behind a dark section), `Grain`, `PhotoFigure` (framed photo with corner marks and a location caption).

**Sections (`sections/`), composed top-to-bottom on the one-page homepage:** `Hero`, `AboutIntro`, `StatsBand`, `VisionMission`, `ValuesGrid`, `Timeline`, `ManagementSection` (optionally opens with a `LeaderMessage`: one large serif quote signed with a small portrait, name and position), `BusinessSection` (+ `BusinessCard`; default layout is asymmetric — the first line of business large, the rest as compact rows — use `layout="grid"` only for 5+ lines), `NewsSection` (+ `NewsCard`), `ContactSection`, plus `CinematicStatement`, `CtaBand`, `PageHero` (legal pages) and `Footer`. Sections that are navbar targets take an `id` (e.g. `about`, `business`) and an `index` ("01", "02"…).

## Example: a homepage section

```jsx
<Section id="values" tone="muted" labelledBy="values-title">
  <SectionHeading
    id="values-title"
    index="02"
    eyebrow="Nilai Perusahaan"
    title="Nilai-nilai yang kami pegang"
  />
  <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    <li className="border-t-2 border-accent-500 pt-6">
      <h3 className="text-title-sm">Amanah</h3>
      <p className="mt-3 text-body leading-relaxed text-neutral-600">
        Memegang teguh kepercayaan yang diberikan.
      </p>
    </li>
  </ul>
  <Button href="#contact" variant="secondary" className="mt-12">
    Hubungi Kami
  </Button>
</Section>
```

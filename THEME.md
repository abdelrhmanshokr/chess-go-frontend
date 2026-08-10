# Theme Reference — Dark Wood & Gold (inspired)

Loosely inspired by a chess-club landing page reference. Directional, not literal —
values below are families/ranges to pick within, not fixed hex codes to copy.

## Palette Roles

- **bg-primary**: near-black navy family (`#0A0D16`–`#151B2E`)
- **surface**: one step lighter than bg-primary, used for cards/panels
- **accent-primary**: warm gold/amber family (`#D9993B`–`#F0B84F`) — CTAs, highlights, active states
- **accent-gradient**: orange → amber, used sparingly for promo/CTA bands only
- **text-primary**: off-white (`#F5F5F0` range)
- **text-muted**: cool gray, for secondary/body copy
- **border**: subtle dark, barely distinguishable from surface

## Typography

- Headings: bold; uppercase optional, reserve for hero-scale only
- Body: regular weight, relaxed line-height, muted color

## Component Direction

- **Buttons**: solid accent-primary fill, small border-radius, uppercase label optional
- **Cards**: surface background, minimal/no border, icon-first layout for feature grids
- **Section rhythm**: alternate full-bleed dark sections with accent-gradient bands for emphasis (promos, CTAs)

## Explicitly Flexible (implementer's discretion)

- Exact hex values within each family
- Gradient angle/stops
- Font family choice
- Icon style

The reference image informs **mood and contrast level** only — not a literal palette to clone.

## Usage

All task instruction/description files (`current_task/*.md`) should reference this file
when UI/styling work is involved, instead of restating theme details inline.

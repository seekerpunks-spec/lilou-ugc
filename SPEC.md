# Lilou Fronteau — Portfolio UGC · Spec sheet

> Reference document for porting/replicating the design in **Framer**, Webflow, or any other no-code builder. The Next.js implementation in this repo is the source of truth for layout, copy, and animation timings.

---

## 1. Design tokens

### 1.1 Colour palette

| Role             | Token      | Hex        | Use                                           |
| ---------------- | ---------- | ---------- | --------------------------------------------- |
| Background warm  | `cream`    | `#FFF4E6`  | Main page background, hero, services, contact |
| Background light | `bone`     | `#FAF4EC`  | Alternating sections (about, projects, process) |
| Background paper | `paper`    | `#FFFFFF`  | Cards, chips, pills                            |
| Background sand  | `shell`    | `#F5EBDD`  | Service icon chip, category pills              |
| Text primary     | `espresso` | `#2B1D18`  | Headings, primary text                        |
| Text body        | `mocha`    | `#6B574C`  | Paragraphs, descriptions                      |
| Text mute        | `warm-stone`| `#A99483` | Captions, footnotes                           |
| Accent primary   | `coral`    | `#EF6F6C`  | Primary buttons, accents, contact card        |
| Accent deep      | `coral-deep`| `#D65854` | Hover state on primary CTA                    |
| Accent secondary | `terracotta`| `#C96B4F` | Featured/Growth tier highlights               |
| Highlight        | `sun`      | `#F7C948`  | Stars, badges, result indicators              |
| Hero supporting  | `olive`    | `#8A9A5B`  | About footer strip                            |
| Hairline         | `line`     | `#EBD9C2`  | Card borders, dividers                        |
| Hairline soft    | `line-soft`| `#F3E6D4`  | Inner separators                              |

### 1.2 Typography

| Use      | Font              | Weight     | Notes                                         |
| -------- | ----------------- | ---------- | --------------------------------------------- |
| Display  | **Playfair Display** | 400 / 500 / 600 / 700 (italic available) | All H1/H2/H3, italic for emphasis (`em`) |
| Body     | **Inter**         | 300 / 400 / 500 / 600 | Paragraphs, UI, eyebrows, chips        |
| Script   | **Caveat**        | 400 / 500 / 600 | Handwritten signature, "play me ↑", logo |

Substitutes if needed: Cormorant Garamond, Editorial New (display); Satoshi, Manrope, Neue Haas Grotesk (body); Marck Script, Reenie Beanie (script).

### 1.3 Type scale

| Token       | Size                          | Use                       |
| ----------- | ----------------------------- | ------------------------- |
| Hero H1     | `clamp(2.6rem, 6.4vw, 5rem)`  | Hero headline             |
| Section H2  | `clamp(2.4rem, 5.5vw, 4.5rem)`| Projects, large sections  |
| H2 small    | `clamp(2rem, 4.5vw, 3.6rem)`  | About, Process, Offers    |
| Card title  | `1.25rem` (text-xl)           | Project / service name    |
| Body L      | `1.05rem`                     | Hero sub                  |
| Body M      | `1rem`                        | Section sub, card body    |
| Body S      | `0.875rem`                    | Card meta                 |
| Eyebrow     | `0.65rem` uppercase, tracking `0.32em` | Section kickers     |
| Caption     | `0.75rem`                     | Footnotes                 |

### 1.4 Spacing & radius

| Token         | Value     |
| ------------- | --------- |
| Section vertical | `py-24` mobile · `py-32` desktop (96px / 128px) |
| Container max | `max-w-7xl` (1280px) with `px-5` mobile, `px-8` desktop |
| Card radius   | `18px` (default), `28px` (large – hero photo, contact, offer cards) |
| Pill radius   | `9999px` |
| Card inner padding | `2rem` (mobile) · `2.5rem`–`3.5rem` (desktop) |

### 1.5 Shadows

```css
.shadow-soft {
  box-shadow:
    0 1px 2px rgba(43, 29, 24, 0.04),
    0 8px 24px -12px rgba(43, 29, 24, 0.10);
}
.shadow-soft-lg {
  box-shadow:
    0 1px 2px rgba(43, 29, 24, 0.04),
    0 18px 48px -22px rgba(43, 29, 24, 0.18);
}
```

Never use neon/blue glows. Stick to warm soft drops.

### 1.6 Motion language

- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` (quartic out)
- **Default duration**: 700–900ms for entrance; 300–500ms for hover
- **Pattern**: opacity 0→1, y 20px→0, no scale on entrance
- **Hover**: `translateY(-3px)` on cards, `-0.5px` on buttons
- **Respect `prefers-reduced-motion`** — disable all entrances when set

---

## 2. Page structure (10 zones)

```
[1] Nav                  → fixed, top
[2] Hero                 → split 6/6, photo right
[3] About card           → unified card 6/6 + niches strip
[4] Projects             → filter chips + 2-col grid (mobile 1)
[5] Services             → 3-col line-art grid (mobile 1, tablet 2)
[6] Process              → 4 horizontal steps with connecting line
[7] Offers               → 3 pricing tiers, middle elevated coral
[8] Contact              → coral card 4/8 split (photo + copy)
[9] Footer               → espresso bar with logo + lang + rights
```

---

## 3. Section specs

### 3.1 Nav

| Spec      | Value                                                  |
| --------- | ------------------------------------------------------ |
| Position  | `fixed inset-x-0 top-0 z-50`                           |
| Background| Transparent → `bg-cream/85 backdrop-blur` after 24px scroll, with `border-b border-line/50` |
| Height    | `~72px` mobile · `~80px` desktop                       |
| Logo      | "Lilou" (Caveat, 30px) over "FRONTEAU" (Inter, 0.6rem, tracking 0.42em) |
| Links     | About · Work · Services · Contact (Inter, 14px, espresso/75) |
| CTA       | Coral pill, label "Me contacter" / "Get in touch"      |
| Mobile    | Hide links + CTA at `<md`, keep logo + lang switcher only |

### 3.2 Hero

```
┌──────────────────────────────────────────────────────────┐
│  Cream background                                          │
│                                                            │
│  ┌─ Badge ─┐                          ┌─ Portrait 4/5 ─┐  │
│  │ ✦ UGC · Hyères │                  │                │  │
│  └────────────────┘                  │  Sun gradient  │  │
│                                       │  + script note │  │
│  H1 (Playfair, 5rem max, leading 1.05)│                │  │
│  Du contenu UGC solaire,              │  ©2026 chip    │  │
│  naturel et pensé pour                │                │  │
│  *donner envie d'acheter.*  (italic, coral)            │  │
│                                       │                │  │
│  Sub (mocha, 1.05rem, max 36ch)       └────────────────┘  │
│                                            ✦ play me ↑    │
│  [Authentique] [Camera-friendly] [TikTok / Reels / Ads]   │
│                                                            │
│  [ Voir mes projets → ]   [ Me contacter ]                │
└──────────────────────────────────────────────────────────┘
```

**Specs**
- Section padding: `pt-32 pb-20` mobile, `pt-36 pb-28` desktop
- Grid: 12-column, hero text spans 6 cols, portrait spans 6
- Title italic emphasis must be coral, NOT all caps
- Chips: paper card with line border, shadow-soft, 14px height; icon left
- Primary CTA: coral pill 56px tall, paper text, arrow icon right
- Secondary CTA: paper pill with line border, espresso text

**Image direction**
Real Lilou portrait at golden hour, looking down or aside, soft warmth, with a 30% cream gradient at bottom for legibility. If unavailable, painterly gradient `linear-gradient(165deg,#f5d6b0,#efb380,#d97c5f,#8c4a3a,#3a2520)` works as fallback.

### 3.3 About card

- Outer card: `bone` background, `border-line`, `radius 28px`, `shadow-soft`
- Layout: 12-col grid, copy 6/6, portrait 6/6
- H2 "À propos de Lilou" (Playfair 600, leading 1.08)
- Handwritten note (Caveat 30px) in coral
- Below the card: niches grid (3 cols mobile / 6 cols desktop) with circular paper chips containing line-art icons in coral
- Bottom strip: `bg-olive` rounded card, paper text, with 🌴 emoji on right

### 3.4 Projects

- Header centered, eyebrow + H2 + sub
- Filter chips (rounded-full, line border): "Tous · Beauté · Bien-être · Food · Mode · Travel · Lifestyle"
  - Active state: `bg-coral text-paper`
  - Inactive: `bg-paper text-espresso/70`
- Grid: 2 columns desktop, 1 mobile, gap 24px
- Card structure:
  - Outer paper card with 3px inner padding around image
  - Image area: aspect 5/4, painterly gradient (warm), card radius 18px inside
  - Brand text on image bottom-left (Playfair italic 30px, paper)
  - Category chip top-right on image (paper/15 with backdrop blur)
  - Below image: title + category pill, then meta rows (Format / Angle / Result)
  - Result row highlighted in coral with sun bullet (●)
- Filter animation: `AnimatePresence layout` with 600ms ease-out
- Footer CTA: coral pill "Voir plus de projets"

### 3.5 Services

- 3 columns desktop, 2 tablet, 1 mobile, gap 16px
- Each card centred, paper background with line border, radius 28px
- Icon in `shell` (#F5EBDD) chip 56px, line-art coral icon
- On hover: chip becomes coral, icon paper, card lifts 3px
- Title: Playfair 20px medium
- Body: 14px mocha, leading-relaxed, max 28ch

### 3.6 Process

- 4 columns desktop, 2 tablet, 1 mobile
- Connecting hairline at y=28px on desktop only
- Each step:
  - 56px paper circle with line border, shadow-soft, Playfair 18px coral number
  - Title 20px Playfair medium
  - Body 14px mocha
- Stagger entrance: 80ms per step

### 3.7 Offers

- 3 columns desktop, 1 mobile
- Middle (Growth) tier: `bg-coral text-paper`, slight scale 1.02 + lift -12px on desktop
- Other tiers: paper with line border
- Featured badge: pill at top edge "✦ Le plus populaire"
- Items list with 1.5px coral dot bullets
- Price line in Playfair 24px (coral on light card, paper on coral card)
- Per-tier CTA at bottom (paper / shell pill)
- Footnote below: "Tarifs indicatifs..." in warm-stone

### 3.8 Contact

- Full-width coral card, radius 28px, shadow-soft-lg
- Layout: 4-col photo left, 8-col copy right (stacked on mobile, photo on top)
- Photo: aspect 4/3 mobile, full-height desktop, painterly warm gradient + script signature "☼ on the beach"
- Copy:
  - Eyebrow "✦ Contact" in paper/70
  - H2 Playfair, italic emphasis on second part, paper colour
  - Primary CTA: paper pill on coral card, label "Discutons de votre projet", text in coral
  - Below CTA: 3-col list with line-art icons (instagram, mail, pin)
  - Final script line "à très vite ! ♡"

### 3.9 Footer

- `bg-espresso` (`#2B1D18`), text in cream
- 2 columns: logo + tagline / lang switcher + rights
- Lang switcher with cream/20 border for contrast

---

## 4. Responsive breakpoints

| Breakpoint | Width   | Notes                                          |
| ---------- | ------- | ---------------------------------------------- |
| Mobile     | < 640px | All grids collapse to 1 column; hero stacks (text first, photo below); chips wrap |
| Tablet     | 640-1024px | Services 2-col, projects 2-col, process 2-col |
| Desktop    | > 1024px | Full grids; sticky title columns enabled        |

Mobile-specific tweaks:
- Reduce hero pt to `pt-32` and pb to `pb-20`
- Stack offers (no scale on middle tier on mobile)
- Hide vertical kicker / decorative scripts on `<sm`

---

## 5. Animations (Motion / Framer Motion)

| Element            | Initial             | Animate                    | Trigger        |
| ------------------ | ------------------- | -------------------------- | -------------- |
| Hero badge         | opacity 0, y 18px   | duration 800ms, delay 50ms | mount          |
| Hero H1            | opacity 0, y 18px   | duration 800ms, delay 100ms| mount          |
| Hero sub/chips/CTAs| opacity 0, y 18px   | duration 800ms, stagger 100ms | mount       |
| Portrait           | opacity 0, scale 0.97 | duration 1000ms, delay 200ms | mount       |
| Section H2         | opacity 0, y 24px   | duration 800ms             | viewport `-15%`|
| Cards (projects, services, offers) | opacity 0, y 22px | duration 700ms, stagger 60ms | viewport `-12%` |
| Process steps      | opacity 0, y 18px   | duration 600ms, stagger 80ms | viewport `-15%`|
| Project filter     | layout + AnimatePresence | duration 600ms       | filter change  |

All entrances disabled when `prefers-reduced-motion: reduce` (use `MotionConfig reducedMotion="user"`).

---

## 6. Final copy (FR)

> Already encoded in `src/messages/fr.json`. Use that file as the single source of truth. EN translations in `src/messages/en.json`.

---

## 7. Image direction

For each gradient placeholder in the code, replace with a real photo:

| Slot            | Photo brief                                              |
| --------------- | -------------------------------------------------------- |
| Hero portrait   | Lilou at golden hour, beach or terrace, white/sand outfit, soft cream gradient overlay at bottom |
| About card      | Lilou with a white rose, eyes closed, natural light, no filter |
| Project cards (×6) | Real video poster frames or behind-the-scenes from each collab |
| Contact card    | Lilou laughing, beach or rooftop, summer warmth          |

Crop ratios:
- Hero: 4/5 vertical
- About: 4/5 vertical
- Projects: 5/4 horizontal
- Contact: 4/3 horizontal mobile, 1/1 with full bleed desktop

Recommended: shoot in JPEG at 2400×3000 (portrait) and 3000×2400 (landscape), export `.avif` for production.

---

## 8. Performance / Production checklist

- [ ] Replace all gradient placeholders with real `next/image` Image components
- [ ] Add `priority` to the hero portrait
- [ ] Pre-resize images to multiple breakpoints (640w, 1024w, 1920w)
- [ ] Set `fetchPriority="high"` on hero
- [ ] Generate static OG image with the hero portrait
- [ ] Lock domain `ugcbylilou.com` and update `metadataBase`
- [ ] Wire Plausible / Umami analytics
- [ ] Add `<link rel="canonical">` per locale
- [ ] Verify Lighthouse: 95+ Performance, 100 SEO, 100 Accessibility

---

## 9. Framer port hints

If porting to Framer specifically:

1. Use **CMS Collections** for `projects` and `services` instead of static data
2. Use Framer's built-in `Smart Components` for the offer cards (variants: default / featured)
3. Map Lenis-equivalent: enable Framer's "Smooth scroll" page setting
4. Replace Motion entrance animations with Framer's "Appear effects" (Slide up + Fade, 800ms ease out)
5. For project filter, use Framer's "Filtering" feature with niche tags
6. Coral primary CTA should use Framer's `Primary Button` variant with `bg=#EF6F6C`, hover `bg=#D65854`, lift y=-2

---

**Last updated:** 2026-05-09

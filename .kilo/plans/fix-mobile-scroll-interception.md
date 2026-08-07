# Fix Mobile Scroll Interception — Niki Site

## Problem Summary
The site is fundamentally broken on mobile — users report "all the feature cards have different kinds of scrolling features and dragging, and all of them are being intercepted." Desktop is "nearly okay."

## Root Causes (in priority order)

### 1. `overflow-x: clip` on `html` — PRIMARY (styles.css:55)
```
html { -webkit-text-size-adjust: 100%; scroll-padding-top: 80px; overflow-x: clip; }
```
This was added as a "backstop" in the responsive plan but **breaks scroll on mobile browsers**. `clip` behaves like `hidden` but worse — it clips the viewport scroll mechanism on iOS Safari and some Android WebKit browsers. This is the #1 scroll-breaking bug.

**Fix:** Remove `overflow-x: clip` from `html`. It's not needed since root causes were already fixed in the responsive plan. If a backstop is truly needed, use `overflow-x: hidden` on `body` instead (but verify it doesn't interfere with viewport scroll).

### 2. Horizontal scroll containers capturing vertical touch gestures
Four containers have `overflow-x: auto` or similar and can steal vertical swipe gestures on touch:

| Container | Line | Trigger |
|-----------|------|---------|
| `.fs-nav-list` | styles.css:1057 | ≤919px |
| `.tabs` | styles.css:356 | all sizes |
| `.install-snippet code` | styles.css:392 | all sizes |
| `.tui-ascii` | styles.css:452 | all sizes |

On mobile, when a user tries to scroll the page vertically and their finger starts over one of these containers, the browser routes the touch to the horizontal scroller instead, preventing page scroll.

**Fix:** Add `touch-action: pan-y` to these containers on mobile. This tells the browser to only handle vertical panning and pass horizontal gestures to the scroll container. Apply at `@media (max-width: 919px)`.

### 3. `scroll-behavior: smooth` on `html` (styles.css:59)
Can interfere with native scroll on some Android browsers. Not a primary cause but can exacerbate issues.

**Fix:** Already gated behind `prefers-reduced-motion: no-preference`. Keep as-is but note as potential secondary issue.

### 4. PixelGrid rAF at 20fps (pixel-grid.tsx:66)
Runs `requestAnimationFrame` at 20fps on the main thread. While not a scroll interceptor, it causes thread contention on weak mobile devices, making scroll feel janky.

**Fix:** Already has `IntersectionObserver` pause/resume + `document.hidden` detection. Consider throttling to 12fps on mobile via `matchMedia('(max-width: 850px)')`. This is low priority — the CSS fixes above should resolve the core scroll issue.

## Implementation Plan

### Phase 1: Remove `overflow-x: clip` (styles.css:55)
1. Remove `overflow-x: clip` from the `html` rule
2. Verify no horizontal page scroll reappears (it shouldn't — root causes were already fixed in responsive plan)

### Phase 2: Fix horizontal scroll container touch capture (styles.css)
Add `touch-action: pan-y` to each horizontal scroll container on mobile:

```css
@media (max-width: 919px) {
  .fs-nav-list,
  .tabs,
  .install-snippet code,
  .tui-ascii {
    touch-action: pan-y;
  }
}
```

This ensures vertical page scroll always works when the user's finger is over these elements.

### Phase 3: Optional — PixelGrid mobile throttle (pixel-grid.tsx)
Add a mobile-specific frame rate cap:
```tsx
const FRAME_MS = window.matchMedia('(max-width: 850px)').matches 
  ? 1000 / 12 
  : 1000 / 20
```

## Verification
1. `npm run build` passes
2. `npm run preview` — test on:
   - iOS Safari (or devtools device toolbar set to iPhone)
   - Android Chrome (or devtools set to Pixel)
   - Desktop Chrome (verify no regression)
3. Scroll through every section vertically — must be smooth
4. FeatureScroller horizontal tabs must still work horizontally
5. Install tabs must still scroll horizontally
6. Hero tui-ascii must still scroll horizontally if needed

## Files to Modify
- `src/styles.css` — remove `overflow-x: clip`, add `touch-action: pan-y` rules
- `src/components/ui/pixel-grid.tsx` — optional mobile throttle

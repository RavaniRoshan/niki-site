# Mobile Scroll & Responsiveness Fix

## Root Cause

`overflow-x: clip` on `html` (src/styles.css:55) is the **primary cause** of scroll breakage on mobile. This was added in the previous responsive plan as a "backstop" to prevent horizontal scroll, but `clip` is a modern CSS value with **inconsistent mobile browser support** — on iOS Safari it can prevent the page from becoming scrollable at all, and on older Android browsers it clips at the padding edge rather than the content box edge, interfering with the viewport scroll mechanism.

The three audit agents confirmed:
- **Zero** scroll-blocking JavaScript patterns exist (no drag, touch, wheel, or scroll listeners)
- **Zero** `preventDefault` calls on scroll/touch events
- **Zero** `touch-action` CSS restrictions
- The **only** problematic overflow declaration is `overflow-x: clip` on `html`

## Fixes

### Fix 1 — CRITICAL: Remove `overflow-x: clip` from `html`

**File:** `src/styles.css:55`

**Current:**
```css
html { -webkit-text-size-adjust: 100%; scroll-padding-top: 80px; overflow-x: clip; }
```

**Change to:**
```css
html { -webkit-text-size-adjust: 100%; scroll-padding-top: 80px; }
```

**Why:** `overflow-x: clip` on the root element breaks vertical scrolling on iOS Safari and some Android browsers. The existing `overflow-wrap: break-word` rules on text containers already prevent horizontal overflow from long tokens. If any horizontal overflow appears after removal, fix it at the specific container level — not on `html`.

---

### Fix 2 — HIGH: Remove `scroll-snap` from FeatureScroller nav

**File:** `src/styles.css` (the `@media (max-width: 919px)` block around line 1052)

**Remove:**
- `scroll-snap-type: x proximity` from `.fs-nav-list`
- `scroll-snap-align: start` from `.fs-nav-item`

**Why:** `scroll-snap` can cause unexpected scroll jumps on mobile, especially `proximity` mode which snaps to nearby snap points when the user releases their finger. This can feel like "scroll is being intercepted." The horizontal nav already has `overflow-x: auto` + `-webkit-overflow-scrolling: touch` for momentum scrolling — scroll-snap is unnecessary.

---

### Fix 3 — HIGH: Add `touch-action: manipulation` to video containers

**Files:** `src/styles.css` — add to `.fs-card-media` and `.hiw-card-media`

**Add:**
```css
.fs-card-media,
.hiw-card-media {
  touch-action: manipulation;
}
```

**Why:** `touch-action: manipulation` tells the browser to only handle pan and pinch gestures (no double-tap-to-zoom, no swipe navigation). This prevents video elements from capturing touch events for playback control/fullscreen, which can intercept vertical scroll on mobile. The videos already have `playsInline` and `muted`, so this is a safety net.

---

### Fix 4 — HIGH: Pause PixelGrid on mobile for performance

**File:** `src/components/ui/pixel-grid.tsx`

**Change:** Add a `matchMedia` check to skip canvas initialization on screens ≤850px. The canvas runs a `requestAnimationFrame` loop at 20fps on the main thread — on weak mobile devices this consumes frame budget and causes scroll jank.

**Approach:**
```tsx
// At the top of the PixelGrid component, before canvas setup:
const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 850px)').matches
if (isMobile) return null  // Skip canvas on mobile
```

**Why:** The pixel grid is a decorative background effect. On mobile it adds visual noise and consumes CPU/GPU resources that should be used for smooth scrolling. Removing it on mobile improves scroll performance significantly.

---

### Fix 5 — MEDIUM: Add fade indicators to horizontal scroll containers

**Files:** `src/styles.css` — add to `.tabs`, `.fs-nav-list`, `.install-snippet`

**Add right-edge fade mask:**
```css
.tabs,
.fs-nav-list,
.install-snippet {
  mask-image: linear-gradient(to right, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
}
```

**Why:** Horizontal scroll containers without visual indicators confuse users — they don't know they can swipe horizontally. A fade edge signals "there's more content to the right." This reduces the feeling that scroll is "being intercepted" because users understand the horizontal gesture is intentional.

---

### Fix 6 — MEDIUM: Fix remaining responsive layout issues

**a. `.tui-ascii` overflow on very small screens**
- **File:** `src/styles.css` — the `.tui-ascii` rule (around line 452)
- **Change:** Add `max-width: 100%; overflow-x: auto` (already has this, but verify it works with the compact wordmark layout)

**b. `.hiw-pause` tap target on mobile**
- **File:** `src/styles.css` — `.hiw-pause` rule
- **Change:** Already bumped to 40px height. Verify it's tappable.

**c. `.tier-cta .btn` at ≤640px**
- **File:** `src/styles.css` — already set to `width: 100%` at ≤640. Verify "Join enterprise waitlist" fits.

**d. `.copy-btn` layout shift**
- **File:** `src/styles.css` — `.copy-btn` already has `min-width: 92px`. Verify label changes don't cause shift.

**e. `.faq-body` indent at ≤640px**
- **File:** `src/styles.css` — already reduced to `padding-left: 16px`. Verify.

---

### Fix 7 — LOW: Desktop polish

**a. `.topnav-inner` at 851-960px**
- The desktop nav (links + wordmark + actions) can overflow at 851-960px viewport widths
- **Change:** At ≤960px, reduce `.topnav-links` gap from 20px to 12px, or shorten link labels
- **Why:** Prevents cramped nav on small desktops

**b. `.heading` hierarchy on tablet (641-850px)**
- Headings are 16px (same as body) on tablet
- **Change:** Add `.heading { font-size: 18px }` at ≤850px (between 16px body and 20px phone)
- **Why:** Restores visual hierarchy on tablet screens

**c. Anchor offset at 641-850px**
- Nav is ~57px (compact wordmark), `scroll-padding-top` is 72px — anchors land 15px below nav. Fine.
- But `body { padding-top }` is 60px at ≤850px, and hero-block has `padding-top: 48px` → hero content at 108px, nav at 57px → clears. OK.
- **No change needed.**

---

## Verification

After implementing all fixes, test on:

1. **iPhone SE (375px)** — Most constrained phone. Check: page scrolls, no horizontal overflow, feature cards don't intercept scroll, nav works, anchors land correctly.
2. **iPhone 12 (390px)** — Common phone width. Same checks.
3. **iPad (768px)** — Tablet. Check: layout stacks correctly, nav shows hamburger, feature scroller horizontal nav works.
4. **Desktop (1280px)** — Check: no regressions, nav fits, layouts correct.

**Specific checks:**
- `document.documentElement.scrollWidth <= window.innerWidth` (no horizontal scroll)
- All anchor links land below the fixed nav
- Feature card sections are fully scrollable vertically
- Install tabs scroll horizontally without capturing vertical swipe
- FAQ accordion opens/closes without scroll issues
- Waitlist form is usable (segment cards, inputs, submit)

**Build verification:** `npm run build` must pass with no errors.

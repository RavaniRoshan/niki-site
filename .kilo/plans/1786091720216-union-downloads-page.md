# Plan: Add "Union Downloads" Page

## Goal
Create a dedicated `/downloads` route — "Union Downloads" — listing all v0.2.0 distribution assets (binaries, installers, package managers) with direct download links pointing to the GitHub release at `https://github.com/RavaniRoshan/niki/releases/tag/v0.2.0`.

## Context
- **Framework:** Vite + React SPA, React Router DOM 6.30, Tailwind + hand-authored CSS
- **Existing pattern:** `WaitlistPage.jsx` — standalone page with `<Seo>`, `<TopNav>`, content, `<Footer>`
- **GitHub repo:** `https://github.com/RavaniRoshan/niki`
- **Release base URL:** `https://github.com/RavaniRoshan/niki/releases/download/v0.2.0/`
- **Release tag:** `v0.2.0`

## Release Assets (v0.2.0)

### Binary Downloads
| Asset | Platform | Format |
|-------|----------|--------|
| `niki-aarch64-apple-darwin.tar.xz` | macOS Apple Silicon | tar.xz |
| `niki-x86_64-apple-darwin.tar.xz` | macOS Intel | tar.xz |
| `niki-x86_64-pc-windows-msvc.zip` | Windows x64 | zip |
| `niki-aarch64-unknown-linux-gnu.tar.xz` | Linux ARM64 | tar.xz |
| `niki-x86_64-unknown-linux-gnu.tar.xz` | Linux x64 | tar.xz |

### Installer Scripts
| Asset | Platform | Method |
|-------|----------|--------|
| `niki-installer.sh` | Linux / macOS | `curl \| sh` |
| `niki-installer.ps1` | Windows | `irm \| iex` |

### Package Managers
| Method | Command |
|--------|---------|
| Homebrew (macOS) | `brew install ravaniroshan/tap/niki` |
| winget (Windows) | `winget install niki` |
| Scoop (Windows) | `scoop install niki` |
| Cargo (any) | `cargo install niki` |

### Checksums
SHA-256 checksums are published in the GitHub release body and as `sha256sums.txt` in the release assets.

## Files to Create/Modify

### 1. Create `src/components/DownloadsPage.jsx` (NEW)
Follow the `WaitlistPage.jsx` pattern:
- `<Seo>` with title "Union Downloads · Niki release binaries and installers"
- `<TopNav />`
- `<main>` with download sections
- `<Footer />`

Page sections:
1. **Hero heading** — "Union Downloads" with a subtitle
2. **Binary downloads** — Grid/table of 5 platform binaries, each with:
   - Platform name + architecture
   - Filename
   - Direct `<a>` link to `https://github.com/RavaniRoshan/niki/releases/download/v0.2.0/{filename}`
   - File size (static, can be updated later)
3. **Installer scripts** — Shell + PowerShell with copy-to-clipboard snippet (reuse `Snippet` pattern from Install.jsx)
4. **Package managers** — Homebrew, winget, Scoop, Cargo with copy-to-clipboard snippets
5. **Checksum verification** — Link to `sha256sums.txt` on the release, plus example verification command
6. **Footer CTA** — Link back to install guide on homepage `/#start`

### 2. Modify `src/main.jsx`
Add route:
```jsx
const DownloadsPage = React.lazy(() => import('./components/DownloadsPage.jsx'))
// ...
<Route path="/downloads" element={<DownloadsPage />} />
```

### 3. Modify `src/components/TopNav.jsx`
Add nav link before "Waitlist":
```jsx
<Link to="/downloads">Downloads</Link>
```

### 4. Modify `src/components/Footer.jsx`
Add footer link in the `foot-links` div:
```jsx
<Link to="/downloads">Downloads</Link>
```

### 5. Modify `public/sitemap.xml`
Add entry:
```xml
<url>
  <loc>https://niki.ai/downloads</loc>
  <lastmod>2026-08-07</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

## Design Decisions

- **Route path:** `/downloads` (not `/union-downloads` — cleaner URL; page title will say "Union Downloads")
- **No new CSS needed:** Reuse existing `.section`, `.container`, `.heading`, `.body`, `.ds-table`, `.install-snippet`, `.tier-badge`, `.btn-primary` classes from `styles.css`
- **Lazy-loaded:** Like `WaitlistPage`, use `React.lazy()` for code splitting
- **Direct links:** All binary downloads link directly to the GitHub release asset URLs (not to the releases page)
- **Version pinned:** Assets reference `v0.2.0` — when new releases ship, update the constants in the component

## Validation
1. `npm run dev` — verify `/downloads` renders correctly
2. Check all download links resolve to valid GitHub URLs
3. Verify nav links in TopNav and Footer work on both desktop and mobile
4. Test dark/light theme toggle on the new page
5. Verify sitemap.xml is valid XML
6. Run `npm run build` to ensure no build errors

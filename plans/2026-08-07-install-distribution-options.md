# Plan — Add per-platform install options to the Install section

Date: 2026-08-07
Repo: `niki-site` (site only — the `niki` Rust repo is **out of scope**)

---

## 1. Goal

The site currently offers exactly one way to get Niki: clone the GitHub repo and
`cargo build --release`. Add the full distribution matrix — shell installer, PowerShell
installer, winget/scoop, Homebrew tap, and `cargo install` — presented honestly, so that
the one method that works today is obvious and the four that do not yet work are clearly
labelled and **cannot be copied by mistake**.

### Decisions taken (from clarification)

| Question | Decision |
| --- | --- |
| Scope | **Site only.** No edits to `/home/shiva/projects/niki`. |
| Installer URL host | **Point straight at GitHub raw**, not `niki.dev` / `niki.ai`. |
| Not-yet-live options | **"Coming soon" badge + disabled copy button.** |

---

## 2. Verified current state (checked 2026-08-07)

This is why the plan looks the way it does. Everything in the requested table is
aspirational except the source build.

| Thing | Status |
| --- | --- |
| `github.com/RavaniRoshan/niki` | Public · Rust · BUSL-1.1 · default branch **`master`** |
| Release `v0.2.0` | Exists, **0 binary assets attached** |
| `.github/workflows/release.yml` | Exists but hardcodes `runs-on: ubuntu-latest` for all 3 matrix entries (macOS targets cannot build); missing ARM64 Linux and Windows |
| `crates.io/crates/niki` | **Unclaimed** — `cargo install niki` impossible today |
| `RavaniRoshan/homebrew-tap` | **404 — does not exist** |
| `niki.dev` | **Does not resolve.** Site canonical is `niki.ai`; deploys to `niki-site.vercel.app` |
| `install.sh` / `install.ps1` | Do not exist in the `niki` repo |

**Consequence:** exactly one method (`source`) gets a `ready` badge. The other four get
`soon`. This is a truthful-marketing requirement, not a stylistic one — a visitor who
copies `brew install ravaniroshan/tap/niki` today gets a 404 from Homebrew.

### The "Need Mac?" column is deliberately dropped

The `Need Mac?` column in the request answers *"does the maintainer need a Mac to publish
this channel?"* — a release-engineering concern, not a visitor concern. Rendering it on a
public marketing page would read as "you need a Mac to install this", which is false. It
is preserved instead in the deferred-work appendix (§7).

---

## 3. Landmine to fix first: the `.ds-table` mobile label leak

`src/styles.css` lines ~537–571 contains, inside `@media (max-width: 640px)`:

```css
.ds-table td:nth-child(2)::before { content: "Single-agent · "; ... }
.ds-table td:nth-child(3)::before { content: "Niki · "; ... }
```

These are **Compare-table-specific labels applied to every `.ds-table` on the site.** The
new install table is a `.ds-table`, so on any screen ≤640px it would render:

> `Single-agent · curl -fsSL https://raw.githubusercontent.com/...`

This must be scoped before the new table is added.

**Fix:**
1. In `src/components/Compare.jsx`, change `className="ds-table"` →
   `className="ds-table compare-table"`.
2. In `src/styles.css`, change the two `::before` selectors to
   `.compare-table td:nth-child(2)::before` and `.compare-table td:nth-child(3)::before`.
3. Add equivalent install-specific mobile labels (§5.3).

The `.ds-table` column-width rules (`td:first-child { width: 28% }` etc.) also assume the
Compare layout and will be overridden per-table rather than changed globally.

---

## 4. File-by-file changes

| # | File | Change | Risk |
| --- | --- | --- | --- |
| 1 | `src/components/Install.jsx` | Rewrite — platform picker + setup steps + matrix table | Medium |
| 2 | `src/styles.css` | New install styles; scope the `.ds-table` mobile labels | Low |
| 3 | `src/components/Compare.jsx` | Add `compare-table` class (one-line) | Trivial |
| 4 | `src/components/Faq.jsx` | Add one "How do I install Niki?" entry | Trivial |
| 5 | `index.html` | Mirror the new FAQ into the JSON-LD `FAQPage`; add `downloadUrl`/`softwareRequirements` to `SoftwareApplication` | Low |
| 6 | `public/llms.txt` | Add an install/distribution facts bullet | Trivial |

---

## 5. Detailed design

### 5.1 `src/components/Install.jsx` — rewrite

The existing tab strip (`cargo` / `podman` / `config` / `run`) is misleading: those are
**four sequential steps**, not four alternatives, but tabs imply "pick one". The rewrite
keeps every existing command and fixes that framing.

New structure:

```
<section id="start">
  Install                                        ← h2 (unchanged)
  lede

  1 — Get the binary
    [ source | linux | windows | macos | cargo ] ← tabs = real alternatives
    <badge: Available today | Coming soon>
    <snippet(s) + copy button>
    <note>

  2 — Build the sandbox image   <snippet>        ← was the "podman" tab
  3 — Configure a provider      <snippet>        ← was the "config" tab
  4 — Run it                    <snippet>        ← was the "run" tab

  All platforms                                  ← the requested matrix
  <table: Platform | Install | Status>
  <footnote about the release pipeline>

  [x] Review the branch / Providers / Backends   ← existing list-rows, unchanged
</section>
```

**Constants at the top of the file** — one place to change when the vanity domain lands:

```js
// Installer scripts are served from the repo until niki.ai/install.sh exists as a
// redirect. When it does, change these two constants and nothing else.
const RAW = 'https://raw.githubusercontent.com/RavaniRoshan/niki/master'
const INSTALL_SH = `${RAW}/install.sh`
const INSTALL_PS1 = `${RAW}/install.ps1`
const REPO_URL = 'https://github.com/RavaniRoshan/niki'
const RELEASES_URL = `${REPO_URL}/releases`
```

**`METHODS` data** — `source` is index 0 so it is the default active tab:

| id | label | platform (table col 1) | status | commands | note |
| --- | --- | --- | --- | --- | --- |
| `source` | `source` | Any — Linux · macOS · Windows | `ready` | `git clone https://github.com/RavaniRoshan/niki.git && cd niki && cargo build --release` | Requires Rust (2024 edition). The only method available today. |
| `linux` | `linux` | Linux — x86_64 · ARM64 | `soon` | `curl -fsSL {INSTALL_SH} \| sh` | Detects OS and architecture, pulls the matching release binary, verifies its checksum. |
| `windows` | `windows` | Windows — x86_64 | `soon` | `irm {INSTALL_PS1} \| iex` **and** `winget install niki` | PowerShell installer first; winget and Scoop packages to follow. |
| `macos` | `macos` | macOS — Intel · Apple Silicon | `soon` | `brew install ravaniroshan/tap/niki` **and** `curl -fsSL {INSTALL_SH} \| sh` | Homebrew tap, or the same shell installer used on Linux. |
| `cargo` | `cargo` | Cargo users | `soon` | `cargo install niki` | Once `niki` is published to crates.io. |

`cmds` is an **array** so `windows` and `macos` can show two alternatives stacked.

**Extract a `Snippet` sub-component.** Today a single `copied` state lives on `Install`;
the new layout has ~7 snippets, each needing its own state.

```jsx
function Snippet({ code, disabled = false, odId }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (disabled) return
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
        return
      }
    } catch {
      /* fall through to manual */
    }
    setCopied('select')
  }

  return (
    <div className={`install-snippet${disabled ? ' is-soon' : ''}`} data-od-id={odId}>
      <code>{code}</code>
      <button
        type="button"
        className="copy-btn"
        onClick={handleCopy}
        disabled={disabled}
        title={disabled ? 'Not published yet' : 'Copy to clipboard'}
      >
        {disabled ? 'soon' : copied === true ? 'copied' : copied === 'select' ? 'select+copy' : 'copy'}
      </button>
    </div>
  )
}
```

Preserve the existing copy-fallback behaviour verbatim (clipboard API → `select+copy`
label), because it is the only path that works on non-secure origins.

**Badges reuse the existing pricing classes** — `tier-badge tier-badge-ready` /
`tier-badge tier-badge-soon` — so "Available today" and "Coming soon" render identically
to the Pricing section. No new badge CSS.

**Accessibility.** The current tab strip has `role="tablist"`/`role="tab"` but no panel
wiring. While rewriting, add:
- `id={`install-tab-${m.id}`}` and `aria-controls="install-panel"` on each tab
- `role="tabpanel"`, `id="install-panel"`, `aria-labelledby={`install-tab-${active}`}` on
  the snippet container
- `tabIndex={i === active ? 0 : -1}` (roving tabindex) and Left/Right arrow-key handling

Drop `id="install-code"` (unreferenced, and would duplicate across snippets).
`data-od-id` is a labelling convention only — never read by JS — so the step snippets get
`install-snippet-step-2/3/4` and the method snippet keeps `install-snippet`.

**Matrix table** — `className="ds-table install-table"`, columns
`Platform | Install | Status`, rows generated from the same `METHODS` array (single source
of truth, no drift between the tabs and the table). Status cell renders the same badge.

**Footnote under the table** — this is where the release-pipeline detail from the request
lands, phrased as forward-looking:

> Release binaries are built by GitHub Actions for x86_64 Linux, ARM64 Linux, x86_64
> Windows, x86_64 macOS, and Apple Silicon macOS, then published to
> [GitHub Releases]({RELEASES_URL}) with SHA-256 checksums. The install scripts pick the
> right binary for your OS and architecture.

Keep the wording future-safe (no "available now" claim) and link `RELEASES_URL`.

The existing prerequisites paragraph ("Rust (2024 edition), Podman…") moves into the
`source` method note plus the step-2 caption, since Rust is only needed for the source
build.

### 5.2 Preserved content checklist

Nothing may be lost in the rewrite:
- [ ] `git clone … && cargo build --release` → `source` method
- [ ] `podman build -t niki-sandbox:24.04 …` → step 2
- [ ] `cp niki.example.toml niki.toml && export ANTHROPIC_API_KEY=…` → step 3
- [ ] `./target/release/niki run …` → step 4
- [ ] Prerequisites sentence → `source` note + step 2 caption
- [ ] Three `list-row` items (Review the branch / Providers / Backends) → unchanged
- [ ] `id="start"` on the section (TopNav, Hero, and Pricing all link to `#start`)
- [ ] `data-od-id="install"` / `install-tabs` / `install-snippet` / `copy-btn`

### 5.3 `src/styles.css` additions

Append a block after the existing `/* ── install ── */` section:

```css
.install-step {
  margin-top: 32px;
}
.install-step-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--muted);
  margin-bottom: 8px;
}
.install-method-head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.install-method-platform { font-size: 14px; color: var(--muted); }
.install-note {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted);
  max-width: 60ch;
}
.install-snippet + .install-snippet { margin-top: 8px; }
.install-snippet.is-soon { opacity: 0.72; }
.copy-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* matrix table: 3 columns, long commands must wrap */
.install-table td:first-child   { width: 22%; }
.install-table td:nth-child(2)  { width: 56%; }
.install-table td:nth-child(3)  { width: 22%; }
.install-table code {
  font-size: 13px;
  overflow-wrap: anywhere;
  color: var(--body);
}
.install-table code + code { display: block; margin-top: 6px; }
```

Mobile (`@media (max-width: 640px)`) — matching labels for the install table, since the
generic `.ds-table` rules stack every cell and hide `thead`:

```css
.install-table td:nth-child(2)::before { content: ""; }
.install-table td:first-child { color: var(--fg); font-weight: 500; }
```

And the scoping fix from §3:

```css
/* was .ds-table td:nth-child(2)::before */
.compare-table td:nth-child(2)::before { content: "Single-agent · "; color: var(--muted); }
.compare-table td:nth-child(3)::before { content: "Niki · "; color: var(--muted); font-weight: 500; }
```

Note the stray unbalanced-looking `}` at styles.css ~line 571 — verify the media query
still closes correctly after editing.

### 5.4 `src/components/Faq.jsx`

Add one entry (keeps the Install section short and feeds the FAQ schema):

```js
{
  id: 'faq-install',
  q: 'How do I install Niki?',
  a: 'Today: clone the repo and cargo build --release (Rust 2024 edition). Prebuilt binaries for x86_64 Linux, ARM64 Linux, x86_64 Windows, x86_64 macOS, and Apple Silicon macOS are on the way via GitHub Releases, along with a shell installer, a PowerShell installer, winget/Scoop, a Homebrew tap, and cargo install niki.',
}
```

### 5.5 `index.html`

- Mirror the new FAQ Q&A into the `FAQPage` `mainEntity` array (the file already keeps
  three entries in sync with `Faq.jsx` by hand).
- On the `SoftwareApplication` node, add
  `"downloadUrl": "https://github.com/RavaniRoshan/niki/releases"` and
  `"softwareRequirements": "Rust 2024 edition; Podman or Docker"`.
- `"operatingSystem": "Linux, macOS, Windows"` is already correct — leave it.

### 5.6 `public/llms.txt`

Add under **Product facts**:

```
- Install: source build today (`git clone` + `cargo build --release`, Rust 2024 edition). Planned channels: shell installer (Linux/macOS), PowerShell installer plus winget/Scoop (Windows), Homebrew tap (macOS), and `cargo install niki`. Prebuilt binaries target x86_64 Linux, ARM64 Linux, x86_64 Windows, x86_64 macOS, and Apple Silicon macOS via GitHub Releases.
```

---

## 6. Verification

1. `npm run build` — must succeed with no new warnings.
2. `npm run dev` and check `/#start`:
   - `source` is the default active tab, badge reads **Available today**, copy works.
   - `linux` / `windows` / `macos` / `cargo` tabs show **Coming soon**; copy button reads
     `soon` and is genuinely disabled (click does nothing, cursor is `not-allowed`).
   - `windows` and `macos` each render two stacked snippets.
   - Steps 2–4 render as visible sequential snippets, each with a working copy button.
   - The matrix table rows match the tab contents exactly.
3. **Resize to ≤640px** and confirm the regression fix: the install table must **not**
   show `Single-agent ·` / `Niki ·` prefixes, and the Compare table must **still** show
   them.
4. Toggle dark mode — badges, `is-soon` opacity, and table text must stay legible against
   `#121111`.
5. Keyboard: Tab into the tab strip, Left/Right arrows move between tabs, Enter/Space
   activates, focus ring visible.
6. Long-URL check: the ~85-char `curl -fsSL https://raw.githubusercontent.com/...` string
   must not blow out the table width on mobile (`overflow-wrap: anywhere` handles it) and
   must scroll rather than overflow inside `.install-snippet` (`overflow-x: auto`).

---

## 7. Deferred — release engineering (NOT in this plan)

Recorded so it is not lost. All of this lives in `/home/shiva/projects/niki`, which this
plan does not touch. Until it ships, every "coming soon" badge stays.

| Platform | Command | Blocked on | Need a Mac? |
| --- | --- | --- | --- |
| Linux | `curl -fsSL …/install.sh \| sh` | `install.sh` + release assets | No |
| Windows | `irm …/install.ps1 \| iex` · `winget install niki` | `install.ps1`, winget manifest PR | No |
| macOS | `brew install ravaniroshan/tap/niki` | `RavaniRoshan/homebrew-tap` repo | Only once, to publish/test the formula |
| Cargo | `cargo install niki` | Claiming `niki` on crates.io | No |

Required work, in order:
1. **Fix `release.yml`** — it currently sets `runs-on: ubuntu-latest` on the job while the
   matrix defines a `matrix.os`; change to `runs-on: ${{ matrix.os }}`, otherwise the
   `*-apple-darwin` targets are cross-compiled on Linux and fail.
2. **Extend the matrix to five targets**: `x86_64-unknown-linux-gnu`,
   `aarch64-unknown-linux-gnu`, `x86_64-pc-windows-msvc`, `x86_64-apple-darwin`,
   `aarch64-apple-darwin`. The Windows job needs `.zip` + `niki.exe` handling rather than
   the current `tar czf` + `sha256sum` path.
3. **Attach the `.sha256` files** to the release — the current `files:` glob is
   `artifacts/*.tar.gz`, which silently drops every checksum it just generated.
4. Write `install.sh` (uname-based OS/arch detection, checksum verify, install to
   `~/.local/bin`) and `install.ps1`.
5. Create `RavaniRoshan/homebrew-tap` and automate formula bumps on release.
6. Claim `niki` on crates.io. **Note:** BUSL-1.1 is a valid SPDX identifier so crates.io
   will accept it, but it is not OSI-approved — worth a deliberate decision before
   publishing.
7. Optionally add `niki.ai/install.sh` → GitHub raw as a Vercel redirect, then flip the
   two constants in `Install.jsx` (§5.1) to get the short one-liners from the original
   request.

Re-tag `v0.2.0` (or cut `v0.2.1`) afterwards, since the existing tag produced no assets.

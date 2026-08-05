#!/usr/bin/env python3
"""Reusable renderer for Niki agent demo clips and Product Hunt launch assets.

Renders TUI-style animated frames with Pillow + JetBrains Mono (matching the
existing public/demo.gif: dark charcoal #121111), then encodes
MP4 (H.264) + WebM (VP9) + optimized GIF + a static poster PNG per clip.

For the Product Hunt launch it also produces:
  - a full narrative demo GIF (the whole pipeline, one continuous run)
  - a 240x240 thumbnail
  - 6 gallery frames at 1270x760

Usage:
    python3 tools/render_agent_demo.py            # all per-agent clips
    python3 tools/render_agent_demo.py planner    # one clip
    python3 tools/render_agent_demo.py full        # narrative demo GIF
    python3 tools/render_agent_demo.py thumbnail   # 240x240 thumbnail
    python3 tools/render_agent_demo.py gallery     # 6 gallery PNGs
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from PIL import Image, ImageDraw, ImageFont

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_DIR = os.path.join(REPO, "tools", "fonts")
OUT_DIR = os.path.join(REPO, "public", "agent-demos")
FRAMES_DIR = os.path.join(OUT_DIR, ".frames")
FPS = 12

FONT_REG = ImageFont.truetype(os.path.join(FONT_DIR, "JetBrainsMono-Regular.ttf"), 17)
FONT_BOLD = ImageFont.truetype(os.path.join(FONT_DIR, "JetBrainsMono-Bold.ttf"), 17)
FONT_BAR = ImageFont.truetype(os.path.join(FONT_DIR, "JetBrainsMono-Regular.ttf"), 14)

# ---- palette (web-safe, non-colliding: Red=red, SecurityAuditor=amber) ----
BG = "#121111"
BAR = "#1b1818"
BORDER = "#3a3636"
TXT = "#f4f1f1"
DIM = "#7d7a7a"
ASH = "#9a9898"
OK = "#30d158"
WARN = "#ff9f0a"
C = {
    "txt": TXT, "dim": DIM, "ash": ASH, "ok": OK, "warn": WARN,
    "planner": "#3b9eff", "coder": "#ff5cc8", "tester": "#30d158",
    "red": "#ff453a", "reviewer": "#ffd60a", "synth": "#36d6e0",
    "sec": "#ff9f0a", "solo": "#9a9898",
}

W, H = 1200, 750
X0, Y0, LH = 24, 56, 27


def _line(t, c="txt", type=True):
    return {"t": t, "c": c, "type": type}


PROMPT = _line('$ niki run "Add a GET /health endpoint" --project ./my-app', "dim", type=False)

CLIPS = {
    "planner": {
        "glyph": "◈", "name": "Planner", "role": "planner",
        "artifact": {"title": "artifacts/planner.json · TaskSpec", "accent": "planner", "lines": [
            _line("summary: GET /health -> {status, uptime}", "txt", False),
            _line("files_to_modify: src/routes/health.ts (create)", "txt", False),
            _line("acceptance: 200 + JSON body", "txt", False),
        ]},
        "steps": [
            [_line("◈ Planner  reading task + ranked context files", "planner")],
            [_line("  files: src/routes/health.ts · tests/health.test.ts", "dim")],
            [_line("◈ Planner  TaskSpec ready — no code written", "planner")],
        ],
    },
    "coder": {
        "glyph": "⟠", "name": "Coder", "role": "coder",
        "artifact": {"title": "artifacts/coder.json · CodeDiff", "accent": "coder", "lines": [
            _line("+ export async function health() {", "txt", False),
            _line("+   return { status: 'ok', uptime }", "txt", False),
            _line("+ }", "txt", False),
        ]},
        "steps": [
            [_line("⟠ Coder   applying unified diff to sandbox copy", "coder")],
            [_line("  your working tree is never touched", "dim")],
            [_line("⟠ Coder   changed 1 file · spec adherence ok", "coder")],
        ],
    },
    "tester": {
        "glyph": "◉", "name": "Tester", "role": "tester",
        "artifact": {"title": "artifacts/tester.json · TestReport (simulated)", "accent": "tester", "lines": [
            _line("tests_written: 3", "txt", False),
            _line("3 passed · 0 failed (reasoned vs diff)", "ok", False),
            _line("edge cases: missing uptime guarded", "txt", False),
        ]},
        "steps": [
            [_line("◉ Tester  analyzing the diff · simulating tests", "tester")],
            [_line("  reasons about pass/fail from code logic", "dim")],
            [_line("◉ Tester  3/3 reasoned pass (not executed)", "tester")],
        ],
    },
    "red": {
        "glyph": "✗", "name": "Red", "role": "red",
        "artifact": {"title": "artifacts/red.json · RedChallenge", "accent": "red", "lines": [
            _line("R1 (high) route not behind authz", "warn", False),
            _line("R2 (med)  uptime unvalidated input", "warn", False),
            _line("claim: 'handler publicly reachable'", "txt", False),
        ]},
        "steps": [
            [_line("✗ Red     challenging the change (adversarial)", "red")],
            [_line("  never the Coder's own reasoning", "dim")],
            [_line("✗ Red     2 challenges raised for Reviewer", "red")],
        ],
    },
    "reviewer": {
        "glyph": "◆", "name": "Reviewer", "role": "reviewer",
        "artifact": {"title": "artifacts/reviewer.json · ReviewVerdict", "accent": "reviewer", "lines": [
            _line("verdict: approved", "ok", False),
            _line("scores: correctness 10 · quality 8 · cov 10", "txt", False),
            _line("red: R1 upheld -> authz note added", "txt", False),
        ]},
        "steps": [
            [_line("◆ Reviewer weighing Coder against Red", "reviewer")],
            [_line("  reconciles every Red challenge", "dim")],
            [_line("◆ Reviewer approved · 0 revisions", "reviewer")],
        ],
    },
    "synthesizer": {
        "glyph": "⧉", "name": "Synthesizer", "role": "synth",
        "artifact": {"title": "artifacts/synthesizer.json · Synthesis", "accent": "synth", "lines": [
            _line("merged 2 parallel coder diffs", "txt", False),
            _line("one git-apply-able unified diff", "txt", False),
            _line("conflict markers: 0", "ok", False),
        ]},
        "steps": [
            [_line("⧉ Synthesizer merging 2 coder worktrees", "synth")],
            [_line("  opt-in: [parallel] enabled", "dim")],
            [_line("⧉ Synthesizer merged 2 branches cleanly", "synth")],
        ],
    },
    "security": {
        "glyph": "⚷", "name": "Security Auditor", "role": "sec",
        "artifact": {"title": "artifacts/security_auditor.json · SecurityVerdict", "accent": "sec", "lines": [
            _line("verdict: pass", "ok", False),
            _line("0 critical · 1 low (hardcoded port)", "warn", False),
            _line("isolation (podman) unchanged", "txt", False),
        ]},
        "steps": [
            [_line("⚷ Security audit scanning the diff", "sec")],
            [_line("  opt-in: [security] enabled", "dim")],
            [_line("⚷ Security pass — recorded, non-gating", "sec")],
        ],
    },
    "solo": {
        "glyph": "◈→⟠", "name": "Solo fast-path", "role": "solo",
        "artifact": {"title": "artifacts/solo.json · CodeDiff", "accent": "solo", "lines": [
            _line("single agent collapses the pipeline", "txt", False),
            _line("Planner+Coder+Tester+Red -> one pass", "txt", False),
            _line("trades away independent Red/Blue", "warn", False),
        ]},
        "steps": [
            [_line("◈→⟠ solo fast-path (single agent)", "solo")],
            [_line("  Auto mode, Low complexity", "dim")],
            [_line("solo produced diff · no adversarial review", "solo")],
        ],
    },
}

# ---- Full narrative pipeline (one continuous run) ----
FULL_PROMPT = _line('$ niki run "Add a GET /health endpoint" --project ./my-app', "dim", type=False)

FULL_PHASES = [
    {"glyph": "◈", "name": "Planner", "color": "planner",
     "steps": [
         _line("◈ Planner  reading task + ranked context files", "planner"),
         _line("  files: src/routes/health.ts · tests/health.test.ts", "dim"),
         _line("◈ Planner  TaskSpec ready — no code written", "planner"),
     ],
     "artifact": {"title": "artifacts/planner.json · TaskSpec", "accent": "planner", "lines": [
         _line("summary: GET /health -> {status, uptime}", "txt", False),
         _line("files_to_modify: src/routes/health.ts (create)", "txt", False),
         _line("acceptance: 200 + JSON body", "txt", False),
     ]}},
    {"glyph": "⟠", "name": "Coder", "color": "coder",
     "steps": [
         _line("⟠ Coder   applying unified diff to sandbox copy", "coder"),
         _line("  your working tree is never touched", "dim"),
         _line("⟠ Coder   changed 1 file · spec adherence ok", "coder"),
     ],
     "artifact": {"title": "artifacts/coder.json · CodeDiff", "accent": "coder", "lines": [
         _line("+ export async function health() {", "txt", False),
         _line("+   return { status: 'ok', uptime }", "txt", False),
         _line("+ }", "txt", False),
     ]}},
    {"glyph": "◉", "name": "Tester", "color": "tester",
     "steps": [
         _line("◉ Tester  analyzing the diff · simulating tests", "tester"),
         _line("  reasons about pass/fail from code logic", "dim"),
         _line("◉ Tester  3/3 reasoned pass (not executed)", "tester"),
     ],
     "artifact": {"title": "artifacts/tester.json · TestReport", "accent": "tester", "lines": [
         _line("tests_written: 3", "txt", False),
         _line("3 passed · 0 failed (reasoned vs diff)", "ok", False),
         _line("edge cases: missing uptime guarded", "txt", False),
     ]}},
    {"glyph": "✗", "name": "Red", "color": "red",
     "steps": [
         _line("✗ Red     challenging the change (adversarial)", "red"),
         _line("  never the Coder's own reasoning", "dim"),
         _line("✗ Red     2 challenges raised for Reviewer", "red"),
     ],
     "artifact": {"title": "artifacts/red.json · RedChallenge", "accent": "red", "lines": [
         _line("R1 (high) route not behind authz", "warn", False),
         _line("R2 (med)  uptime unvalidated input", "warn", False),
         _line("claim: 'handler publicly reachable'", "txt", False),
     ]}},
    {"glyph": "◆", "name": "Reviewer", "color": "reviewer",
     "steps": [
         _line("◆ Reviewer weighing Coder against Red", "reviewer"),
         _line("  reconciles every Red challenge", "dim"),
         _line("◆ Reviewer approved · 0 revisions", "reviewer"),
     ],
     "artifact": {"title": "artifacts/reviewer.json · ReviewVerdict", "accent": "reviewer", "lines": [
         _line("verdict: approved", "ok", False),
         _line("scores: correctness 10 · quality 8 · cov 10", "txt", False),
         _line("red: R1 upheld -> authz note added", "txt", False),
     ]}},
    {"glyph": "⎇", "name": "Git", "color": "ok",
     "steps": [
         _line("⎇ creating branch niki/add-health-endpoint", "ok"),
         _line("  writing report.md + artifacts/*.json", "dim"),
     ],
     "artifact": {"title": "git · niki/add-health-endpoint", "accent": "ok", "lines": [
         _line("src/routes/health.ts | 12 ++++++++++++", "txt", False),
         _line("1 file changed, 12 insertions(+)", "txt", False),
         _line("@@ -0,0 +1,12 @@", "dim", False),
     ]}},
    {"glyph": "✓", "name": "Report", "color": "ok",
     "steps": [
         _line("✓ run complete — reviewable pull request ready", "ok"),
     ],
     "artifact": {"title": "report.md · RunReport", "accent": "ok", "lines": [
         _line("task: Add GET /health endpoint", "txt", False),
         _line("agents: Planner -> Coder -> Tester -> Red -> Reviewer", "txt", False),
         _line("red challenges: 2 raised · 2 resolved", "txt", False),
         _line("test coverage: 100% of new code", "txt", False),
         _line("status: APPROVED", "ok", False),
     ]}},
]


# --------------------------------------------------------------------------
# Drawing engine (parametrized by canvas size so PH assets can be 1270x760)
# --------------------------------------------------------------------------
class Canvas:
    def __init__(self, w, h, font_reg, font_bold, font_bar, x0, y0, lh):
        self.w = w
        self.h = h
        self.reg = font_reg
        self.bold = font_bold
        self.bar = font_bar
        self.x0 = x0
        self.y0 = y0
        self.lh = lh


CANON = Canvas(1200, 750, FONT_REG, FONT_BOLD, FONT_BAR, 24, 56, 27)
PH = Canvas(1270, 760, FONT_REG, FONT_BOLD, FONT_BAR, 30, 64, 30)


def draw_frame(canvas, revealed, artifact, cursor_on=True):
    img = Image.new("RGB", (canvas.w, canvas.h), BG)
    d = ImageDraw.Draw(img)
    # top bar
    d.rectangle([0, 0, canvas.w, 36], fill=BAR)
    for i, (cx, col) in enumerate([(22, "#ff5f56"), (38, "#ffbd2e"), (54, "#27c93f")]):
        d.ellipse([cx - 5, 13, cx + 5, 23], fill=col)
    d.text((canvas.w - 24, 11), "niki · session", font=canvas.bar, fill=ASH, anchor="ra")
    # body
    y = canvas.y0
    last = revealed[-1] if revealed else ("", "txt")
    for i, (text, color) in enumerate(revealed):
        is_last = i == len(revealed) - 1
        d.text((canvas.x0, y), text, font=canvas.reg, fill=C.get(color, TXT))
        if is_last and cursor_on:
            tw = canvas.reg.getlength(text)
            d.rectangle([canvas.x0 + tw + 2, y + 3, canvas.x0 + tw + 9, y + 18], fill=C.get(color, TXT))
        y += canvas.lh
    # artifact box
    if artifact:
        y += 8
        lines = artifact["lines"]
        box_h = 16 + canvas.lh * (len(lines) + 1)
        bx, by, bw = canvas.x0, y, canvas.w - 2 * canvas.x0
        d.rounded_rectangle([bx, by, bx + bw, by + box_h], radius=6,
                            outline=BORDER, width=1)
        d.text((bx + 14, by + 12), artifact["title"], font=canvas.bold,
               fill=C.get(artifact["accent"], TXT))
        ly = by + 12 + canvas.lh
        for ln in lines:
            text = ln["t"] if isinstance(ln, dict) else ln[0]
            color = ln.get("c") if isinstance(ln, dict) else ln[1]
            d.text((bx + 14, ly), text, font=canvas.reg, fill=C.get(color, TXT))
            ly += canvas.lh
    return img


def _reveal_line(revealed, ln, snaps, artifact):
    if ln.get("type", True):
        full = ln["t"]
        color = ln["c"]
        inc = max(1, len(full) // 6)
        for k in range(inc, len(full) + 1, inc):
            revealed.append((full[:k], color))
            snaps.append((list(revealed), artifact))
        revealed[-1] = (full, color)
        snaps.append((list(revealed), artifact))
    else:
        revealed.append((ln["t"], ln["c"]))
        snaps.append((list(revealed), artifact))


def build_frames(canvas, spec):
    snaps = []

    def hold(n=2, artifact=None):
        for _ in range(n):
            snaps.append((list(revealed), artifact))

    revealed = [(PROMPT["t"], PROMPT["c"])]
    hold(2)
    artifact = None
    for step in spec["steps"]:
        for ln in step:
            _reveal_line(revealed, ln, snaps, artifact)
        if spec.get("artifact") is not None:
            artifact = spec["artifact"]
            snaps.append((list(revealed), artifact))
    hold(10, artifact)
    return snaps


def build_full_frames(canvas):
    snaps = []

    def hold(n=2, artifact=None):
        for _ in range(n):
            snaps.append((list(revealed), artifact))

    revealed = [(FULL_PROMPT["t"], FULL_PROMPT["c"])]
    hold(6)
    artifact = None
    for phase in FULL_PHASES:
        for ln in phase["steps"]:
            _reveal_line(revealed, ln, snaps, artifact)
        artifact = phase["artifact"]
        snaps.append((list(revealed), artifact))
        hold(26, artifact)
    hold(34, artifact)
    return snaps


def encode(key, frame_files, poster_file):
    mp4 = os.path.join(OUT_DIR, f"{key}.mp4")
    webm = os.path.join(OUT_DIR, f"{key}.webm")
    gif = os.path.join(OUT_DIR, f"{key}.gif")
    tmp_gif = os.path.join(FRAMES_DIR, f"{key}_pillow.gif")
    ffmpeg = shutil.which("ffmpeg")
    gifsicle = os.path.join(REPO, "node_modules", "gifsicle", "vendor", "gifsicle")
    pat = os.path.join(FRAMES_DIR, f"{key}_%03d.png")

    subprocess.run([ffmpeg, "-y", "-framerate", str(FPS), "-i", pat,
                    "-vf", "crop=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p",
                    "-c:v", "libx264", "-crf", "24", "-pix_fmt", "yuv420p", mp4],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run([ffmpeg, "-y", "-framerate", str(FPS), "-i", pat,
                    "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", webm],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    # Animated GIF via Pillow with a single shared palette + optimize (small),
    # then a final lossless gifsicle pass.
    imgs = [Image.open(f).convert("RGB") for f in frame_files]
    first = imgs[0].convert("P", palette=Image.ADAPTIVE, colors=64)
    quant = [first] + [im.quantize(palette=first, dither=Image.NONE) for im in imgs[1:]]
    first.save(tmp_gif, save_all=True, append_images=quant[1:],
               duration=int(1000 / FPS), loop=0, optimize=True,
               disposal=2)
    subprocess.run([gifsicle, "-O3", "--colors", "256", tmp_gif, "-o", gif],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(tmp_gif):
        os.remove(tmp_gif)
    shutil.copy(poster_file, os.path.join(OUT_DIR, f"{key}.png"))
    return gif


def render(key, spec, canvas=CANON):
    snaps = build_frames(canvas, spec)
    os.makedirs(FRAMES_DIR, exist_ok=True)
    files = []
    poster_src = None
    for i, (revealed, artifact) in enumerate(snaps):
        cursor_on = (i // 6) % 2 == 0
        img = draw_frame(canvas, revealed, artifact, cursor_on)
        f = os.path.join(FRAMES_DIR, f"{key}_{i:03d}.png")
        img.save(f)
        files.append(f)
        if artifact is not None and poster_src is None:
            poster_src = f
    if poster_src is None:
        poster_src = files[len(files) // 2]
    gif = encode(key, files, poster_src)
    for f in files:
        os.remove(f)
    size = os.path.getsize(gif)
    print(f"  {key}: {len(snaps)} frames -> mp4/webm/gif/png ({size//1024} KB gif)")


def render_full(canvas=PH):
    key = "full"
    snaps = build_full_frames(canvas)
    os.makedirs(FRAMES_DIR, exist_ok=True)
    files = []
    poster_src = None
    for i, (revealed, artifact) in enumerate(snaps):
        cursor_on = (i // 6) % 2 == 0
        img = draw_frame(canvas, revealed, artifact, cursor_on)
        f = os.path.join(FRAMES_DIR, f"{key}_{i:03d}.png")
        img.save(f)
        files.append(f)
        if artifact is not None and poster_src is None:
            poster_src = f
    if poster_src is None:
        poster_src = files[len(files) // 2]
    gif = encode(key, files, poster_src)
    for f in files:
        os.remove(f)
    size = os.path.getsize(gif)
    print(f"  {key}: {len(snaps)} frames -> mp4/webm/gif/png ({size//1024} KB gif)")


# --------------------------------------------------------------------------
# Thumbnail (240x240) + gallery frames (1270x760)
# --------------------------------------------------------------------------
def render_thumbnail(path=os.path.join(OUT_DIR, "thumbnail.png")):
    S = 240
    img = Image.new("RGB", (S, S), BG)
    d = ImageDraw.Draw(img)
    # 5 agent color dots
    dots = ["#3b9eff", "#ff5cc8", "#30d158", "#ff453a", "#ffd60a"]
    for i, col in enumerate(dots):
        cx = 52 + i * 34
        d.ellipse([cx - 7, 40, cx + 7, 54], fill=col)
    # wordmark
    f = FONT_BOLD
    d.text((S // 2, 110), "niki", font=f, fill=TXT, anchor="mm")
    d.text((S // 2, 150), "for Code", font=FONT_REG, fill=ASH, anchor="mm")
    d.text((S // 2, 192), "multi-agent PRs", font=FONT_BAR, fill=DIM, anchor="mm")
    img.save(path)
    print(f"  thumbnail: {os.path.getsize(path)//1024} KB -> {path}")


def _gallery_frame(canvas, title, subtitle, lines, accent="ok"):
    img = Image.new("RGB", (canvas.w, canvas.h), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, canvas.w, 36], fill=BAR)
    for cx, col in [(22, "#ff5f56"), (38, "#ffbd2e"), (54, "#27c93f")]:
        d.ellipse([cx - 5, 13, cx + 5, 23], fill=col)
    d.text((canvas.w - 24, 11), "niki · for code", font=canvas.bar, fill=ASH, anchor="ra")
    d.text((canvas.x0, 70), title, font=canvas.bold, fill=TXT)
    if subtitle:
        d.text((canvas.x0, 70 + canvas.lh + 6), subtitle, font=canvas.reg, fill=DIM)
    y = 70 + (canvas.lh + 6) * 2 + 24
    for ln, col in lines:
        d.text((canvas.x0, y), ln, font=canvas.reg, fill=C.get(col, TXT))
        y += canvas.lh + 4
    return img


def render_gallery(canvas=PH):
    scenes = [
        ("Describe it. Niki ships the pull request.",
         "An open-source multi-agent coding system that produces reviewable PRs.",
         [("$ niki run \"Add a GET /health endpoint\"", "dim"),
          ("5 AI agents plan, code, test, challenge, and review.", "txt"),
          ("Hermetic sandbox. Your working tree is never touched.", "txt"),
          ("BYOK: Anthropic · OpenAI · Google · Ollama.", "txt")], "ok"),
        ("You describe. Niki builds.",
         "Natural language in, a git branch out — not a code snippet to babysit.",
         [("$ niki run \"Add auth middleware\" --project ./api", "dim"),
          ("Niki reads the task and ranked context files.", "planner"),
          ("It emits a TaskSpec — no code written yet.", "planner"),
          ("You stay in control; the branch is yours to merge.", "txt")], "planner"),
        ("Five agents. One pipeline.",
         "Each agent has a bounded job and a typed handoff.",
         [("◈ Planner   reads task, emits TaskSpec", "planner"),
          ("⟠ Coder     applies unified diff in sandbox", "coder"),
          ("◉ Tester    reasons about tests vs the diff", "tester"),
          ("✗ Red       adversarial challenges (never approves)", "red"),
          ("◆ Reviewer  weighs Coder vs Red, approves", "reviewer")], "reviewer"),
        ("The diff, not a screenshot.",
         "Every run lands on a reviewable branch with full context.",
         [("⎇ branch: niki/add-health-endpoint", "ok"),
          ("src/routes/health.ts | 12 ++++++++++++", "txt"),
          ("+ export async function health() {", "txt"),
          ("+   return { status: 'ok', uptime }", "txt"),
          ("1 file changed, 12 insertions(+)", "txt")], "ok"),
        ("Auditable by design.",
         "report.md + artifacts/*.json capture every agent decision.",
         [("✓ run complete — reviewable pull request ready", "ok"),
          ("red challenges: 2 raised · 2 resolved", "txt"),
          ("test coverage: 100% of new code", "txt"),
          ("status: APPROVED", "ok")], "ok"),
        ("Hermetic. Bring-your-own-key. Open source.",
         "Safe to run, free to self-host, no lock-in.",
         [("⛉ Podman/Docker sandbox isolates every run", "sec"),
          ("🔑 Anthropic · OpenAI · Google · Ollama", "txt"),
          ("⬡ MIT/BUSL · self-hosted, no vendor lock-in", "txt"),
          ("☁  Cloud beta (waitlist) coming soon", "warn")], "sec"),
    ]
    os.makedirs(OUT_DIR, exist_ok=True)
    for i, (title, sub, lines, accent) in enumerate(scenes, start=1):
        img = _gallery_frame(canvas, title, sub, lines, accent)
        path = os.path.join(OUT_DIR, f"gallery-{i}.png")
        img.save(path)
        print(f"  gallery-{i}.png: {os.path.getsize(path)//1024} KB")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    keys = [k for k in sys.argv[1:]] or list(CLIPS.keys())
    for key in keys:
        if key == "full":
            print("rendering full narrative demo ...")
            render_full()
        elif key == "thumbnail":
            print("rendering thumbnail ...")
            render_thumbnail()
        elif key == "gallery":
            print("rendering gallery frames ...")
            render_gallery()
        elif key in CLIPS:
            print(f"rendering {key} ...")
            render(key, CLIPS[key])
        else:
            print(f"unknown clip: {key}", file=sys.stderr)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Generate the Niki OG/social image (1200x630 PNG)."""

from PIL import Image, ImageDraw, ImageFont
import os

WIDTH, HEIGHT = 1200, 630
BG_COLOR = (247, 242, 234)  # #f7f2ea
TEXT_COLOR = (32, 29, 29)   # #201d1d
ACCENT_COLOR = (180, 140, 90)  # muted gold accent

TOOLS_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.path.join(TOOLS_DIR, "fonts")
OUTPUT_PATH = os.path.join(os.path.dirname(TOOLS_DIR), "public", "og-image.png")


def load_font(name, size):
    path = os.path.join(FONTS_DIR, name)
    return ImageFont.truetype(path, size)


def main():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Subtle border
    draw.rectangle([20, 20, WIDTH - 20, HEIGHT - 20], outline=ACCENT_COLOR, width=2)

    # Wordmark
    wordmark_font = load_font("JetBrainsMono-Bold.ttf", 96)
    wordmark = "Niki"
    bbox = draw.textbbox((0, 0), wordmark, font=wordmark_font)
    tw = bbox[2] - bbox[0]
    x = (WIDTH - tw) // 2
    draw.text((x, 160), wordmark, fill=TEXT_COLOR, font=wordmark_font)

    # Tagline
    tag_font = load_font("JetBrainsMono-Medium.ttf", 36)
    tagline = "AI coding agents that ship reviewable pull requests"
    bbox = draw.textbbox((0, 0), tagline, font=tag_font)
    tw = bbox[2] - bbox[0]
    x = (WIDTH - tw) // 2
    draw.text((x, 310), tagline, fill=TEXT_COLOR, font=tag_font)

    # Sub-tagline
    sub_font = load_font("JetBrainsMono-Regular.ttf", 24)
    sub = "Hermetic multi-agent system · Open source · Self-hosted"
    bbox = draw.textbbox((0, 0), sub, font=sub_font)
    tw = bbox[2] - bbox[0]
    x = (WIDTH - tw) // 2
    draw.text((x, 380), sub, fill=(120, 110, 100), font=sub_font)

    # URL
    url_font = load_font("JetBrainsMono-Regular.ttf", 28)
    url = "niki-site.vercel.app"
    bbox = draw.textbbox((0, 0), url, font=url_font)
    tw = bbox[2] - bbox[0]
    x = (WIDTH - tw) // 2
    draw.text((x, 480), url, fill=ACCENT_COLOR, font=url_font)

    img.save(OUTPUT_PATH, "PNG")
    print(f"Saved OG image to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()

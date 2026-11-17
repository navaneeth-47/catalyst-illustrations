#!/usr/bin/env python3
"""Measure how much of an illustration is Primary-Blue (#2A65F0).

Usage: python3 tools/primary_share.py screenshot.png [--tol 40]

Reports Primary pixels as a % of the whole canvas and of the "artwork",
meaning every pixel that is not plain white background. Target: <= 8% of artwork.
Requires Pillow (pip install pillow).
"""
import sys
from PIL import Image

PRIMARY = (0x2A, 0x65, 0xF0)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    path = sys.argv[1]
    tol = int(sys.argv[sys.argv.index("--tol") + 1]) if "--tol" in sys.argv else 40
    img = Image.open(path).convert("RGB")
    px = list(img.getdata())
    total = len(px)
    near = lambda p, c, t: sum(abs(a - b) for a, b in zip(p, c)) <= t
    primary = sum(1 for p in px if near(p, PRIMARY, tol))
    art = sum(1 for p in px if not near(p, (255, 255, 255), 6))
    print(f"canvas : {primary / total * 100:5.2f}% Primary")
    print(f"artwork: {primary / max(art, 1) * 100:5.2f}% Primary  (target <= 8%)")


if __name__ == "__main__":
    main()

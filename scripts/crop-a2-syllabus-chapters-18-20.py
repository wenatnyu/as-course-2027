"""Create focused official syllabus excerpts for A2 Chapters 18 to 20."""

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Syllabus 2027-2029.pdf"
OUTPUT = ROOT / "public" / "syllabus"

# Printed page number and crop box in a 120 dpi (992 x 1403) render.
CROPS = {
    "23": (36, (88, 750, 905, 1280)),
    "24": (36, (88, 750, 905, 1280)),
    "25": (37, (88, 140, 905, 1000)),
    "26": (37, (88, 140, 905, 1000)),
    "27": (37, (88, 1010, 905, 1330)),
    "28": (38, (88, 140, 905, 1065)),
    "29": (38, (88, 1060, 905, 1360)),
}


def main() -> None:
    document = pdfium.PdfDocument(SOURCE)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    rendered: dict[int, Image.Image] = {}
    for lesson, (page_number, box) in CROPS.items():
        if page_number not in rendered:
            page = document[page_number - 1]
            rendered[page_number] = page.render(scale=120 / 72).to_pil().convert("RGB")
            page.close()
        excerpt = rendered[page_number].crop(box)
        height = round(excerpt.height * 900 / excerpt.width)
        excerpt.resize((900, height), Image.Resampling.LANCZOS).save(
            OUTPUT / f"syllabus-a2-lesson-{lesson}.png", optimize=True
        )
        excerpt.close()
    for image in rendered.values():
        image.close()
    document.close()


if __name__ == "__main__":
    main()

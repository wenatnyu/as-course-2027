"""Create focused official syllabus excerpts for A2 Chapter 13 lessons."""

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Syllabus 2027-2029.pdf"
OUTPUT = ROOT / "public" / "syllabus"

# Printed page number and crop box in a 120 dpi (992 x 1403) render.
CROPS = {
    "01": (32, (88, 385, 905, 720)),
    "02": (32, (88, 700, 905, 1135)),
    "03": (32, (88, 700, 905, 1135)),
    "04": (33, (88, 120, 905, 525)),
    "05": (33, (88, 120, 905, 525)),
    "06": (33, (88, 120, 905, 525)),
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

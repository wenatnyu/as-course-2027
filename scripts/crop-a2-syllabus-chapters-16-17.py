"""Create focused official syllabus excerpts for A2 Chapters 16 and 17."""

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Syllabus 2027-2029.pdf"
OUTPUT = ROOT / "public" / "syllabus"

# Printed page number and crop box in a 120 dpi (992 x 1403) render.
CROPS = {
    "17": (35, (88, 140, 905, 720)),
    "18": (35, (88, 140, 905, 720)),
    "19": (35, (88, 140, 905, 720)),
    "20": (35, (88, 725, 905, 1130)),
    "21": (36, (88, 140, 905, 740)),
    "22": (36, (88, 140, 905, 740)),
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

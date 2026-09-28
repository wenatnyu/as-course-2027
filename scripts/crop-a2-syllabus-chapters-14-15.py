"""Create focused official syllabus excerpts for A2 Chapters 14 and 15."""

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Syllabus 2027-2029.pdf"
OUTPUT = ROOT / "public" / "syllabus"

# Printed page number and crop box in a 120 dpi (992 x 1403) render.
CROPS = {
    "07": (33, (88, 550, 905, 1000)),
    "08": (33, (88, 550, 905, 1000)),
    "09": (33, (88, 1015, 905, 1330)),
    "10": (33, (88, 550, 905, 1330)),
    "11": (34, (88, 125, 905, 610)),
    "12": (34, (88, 125, 905, 610)),
    "13": (34, (88, 125, 905, 610)),
    "14": (34, (88, 610, 905, 1120)),
    "15": (34, (88, 610, 905, 1120)),
    "16": (34, (88, 610, 905, 1120)),
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

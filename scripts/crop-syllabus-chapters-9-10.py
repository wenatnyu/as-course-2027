"""Create readable syllabus excerpts for AS Lessons 41–51.

The source pages are rendered at 120 dpi before each relevant syllabus block
is cropped and normalised to a consistent 900 px width.
"""

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Syllabus 2027-2029.pdf"
OUTPUT = ROOT / "public" / "syllabus"

# PDF page number, then crop box in a 120 dpi (992 x 1403) render.
CROPS = {
    "41": (27, (88, 440, 905, 715)),
    "42": (27, (88, 440, 905, 1045)),
    "43": (27, (88, 735, 905, 1285)),
    "44": (28, (88, 135, 905, 335)),
    "45": (28, (88, 320, 905, 655)),
    "46": (28, (88, 655, 905, 920)),
    "47": (28, (88, 655, 905, 920)),
    "48": (28, (88, 655, 905, 920)),
    "49": (28, (88, 915, 905, 1145)),
    "50": (29, (88, 135, 905, 465)),
    "51": (29, (88, 135, 905, 465)),
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
            OUTPUT / f"syllabus-lesson-{lesson}.png", optimize=True
        )
        excerpt.close()
    for image in rendered.values():
        image.close()
    document.close()


if __name__ == "__main__":
    main()

"""Create the two authorised classroom coursebook extracts used by Lessons 10–11.

The source PDF is image based. Printed coursebook pages are offset by seven
pages inside the file, so printed pp.41–47 are PDF pages 48–54 and printed
pp.50–58 are PDF pages 57–65. The original page artwork is preserved in each
PDF; separate WebP renders make the pages reliable in browsers and on phones.
"""

from __future__ import annotations

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image
from pypdf import PdfReader, PdfWriter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Textbook" / "Computer Science for Cambridge lnternational AS & A Level.pdf"

LESSONS = {
    "10": {"printed": "41–47", "pdf_start": 48, "pdf_end": 54, "title": "IP addressing, URLs and DNS"},
    "11": {"printed": "50–58", "pdf_start": 57, "pdf_end": 65, "title": "Hardware roles, embedded systems and storage"},
}


def render_for_web(pdf_path: Path, target_dir: Path) -> None:
    target_dir.mkdir(parents=True, exist_ok=True)
    document = pdfium.PdfDocument(pdf_path)
    for index in range(len(document)):
        page = document[index]
        image = page.render(scale=1.7).to_pil().convert("RGB")
        image.save(target_dir / f"page-{index + 1:02d}.webp", "WEBP", quality=88, method=6)
        page.close()
    document.close()


def compact_pdf_from_renders(target_dir: Path, pdf_path: Path) -> None:
    """Replace the large scan extract with a classroom-quality compact PDF."""
    images = [Image.open(path).convert("RGB") for path in sorted(target_dir.glob("page-*.webp"))]
    images[0].save(
        pdf_path,
        "PDF",
        save_all=True,
        append_images=images[1:],
        resolution=144,
        quality=84,
        optimize=True,
    )
    for image in images:
        image.close()


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(SOURCE)

    reader = PdfReader(SOURCE)
    pdf_dir = ROOT / "public" / "textbook"
    render_dir = pdf_dir / "rendered"
    pdf_dir.mkdir(parents=True, exist_ok=True)

    for lesson, spec in LESSONS.items():
        writer = PdfWriter()
        for page_number in range(spec["pdf_start"], spec["pdf_end"] + 1):
            writer.add_page(reader.pages[page_number - 1])
        writer.add_metadata({
            "/Title": f"Lesson {lesson} coursebook reading: {spec['title']}",
            "/Subject": f"Classroom extract, printed coursebook pages {spec['printed']}",
        })
        output = pdf_dir / f"lesson-{lesson}.pdf"
        with output.open("wb") as file_handle:
            writer.write(file_handle)
        lesson_render_dir = render_dir / f"lesson-{lesson}"
        render_for_web(output, lesson_render_dir)
        compact_pdf_from_renders(lesson_render_dir, output)


if __name__ == "__main__":
    main()

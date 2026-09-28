"""Create authorised classroom coursebook extracts for A2 Chapters 14 and 15."""

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image
from pypdf import PdfReader, PdfWriter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Textbook" / "Computer Science for Cambridge lnternational AS & A Level.pdf"
LESSONS = {
    "07": range(331, 336),
    "08": range(335, 338),
    "09": range(330, 332),
    "10": range(329, 340),
    "11": range(340, 344),
    "12": range(344, 347),
    "13": range(346, 348),
    "14": range(356, 360),
    "15": range(351, 357),
    "16": range(340, 363),
}


def render_for_web(pdf_path: Path, target_dir: Path) -> None:
    target_dir.mkdir(parents=True, exist_ok=True)
    for stale_page in target_dir.glob("page-*.webp"):
        stale_page.unlink()
    document = pdfium.PdfDocument(pdf_path)
    for index in range(len(document)):
        page = document[index]
        image = page.render(scale=1.7).to_pil().convert("RGB")
        image.save(target_dir / f"page-{index + 1:02d}.webp", "WEBP", quality=88, method=6)
        page.close()
    document.close()


def compact_pdf(target_dir: Path, pdf_path: Path) -> None:
    images = [Image.open(path).convert("RGB") for path in sorted(target_dir.glob("page-*.webp"))]
    images[0].save(pdf_path, "PDF", save_all=True, append_images=images[1:], resolution=144, quality=84, optimize=True)
    for image in images:
        image.close()


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(SOURCE)
    reader = PdfReader(SOURCE)
    pdf_dir = ROOT / "public" / "textbook" / "a2"
    render_dir = ROOT / "public" / "textbook" / "rendered" / "a2"
    pdf_dir.mkdir(parents=True, exist_ok=True)
    for lesson, page_range in LESSONS.items():
        pages = list(page_range)
        writer = PdfWriter()
        for printed_page in pages:
            writer.add_page(reader.pages[printed_page + 6])
        writer.add_metadata({"/Title": f"A2 Lesson {lesson} coursebook reading", "/Subject": "Authorised classroom extract"})
        output = pdf_dir / f"lesson-{lesson}.pdf"
        with output.open("wb") as file_handle:
            writer.write(file_handle)
        lesson_render_dir = render_dir / f"lesson-{lesson}"
        render_for_web(output, lesson_render_dir)
        compact_pdf(lesson_render_dir, output)


if __name__ == "__main__":
    main()

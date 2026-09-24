"""Create authorised classroom coursebook extracts for AS Chapters 1–4.

The source PDF is image based and printed page numbers are seven behind the
PDF page numbers. Some lessons intentionally draw on non-contiguous pages;
their extracts keep those pages in the same order as the lesson references.
"""

from __future__ import annotations

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image
from pypdf import PdfReader, PdfWriter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Textbook" / "Computer Science for Cambridge lnternational AS & A Level.pdf"

LESSONS = {
    "01": {"pages": range(3, 7), "title": "Number systems"},
    "02": {"pages": range(6, 9), "title": "Data capacity and prefixes"},
    "03": {"pages": range(8, 15), "title": "Signed binary, BCD and arithmetic"},
    "04": {"pages": range(14, 21), "title": "Characters and bitmap graphics"},
    "05": {"pages": range(17, 22), "title": "Vector graphics and sound"},
    "06": {"pages": range(21, 24), "title": "Compression"},
    "07": {"pages": range(26, 39), "title": "Network models and LAN hardware"},
    "08": {"pages": [32, 33, 34, 35, 39], "title": "Cloud, wired/wireless and media"},
    "09": {"pages": range(36, 42), "title": "Ethernet, streaming and internet infrastructure"},
    "10": {"pages": range(41, 48), "title": "IP addressing, URLs and DNS"},
    "11": {"pages": range(50, 59), "title": "Hardware roles, embedded systems and storage"},
    "12": {"pages": range(53, 55), "title": "Primary memory and ROM families"},
    "13": {"pages": range(55, 64), "title": "Storage and peripheral operations"},
    "14": {"pages": range(112, 115), "title": "Monitoring and control"},
    "15": {"pages": range(66, 72), "title": "Logic gates and truth tables"},
    "16": {"pages": range(71, 76), "title": "Logic circuits and expressions"},
    "17": {"pages": range(80, 84), "title": "Von Neumann architecture and registers"},
    "18": {"pages": range(83, 87), "title": "System buses, performance and ports"},
    "19": {"pages": range(87, 91), "title": "Fetch-execute cycle and interrupts"},
    "20": {"pages": range(91, 101), "title": "Assembly language and instruction groups"},
    "21": {"pages": [94, 98], "title": "Addressing modes and effective addresses"},
    "22": {"pages": range(95, 98), "title": "The two-pass assembler"},
    "23": {"pages": range(98, 107), "title": "Tracing assembly programs"},
    "24": {"pages": [101, 102, *range(115, 121)], "title": "Binary shifts and bit masking"},
}


def page_label(pages: list[int]) -> str:
    runs: list[str] = []
    start = previous = pages[0]
    for page in pages[1:] + [pages[-1] + 2]:
        if page == previous + 1:
            previous = page
            continue
        runs.append(str(start) if start == previous else f"{start}–{previous}")
        start = previous = page
    return ", ".join(runs)


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
        printed_pages = list(spec["pages"])
        writer = PdfWriter()
        for printed_page in printed_pages:
            writer.add_page(reader.pages[printed_page + 6])
        writer.add_metadata({
            "/Title": f"Lesson {lesson} coursebook reading: {spec['title']}",
            "/Subject": f"Classroom extract, printed coursebook pages {page_label(printed_pages)}",
        })
        output = pdf_dir / f"lesson-{lesson}.pdf"
        with output.open("wb") as file_handle:
            writer.write(file_handle)
        lesson_render_dir = render_dir / f"lesson-{lesson}"
        render_for_web(output, lesson_render_dir)
        compact_pdf_from_renders(lesson_render_dir, output)


if __name__ == "__main__":
    main()

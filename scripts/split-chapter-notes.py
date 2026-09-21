"""Split the supplied two-column ZNotes PDFs into syllabus-chapter PDFs.

Boundary pages are divided by column and heading position so adjacent chapters
do not inherit a full page of unrelated material. Original page content and
copyright notices are preserved without rewriting or extracting the notes.
"""

from __future__ import annotations

from copy import copy
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = Path("/Users/wen/Downloads")


def whole(page_number: int) -> tuple[int, None]:
    return (page_number, None)


def region(page_number: int, x0: float, top: float, x1: float, bottom: float) -> tuple[int, tuple[float, float, float, float]]:
    return (page_number, (x0, top, x1, bottom))


SPECS = {
    "as-theory": {
        "source": DOWNLOADS / "CAIE - AS Level - Computer Science.pdf",
        "chapters": {
            1: [whole(2), whole(3), region(4, 0, 0, 298, 842), region(4, 298, 0, 596, 225)],
            2: [region(4, 298, 225, 596, 842), whole(5), whole(6), whole(7), region(8, 0, 0, 298, 842), region(8, 298, 0, 596, 246)],
            3: [region(8, 298, 246, 596, 842), whole(9), whole(10), region(11, 0, 0, 298, 842), region(11, 298, 0, 596, 672)],
            4: [region(11, 298, 672, 596, 842), whole(12), whole(13), whole(14), region(15, 0, 0, 298, 842), region(15, 298, 0, 596, 347)],
            5: [region(15, 298, 347, 596, 842), whole(16), region(17, 0, 0, 298, 842), region(17, 298, 0, 596, 444)],
            6: [region(17, 298, 444, 596, 842), whole(18), region(19, 0, 0, 298, 665)],
            7: [region(19, 0, 665, 298, 842), region(19, 298, 0, 596, 842), region(20, 0, 0, 298, 842), region(20, 298, 0, 596, 275)],
            8: [region(20, 298, 275, 596, 842), whole(21), whole(22), whole(23)],
        },
    },
    "as-practical": {
        "source": DOWNLOADS / "CAIE - AS Level - Computer Science-2.pdf",
        "chapters": {
            9: [region(2, 0, 0, 298, 842), region(2, 298, 0, 596, 553)],
            10: [region(2, 298, 553, 596, 842), whole(3), region(4, 0, 0, 298, 842), region(4, 298, 0, 596, 670)],
            11: [region(4, 298, 670, 596, 842), whole(5), region(6, 0, 0, 298, 83)],
            12: [region(6, 0, 83, 298, 842), region(6, 298, 0, 596, 842), whole(7), whole(8)],
        },
    },
    "a2-theory": {
        "source": DOWNLOADS / "CAIE - A2 Level - Computer Science.pdf",
        "chapters": {
            13: [whole(2), region(3, 0, 0, 298, 842), region(3, 298, 0, 596, 279)],
            14: [region(3, 298, 279, 596, 842), region(4, 0, 0, 298, 842), region(4, 298, 0, 596, 292)],
            15: [region(4, 298, 292, 596, 842), whole(5), whole(6), whole(7), region(8, 0, 0, 298, 82)],
            16: [region(8, 0, 82, 298, 842), region(8, 298, 0, 596, 842), region(9, 0, 0, 298, 605)],
            17: [region(9, 0, 605, 298, 842), region(9, 298, 0, 596, 842), region(10, 0, 0, 298, 631)],
            18: [region(10, 0, 631, 298, 842), region(10, 298, 0, 596, 842), whole(11)],
        },
    },
}


def add_segment(writer: PdfWriter, source_page, crop):
    page = copy(source_page)
    if crop is not None:
        x0, top, x1, bottom = crop
        page_height = float(page.mediabox.height)
        box = RectangleObject((x0, page_height - bottom, x1, page_height - top))
        page.mediabox = box
        page.cropbox = box
        page.trimbox = box
    writer.add_page(page)


def main() -> None:
    for collection, spec in SPECS.items():
        source = spec["source"]
        if not source.exists():
            raise FileNotFoundError(source)
        reader = PdfReader(source)
        target_dir = ROOT / "public" / "notes" / collection
        target_dir.mkdir(parents=True, exist_ok=True)
        for chapter, segments in spec["chapters"].items():
            writer = PdfWriter()
            for page_number, crop in segments:
                add_segment(writer, reader.pages[page_number - 1], crop)
            writer.add_metadata({
                "/Title": f"Cambridge 9618 Chapter {chapter} notes",
                "/Subject": f"Chapter {chapter} extract from supplied ZNotes study notes",
            })
            output = target_dir / f"chapter-{chapter:02d}.pdf"
            with output.open("wb") as file_handle:
                writer.write(file_handle)


if __name__ == "__main__":
    main()

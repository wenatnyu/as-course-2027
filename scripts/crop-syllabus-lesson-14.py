"""Create the complete syllabus excerpt used on AS Lesson 14."""

from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Syllabus 2027-2029.pdf"
OUTPUT = ROOT / "public" / "syllabus" / "syllabus-lesson-14.png"

# Page 17 at 120 dpi. This box contains only the complete monitoring/control row.
BOX = (88, 1190, 905, 1365)

document = pdfium.PdfDocument(SOURCE)
page = document[16]
rendered = page.render(scale=120 / 72).to_pil().convert("RGB")
excerpt = rendered.crop(BOX)
height = round(excerpt.height * 1015 / excerpt.width)
excerpt.resize((1015, height), Image.Resampling.LANCZOS).save(OUTPUT, optimize=True)
excerpt.close()
rendered.close()
page.close()
document.close()

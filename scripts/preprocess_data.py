from PIL import Image
import fitz
import pathlib
import sys

ROOT = pathlib.Path(__file__).parent
DATA_DIR = ROOT / "data"
OUTPUT_DIR = ROOT / "output"


def compress_to_webp(input_folder, output_folder, quality):
    images = list(input_folder.glob("*.png"))

    for i in images:
        output_path = output_folder / i.with_suffix(".webp").name

        with Image.open(i) as img:
            img.save(output_path, format="WEBP", method=6, quality=quality)


def pdf_to_images(input_file, output_folder):
    doc = fitz.open(input_file)

    for i in range(len(doc)):
        page = doc.load_page(i)

        mat = fitz.Matrix(2, 2)
        pix = page.get_pixmap(matrix=mat)

        pix.save(output_folder / f"page_{i + 1:02d}.png")

    doc.close()


def split_images(input_folder, output_folder):
    images = list(input_folder.glob("*.webp"))

    page_counter = 1

    for i in images:
        with Image.open(i) as img:
            height = img.size[1]
            width = img.size[0]

            mid = width // 2

            left_page = img.crop((0, 0, mid, height))
            right_page = img.crop((mid, 0, width, height))

            left_page.save(output_folder / f"page_{page_counter:02d}.webp")
            right_page.save(output_folder / f"page_{page_counter + 1:02d}.webp")

            page_counter += 2


def main():
    input_file = DATA_DIR / "walvis-in-de-tuin.pdf"

    if not input_file.exists():
        print("Missing file:", input_file)
        sys.exit(1)

    compressed_dir = OUTPUT_DIR / "compressed"
    extracted_dir = OUTPUT_DIR / "extracted"
    splitted_dir = OUTPUT_DIR / "splitted"

    subfolders = [compressed_dir, extracted_dir, splitted_dir]

    for f in subfolders:
        f.mkdir(exist_ok=True, parents=True)

    pdf_to_images(input_file, extracted_dir)
    compress_to_webp(extracted_dir, compressed_dir, 75)
    split_images(compressed_dir, splitted_dir)


if __name__ == "__main__":
    main()

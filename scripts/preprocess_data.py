from PIL import Image
from PIL import ImageFilter
import fitz
import numpy as np
import pathlib
import sys

ROOT = pathlib.Path(__file__).parent
DATA_DIR = ROOT / "data"
OUTPUT_DIR = ROOT / "output"


def apply_gutter(input_folder, output_folder, noise_intensity):
    images = list(input_folder.glob("*.webp"))

    is_left_page = True
    max_alpha = 0.35

    for i in images:
        with Image.open(i).convert("RGBA") as img:
            height = img.size[1]
            width = img.size[0]

            alpha_map = np.zeros((height, width), dtype=np.float32)

            if is_left_page:
                gutter_width = int(width * 0.08)
                line = np.linspace(0, 1, gutter_width)
                gradient = np.power(line, 2) * max_alpha
                alpha_map[:, width - gutter_width :] = gradient
            else:
                gutter_width = int(width * 0.15)
                line = np.linspace(1, 0, gutter_width)
                gradient = np.power(line, 2) * (max_alpha * 0.8)
                alpha_map[:, :gutter_width] = gradient

            noise = np.random.uniform(1 - noise_intensity, 1 + noise_intensity, (height, width))
            alpha_map = np.clip(alpha_map * noise, 0, 1)

            alpha_bytes = (alpha_map * 255).astype(np.uint8)
            overlay_data = np.zeros((height, width, 4), dtype=np.uint8)
            overlay_data[:, :, 3] = alpha_bytes

            gutter_overlay = Image.fromarray(overlay_data, "RGBA")
            gutter_overlay = gutter_overlay.filter(ImageFilter.GaussianBlur(radius=3))

            output_path = output_folder / i.name

            Image.alpha_composite(img, gutter_overlay).convert("RGB").save(output_path)

        is_left_page = not is_left_page


def compress_to_webp(input_folder, output_folder, quality):
    images = list(input_folder.glob("*.png"))

    for i in images:
        output_path = output_folder / i.with_suffix(".webp").name

        with Image.open(i) as img:
            img.save(output_path, "WEBP", method=6, quality=quality)


def pdf_to_images(input_file, output_folder):
    doc = fitz.open(input_file)

    for i in range(len(doc)):
        page = doc.load_page(i)

        mat = fitz.Matrix(2, 2)
        pix = page.get_pixmap(mat)

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
    guttered_dir = OUTPUT_DIR / "guttered"
    splitted_dir = OUTPUT_DIR / "splitted"

    subfolders = [compressed_dir, extracted_dir, guttered_dir, splitted_dir]

    for f in subfolders:
        f.mkdir(exist_ok=True, parents=True)

    pdf_to_images(input_file, extracted_dir)
    compress_to_webp(extracted_dir, compressed_dir, 75)
    split_images(compressed_dir, splitted_dir)
    apply_gutter(splitted_dir, guttered_dir, 0.12)


if __name__ == "__main__":
    main()

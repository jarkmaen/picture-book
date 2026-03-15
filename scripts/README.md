# Scripts

Instructions for preparing the data. The preprocess_data.py script processes the raw PDF spreads into optimized WebP images that can be used as assets in the application. Input files are stored in the data folder and the processed output files are written to the output folder.

## Setup

To run the following commands below, you'll need to have [Python](https://www.python.org/) installed on your computer. Open your terminal in this directory and run:

```
# Create virtual environment
$ python -m venv venv

# Activate venv
$ source venv/bin/activate

# Install dependencies
$ pip install pillow pymupdf

# Run data preprocessing script
$ python preprocess_data.py
```

This will create the output folder with three folders inside it:

- `compressed`: Contains the PNG files converted to WebP to reduce file size.
- `extracted`: Contains the raw spreads extracted from the PDF as PNG files.
- `splitted`: Contains the final output where each WebP spread is cut down the middle into two individual pages.

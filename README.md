
# Node Product Scraper

A lightweight Node.js project to scrape product data from a website and save cleaned output to JSON. The project provides a simple, modular scraper plus a data processor so results are easy to inspect, extend, and reuse.

## Table of contents
- [Overview](#overview)
- [Features](#features)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Output](#output)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository contains a small Node.js scraper that extracts product information from a target website, performs basic processing and normalization, and writes the results to `data/products.json`.

The code is intentionally modular so you can replace the scraping selectors, add new processors, or integrate the output into another pipeline.

## Features

- Modular scraper implementation (`src/scraper.js`).
- Data transformation and normalization (`src/dataProcessor.js`).
- Utility helpers in `src/utils.js` for re-usable functionality.
- Simple entry point in `src/index.js` to run the full flow.

## Getting started

Prerequisites:

- Node.js (14+ recommended)

Install dependencies:

```bash
npm install
```

Run the scraper:

```bash
node src/index.js
```

If you prefer an npm script, add one to `package.json` such as:

```json
"scripts": {
	"start": "node src/index.js"
}
```

## Usage

- Edit the target URL or selectors in `src/index.js` / `src/scraper.js` to point at the page you want to scrape.
- Run the script (see Getting started). The process fetches pages, extracts product fields, processes them, and writes the JSON output.

## Project structure

- `src/` — source code
	- `index.js` — entry point that orchestrates scraping and processing
	- `scraper.js` — HTTP requests and DOM parsing
	- `dataProcessor.js` — transforms and validates scraped items
	- `utils.js` — shared helper functions
- `data/` — sample and output data
	- `products.json` — example output produced by the scraper
- `package.json` — project metadata and dependencies

## Configuration

- The simplest way to configure scraping is to edit `src/index.js` and `src/scraper.js` to set the target URL and CSS selectors used to extract product fields.
- For production use, consider moving configuration into environment variables or a separate `config.json`.

## Output

Scraped and processed product data is written to `data/products.json` by default. Each item should contain normalized fields such as `title`, `price`, `currency`, `sku`, `url`, and `timestamp`.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request with a clear description of the change and why it's useful. Keep changes focused and add tests where appropriate.

## License

This project is released under the MIT License. See the `LICENSE` file for details (or add one if needed).


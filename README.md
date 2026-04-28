# gh-printer

> Print GitHub Markdown exactly as it appears on GitHub.

A Chrome extension that prints GitHub Markdown pages with correct formatting, preserving diagrams, notebooks, and light-mode styles.

## Features

- Prints GitHub Markdown with proper formatting
- Supports Mermaid diagrams (waits for render, removes control panels)
- Supports Jupyter notebooks (waits for full render)
- Forces light mode for print-friendly output
- Normalizes heading anchors for correct internal links
- Available via toolbar button or right-click context menu

## Installation

1. Run `npm run build` to build the extension into `dist/`
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode**
4. Click **Load unpacked** and select the `dist/` folder

## Development

```sh
npm install
npm run dev       # watch mode
npm run build     # production build
npm run typecheck
```

## Usage

Navigate to any GitHub Markdown page (github.com or gist.github.com) and either:

- Click the **gh-printer** icon in the toolbar, or
- Right-click and select **Print GitHub Markdown**

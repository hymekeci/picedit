# Picedit

**Make your screenshots beautiful.**

Free, open-source screenshot beautifier. Add gradient backgrounds, device frames, and shadows. Export for Twitter, LinkedIn, Instagram, or your blog. No signup, no watermark, no limits. 100% private — everything runs in your browser.

## Features

- **Gradient backgrounds** — 16 handpicked gradient presets + 14 solid colors
- **Device frames** — Browser window, MacBook, dark/light window chrome
- **Adjustable controls** — Padding, border radius, shadow intensity
- **Social media presets** — Twitter, LinkedIn, Instagram, Facebook, Dribbble, Product Hunt
- **High-res export** — 1x, 2x, 3x PNG export
- **Copy to clipboard** — Paste directly into Slack, Notion, or Twitter
- **Privacy first** — Zero network requests. Images never leave your device.
- **Clipboard paste** — Paste screenshots directly with Ctrl+V / Cmd+V
- **Drag & drop** — Drop your image file onto the page
- **Keyboard shortcuts** — Cmd+S download, Cmd+Shift+C copy, Esc reset
- **Retina ready** — Crisp preview on high-DPI displays

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) — Pixel-perfect rendering
- TypeScript — Type safety throughout

Zero runtime dependencies beyond React and Next.js. Bundle size: ~94kB first load.

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
git clone https://github.com/hymekeci/picedit.git
cd picedit
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## Deployment

### Cloudflare Pages (Recommended — free)

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub repository
4. Build command: `npm run build`
5. Output directory: `out`
6. Deploy

### Alternative: GitHub Pages (free)

1. Run `npm run build`
2. Deploy the `out/` folder via GitHub Pages settings

### Custom Domain

Buy `picedit.app` (or similar) from Cloudflare Registrar (~$14/year) and point it to your Cloudflare Pages deployment.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main page with keyboard shortcuts
│   └── globals.css         # Global styles + CSS variables
├── components/
│   ├── Header.tsx          # Top navigation bar
│   ├── UploadZone.tsx      # Drag & drop / paste / file picker
│   ├── Canvas.tsx          # Live canvas preview (RAF-throttled)
│   ├── Controls.tsx        # Sidebar controls + copy/export
│   └── Footer.tsx          # Landing page footer with features
└── lib/
    ├── renderer.ts         # Core canvas rendering engine
    ├── gradients.ts        # Gradient preset definitions
    ├── frames.ts           # Device frame drawing (scale-aware)
    └── constants.ts        # Shared types, defaults, URLs
```

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Cmd/Ctrl + V | Paste image from clipboard |
| Cmd/Ctrl + S | Download PNG |
| Cmd/Ctrl + Shift + C | Copy to clipboard |
| Escape | Start over |

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

## Support

If you find Picedit useful, consider [buying me a coffee](https://buymeacoffee.com/picedit). It helps keep this project free and maintained.

## License

MIT License — see [LICENSE](LICENSE) for details.

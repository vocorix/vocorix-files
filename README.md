# Vocorix website

Premium multi-page marketing site for Vocorix, focused on voice AI, workflow orchestration, and system integrations.

## Pages and shared assets
- `index.html` — homepage and open-core 3D hero
- `services.html` — capabilities and use cases
- `process.html` — delivery approach
- `contact.html` — contact and next steps
- `style.css` — shared visual system and responsive layouts
- `app.js` — shared navigation, CTA handling, reduced-motion-aware reveals, and Three.js open-core animation
- `public/favicon.svg` — browser favicon
- `public/brand/` — logo variations

## Local development
```bash
npm install
npm run dev
```

## Build / Vercel
```bash
npm run build
```

Vite builds the four HTML pages into `dist/`. `vercel.json` enables clean URLs (/services instead of /services.html). Use `npm run build` as the build command and `dist` as the output directory.

## Before launch
- Confirm the demo phone number is correct and approved for public use.
- Replace the temporary email-based booking fallback with a dedicated scheduling URL when available.
- Public contact email is `swastik@vocorix.com`; confirm the mailbox is provisioned with your email provider before launch.
- Add official company social URLs if/when they exist. Unsupported customer metrics are not displayed in the current copy.

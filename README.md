# Vokero website

Static multi-page marketing site for Vokero.

## Pages and shared assets
- `index.html` — homepage
- `services.html` — services
- `process.html` — delivery process
- `contact.html` — contact
- `style.css` — shared visual design
- `app.js` — shared navigation, CTAs, and optional Three.js hero animation

## Local development
```bash
npm install
npm run dev
```

## Build / Vercel
```bash
npm run build
```

Vite is configured to build all four HTML pages into `dist/`. In Vercel, use the Vite framework preset, `npm run build` as the build command, and `dist` as the output directory.

## Before launch
Update the placeholder Cal.com URL and LinkedIn/X/Instagram URLs in `app.js`. Verify that the demo phone number, email address, customer claims, and performance metrics are accurate before publishing.

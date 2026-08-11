# Rubel Hosen Portfolio

Production structure:

- `index.html` — page markup and structured data
- `assets/css/site.css` — visual system and responsive styles
- `assets/js/site.js` — navigation, restrained motion and automatic experience-year counters
- `assets/img/profile.webp` — local profile photo used by the sidebar and structured data
- `assets/img/favicon.*` / `apple-touch-icon.png` — circular browser/device icons
- `assets/img/og-card.png` — social/SEO preview image
- `CNAME` — GitHub Pages custom domain
- `robots.txt` — crawler directives
- `sitemap.xml` — canonical sitemap
- `DEPLOY.md` — deployment/search checklist

The portfolio intentionally avoids animation-heavy UI. Motion is limited to:
- initial hero stagger
- one-time section reveals
- subtle project hover
- active navigation transitions
- small contact-arrow movement

`prefers-reduced-motion` is respected.

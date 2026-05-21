# Vision — Landing Page

The public marketing landing page for **Vision**, a modern creative marketplace where people can find creatives that match their vision — for content, branding, events, styling, photography, design, and more.

Built with **Vite + React + Tailwind CSS** (JavaScript, no TypeScript). No backend, no database, no auth — just a clean, mobile-first landing page ready for Vercel.

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Dev server opens at **http://localhost:5173**.

To verify the production build:
```bash
npm run build
npm run preview
```

---

## 🔗 Replace the App URL

Open **`src/App.jsx`** and change line 7:

```js
const APP_URL = "https://app.joinvision.app"
```

Replace with your Lovable / PWA URL, e.g. `https://your-app.lovable.app`. Every "Explore Creatives", "Become a Creative", and "Open Vision App" CTA uses this constant.

---

## 📦 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Vision landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vision-landing.git
git push -u origin main
```

---

## ☁️ Deploy to Vercel

1. Go to **https://vercel.com/new**
2. Import your `vision-landing` GitHub repo
3. Vercel auto-detects Vite — accept defaults:
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`
4. Click **Deploy**

In Settings → Domains, add `joinvision.app` and follow the DNS prompts.

---

## 📁 Project Structure

```
vision-landing/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── vercel.json
├── .gitignore
├── README.md
└── src/
    ├── App.jsx        ← all sections live here
    ├── main.jsx
    └── index.css
```

---

## 🎨 What's Included

10 sections, all in one App.jsx:

1. **Header** — sticky nav with Explore Creatives CTA
2. **Hero** — "find creatives that match your vision" with desktop aesthetic mosaic / mobile phone preview
3. **Creative Categories** — 8 disciplines (photo, video, styling, direction, makeup, branding, events, content)
4. **Discover Creatives** — 6 sample creator cards with portfolio previews
5. **Shared Vision** — aesthetic-based discovery with 6 mood columns
6. **How it Works** — tabbed (Hiring / Creating)
7. **App Showcase** — 3 phone mockups (Discover, Profile, Chat)
8. **For Creatives** — benefit list with portfolio mosaic
9. **Trust & Platform** — 8 platform feature cards
10. **PWA Install + Final CTA + Footer**

All images are CSS gradients with abstract SVG patterns — no external image dependencies, no broken links.

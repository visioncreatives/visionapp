# Vision — Landing Page

The public marketing landing page for **Vision**, a creator booking marketplace.

Built with Vite + React + Tailwind CSS. No backend, no database, no auth — just a clean, mobile-first landing page ready to deploy on Vercel.

---

## 🛠 Tech Stack

- **Vite** (React, JavaScript — no TypeScript)
- **Tailwind CSS**
- **No backend, no database, no external APIs**
- Mobile-first responsive design
- Vercel-ready file structure

---

## 🚀 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production (optional)
npm run build

# 4. Preview the production build (optional)
npm run preview
```

The dev server will be available at **http://localhost:5173**.

---

## 🔗 Replace Your Lovable / PWA App URL

All "Get Vision", "Join as a Creative", and "Open Vision App" buttons share a single constant.

Open **`src/App.jsx`** and update this line near the top:

```js
const APP_URL = "https://app.joinvision.app"
```

Replace it with your Lovable app or PWA URL, for example:

```js
const APP_URL = "https://your-app-name.lovable.app"
```

That's the only place you need to change — every CTA button on the page uses this constant.

---

## 📦 Push to GitHub

```bash
# Inside the project folder
git init
git add .
git commit -m "Initial commit: Vision landing page"

# Create a new empty repo on GitHub (no README, no .gitignore — keep it empty)
# Then connect and push:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vision-landing.git
git push -u origin main
```

---

## ☁️ Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Go to **https://vercel.com/new**
2. Click **Import** next to your `vision-landing` GitHub repo
3. Vercel auto-detects **Vite** — leave all defaults as-is:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**

That's it. Vercel will build and give you a live URL.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
# Follow the prompts
```

### Connect your custom domain

In Vercel → your project → **Settings → Domains** → add `joinvision.app` and follow the DNS instructions.

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
    ├── App.jsx        ← all sections live here (Header, Hero, Problem, How, Features, PWA, CTA, Footer)
    ├── main.jsx
    └── index.css
```

---

## 🎨 Design Notes

- Cream/beige backgrounds (`#F6EFE6`, `#FBF6EF`)
- Dark espresso primary buttons (`#3A2A20`)
- Soft peach + pink accents
- `Fraunces` display font + `Inter` body font
- All "images" are gradient mockup tiles — no broken image links, no external assets
- Sections: Header → Hero with phone mockup → Problem → How it Works (tabbed) → Features → PWA → Final CTA → Footer

---

## ✅ Production Checklist

- [x] No broken image links — all visuals are CSS gradients / SVG
- [x] No external APIs or backend calls
- [x] No reviews/testimonials section
- [x] Mobile-first responsive
- [x] All CTAs point to `APP_URL` constant
- [x] Builds cleanly with `npm run build`
- [x] Vercel-ready out of the box

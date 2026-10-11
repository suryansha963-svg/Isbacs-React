# ISBACS website (React)

React + Vite conversion of the ISBACS single-file site, plus an online library of
*Ecosecurity through Resource Governance* (Vol. I – 14 chapters, Vol. II – 13 chapters).

    npm install
    npm run dev      # local development
    npm run build    # static site in dist/ (works on GitHub Pages / Netlify; hash routing)

Routes: `/#/books` (library landing) → `/#/books/vol1` (volume) → `/#/books/vol1/chapter/3` (reader).
Chapter text lives in `src/data/vol1|vol2/chN.json` (one lazy-loaded file per chapter).
Add videos in `src/pages/Videos.jsx`; society pages are plain components in `src/pages/`.

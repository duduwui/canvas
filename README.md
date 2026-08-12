# Canvas Visual Frontend Editor

Canvas is a lightweight, framework-agnostic visual editing tool designed to overlay on any website frontend. By clicking a floating badge at the bottom-right of the page, it turns standard elements into editable blocks. 

Developers and designers can:
- **Hover & Highlight**: Trace element boundaries with neon-indigo outline guides.
- **Drag & Resize**: Move components relative to their flow or drag corner/edge handles to resize them.
- **Edit Text Content**: Change layout words either by double-clicking inline or using the Properties Panel text input.
- **Tweak CSS Styles**: Customize dimensions, typography, spacing (margins/padding), background colors, border radiuses, and shadows via a visual glassmorphic inspector.
- **Save, Export & Cancel**: Persist edits to `localStorage` (so they remain after page reloads), copy clean CSS overrides to paste in your codebase, or discard session drafts instantly to keep layouts safe.

---

## 🚀 How to Add Canvas to an Existing Project

You can install Canvas in any website project (WordPress, HTML/CSS, React, Vue, PHP, Webflow) in two ways:

### Option A: Using a Script Tag (Recommended for any project)
Simply copy the compiled standalone script from `dist/canvas.js` into your project directory and add it near the closing `</body>` tag of your HTML:

```html
<!-- Load the Canvas Editor Overlay -->
<script src="path/to/canvas.js"></script>
```

That's it! When you load your page, the floating "Canvas Mode" badge will automatically appear in the bottom-right corner.

### Option B: Importing in Bundled Projects (React, Vue, Vite, etc.)
1. Copy the `dist/canvas.es.js` or `dist/canvas.js` file into your source directory (e.g. `src/utils/canvas.js`).
2. Import it at the root entry point of your application (like `main.js`, `index.js`, or `App.jsx`):

```javascript
import './utils/canvas.js';
```

---

## 🛠️ Local Development & Contributing

If you want to clone this repository to modify the Canvas editor itself or test it locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/duduwui/canvas.git
cd canvas
```

### 2. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Run Development Server
Start the local server to run the interactive landing page playground:
```bash
npm run dev
```
*Open your browser and navigate to the printed URL (typically `http://localhost:5173/`).*

### 4. Build standalone script
To recompile your changes into the standalone production files:
```bash
npm run build
```
This updates two files in the `dist/` directory:
- `dist/canvas.js`: Self-executing IIFE bundle (ideal for `<script>` tags).
- `dist/canvas.es.js`: ES Module bundle (ideal for modern build chains).

---

## 🔍 How It Works Under the Hood

To prevent interfering with your host site's styling and layout, Canvas uses two modern browser patterns:
1. **Shadow DOM Isolation**: The Properties Panel, floating badge, highlighters, and modal overlays are loaded inside a shadow root (`#canvas-editor-root`). This guarantees that Canvas styles won't mess up your webpage's CSS, and your webpage's CSS won't alter the appearance of Canvas controls.
2. **Absolute Overlay Alignment**: When highlighting or selecting elements, Canvas queries the light DOM and draws the bounding frames exactly on top of them using calculated coordinates (`getBoundingClientRect()`). It does *not* inject wrappers or modify the host DOM structure, ensuring flexbox, grid layouts, and active event listeners do not break.

# 🖼️ Image Overlay Editor

A lightweight, **completely offline** image editor with drag-and-drop logo overlay, zoom controls, and export capabilities.

## ✨ Features

### 📷 Image Management
- **Upload Image** - Support for all standard image formats (PNG, JPG, WebP, etc.)
- **Responsive Canvas** - Automatically scales to fit your screen
- **Smart Sizing** - Images fit perfectly with proper aspect ratio handling

### 🎨 Logo Overlays
✅ **3 Preset Logos** - Quick-select options:
  - 🔵 Blue Circle
  - 🔴 Red Square
  - 🟢 Green Triangle
✅ **Custom Logo Upload** - Upload any PNG/JPG/WebP as your logo
✅ **Draggable Positioning** - Click and drag logo anywhere on the canvas
✅ **Full Controls**:
  - 📏 **Scale** - Resize from 10% to 200%
  - 👁️ **Opacity** - Adjust transparency 0%-100%
  - 🔄 **Rotation** - Rotate 0-360 degrees

### 🔍 View Controls
✅ **Zoom In/Out** - Zoom from 50% to 300%
✅ **Reset Zoom** - Quickly return to 100%
✅ **Real-time Zoom Display** - See current zoom level

### 💾 Export
✅ **One-Click Export** - Download as high-quality PNG
✅ **Full Composition** - Includes all layers in final image

### ⚡ Performance
✅ **No Server Required** - Runs entirely in your browser
✅ **Instant Loading** - Vite development server
✅ **Browser Caching** - Works offline (with PWA setup)
✅ **Fast Rendering** - Canvas-based with Konva.js

## 🚀 Getting Started

### Installation

```bash
cd /Users/taiaburrahman/Desktop/git/overlay
npm install
```

### Development

```bash
npm run dev
```

Opens automatically at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

Creates optimized `dist/` folder for deployment.

## 📁 Project Structure

```
overlay/
├── src/
│   ├── components/
│   │   ├── CanvasEditor.jsx       # Main canvas rendering
│   │   ├── CanvasEditor.css
│   │   ├── Toolbar.jsx             # Control panel (NEW: Logo options)
│   │   ├── Toolbar.css
│   │   ├── Logo.jsx                # Logo layer component
│   │   └── useImage.js             # Image loading hook
│   ├── App.jsx                     # State management (NEW: Logo upload)
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
│   ├── logo.svg                    # Default logo
│   ├── logo-blue.svg               # Preset: Blue Circle
│   ├── logo-red.svg                # Preset: Red Square
│   └── logo-green.svg              # Preset: Green Triangle
├── package.json
├── vite.config.js
├── index.html
└── .gitignore
```

## 🎯 How to Use

### 1. Upload an Image
- Click **"📤 Upload Image"** button in the toolbar
- Select any image file from your computer
- Image automatically scales to fit the canvas

### 2. Select or Upload a Logo
**Quick Presets:**
- Click any preset logo button:
  - "Blue Circle"
  - "Red Square"  
  - "Green Triangle"

**Custom Logo:**
- Click **"📁 Upload Custom Logo"** 
- Select your own PNG/JPG/WebP file
- Logo updates instantly

### 3. Position & Adjust Logo
- **Drag** - Click and drag logo to move it
- **Scale** - Use the Scale slider (0.1x - 2x)
- **Opacity** - Adjust transparency with Opacity slider
- **Rotate** - Adjust angle with Rotation slider (0-360°)

### 4. Zoom & View
- **Zoom In/Out** - See details or get overview
- **Reset Zoom** - Return to 100% view
- **Live Display** - Shows current zoom percentage

### 5. Export Your Work
- Click **"⬇️ Export Image"**
- PNG file automatically downloads
- Includes background + logo + all adjustments

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | Component framework |
| **Konva.js** | Canvas rendering & interactions |
| **react-konva** | React bindings for Konva |
| **Vite** | Build tool & dev server |
| **CSS3** | Styling & responsiveness |

## 🎨 Customization

### Add More Preset Logos
1. Create SVG file in `public/` directory
2. Add to `PRESET_LOGOS` array in `src/App.jsx`:
```jsx
const PRESET_LOGOS = [
  { id: 'blue', name: 'Blue Circle', path: '/logo-blue.svg' },
  { id: 'red', name: 'Red Square', path: '/logo-red.svg' },
  { id: 'green', name: 'Green Triangle', path: '/logo-green.svg' },
  { id: 'custom', name: 'Your Logo', path: '/your-logo.svg' }
]
```

### Change Default Logo
Edit `src/App.jsx`:
```jsx
const [currentLogo, setCurrentLogo] = useState('/logo-blue.svg')
```

### Adjust Canvas Dimensions
Edit `src/components/CanvasEditor.jsx`:
```jsx
const [stageSize, setStageSize] = useState({ 
  width: 1200,   // Your width
  height: 800    // Your height
})
```

### Modify Color Scheme
Edit `src/index.css`:
```css
:root {
  --primary: #your-color;
  --primary-hover: #darker-shade;
  /* ... other colors */
}
```

## 📱 Responsive Design

- **Desktop** (1024px+) - Full sidebar toolbar
- **Tablet** (768px-1024px) - Stack layout available
- **Mobile** - Optimized for smaller screens

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to your server
```

## 🔒 Privacy & Offline

✅ **Everything stays in your browser**
- No server uploads
- No cloud storage
- No tracking
- Works completely offline

## 🐛 Troubleshooting

**Logo not dragging?**
- Make sure image is uploaded first
- Logo appears in the center by default

**Export not working?**
- Check browser console for errors
- Ensure JavaScript is enabled
- Try different browser if issues persist

**View options not visible?**
- All controls are always visible in the sidebar
- Scroll down in toolbar to see more options

**Custom logo not showing?**
- Make sure file format is PNG/JPG/WebP
- File should be less than 10MB
- Supported formats: PNG, JPG, JPEG, WebP, GIF

## 📊 Recent Updates

### Version 1.1.0 - Logo Upload & Presets
✨ **NEW FEATURES:**
- Added 3 preset logo options (Blue, Red, Green)
- Custom logo upload functionality
- All controls now visible from the start
- Improved toolbar layout and organization

**FIXED:**
- View options are now always visible
- Better organization of controls
- Improved styling for preset buttons

## 📄 License

MIT - Use freely for personal and commercial projects

---

**Happy Editing! 🎉**
>>>>>>> f469e41 (feat: improve image viewer, fix crop system, and add responsive mobile-friendly design)

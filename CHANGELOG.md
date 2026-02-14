# Changelog

## [1.1.0] - 2026-02-13

### 🎉 New Features
- ✅ **Custom Logo Upload** - Users can now upload their own logo images
  - Supports PNG, JPG, WebP, GIF formats
  - Easy upload button in the Logo section
  
- ✅ **Preset Logo Options** - 3 quick-select preset logos
  - 🔵 Blue Circle Logo
  - 🔴 Red Square Logo  
  - 🟢 Green Triangle Logo
  - One-click selection to instantly change logos

- ✅ **Improved Visibility** - All controls now visible from start
  - View section (Zoom controls) always displayed
  - No need to wait for image upload to access controls
  - Better organized toolbar layout

### 🔧 Technical Improvements
- Updated App.jsx state management to handle multiple logo sources
- Enhanced CanvasEditor component to accept dynamic logo prop
- Refactored Toolbar component with improved organization
- Added preset logo SVG files to public directory
- Improved styling for preset buttons with hover effects

### 📝 Files Modified
- `src/App.jsx` - Added logo state, upload handler, preset management
- `src/components/CanvasEditor.jsx` - Updated to use dynamic logo prop
- `src/components/Toolbar.jsx` - Complete restructure with new sections
- `src/components/Toolbar.css` - New styles for preset buttons
- `README.md` - Updated with new feature documentation

### 📁 New Files
- `public/logo-blue.svg` - Blue Circle preset
- `public/logo-red.svg` - Red Square preset
- `public/logo-green.svg` - Green Triangle preset

### 🐛 Bug Fixes
- Fixed View options not being visible (now always shown)
- Improved toolbar responsiveness

### 📈 UI/UX Improvements
- Reorganized toolbar sections for better usability
- Added visual feedback to preset logo buttons
- Improved spacing and visual hierarchy
- Better labeling and organization

## [1.0.0] - 2026-02-13

### Initial Release
- Basic image upload functionality
- Konva.js canvas rendering
- Logo overlay with drag support
- Zoom in/out controls
- Logo scale, opacity, and rotation controls
- PNG export functionality
- Responsive design
- Vite development environment

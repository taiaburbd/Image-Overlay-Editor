import React, { useState, useRef, useEffect } from 'react'
import CanvasEditor from './components/CanvasEditor'
import Toolbar from './components/Toolbar'
import './App.css'

function App() {
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 })
  const [logoConfig, setLogoConfig] = useState({
    scale: 1,
    rotation: 0,
    opacity: 1
  })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [stageRef, setStageRef] = useState(null)
  const [currentLogo, setCurrentLogo] = useState('/logo.svg')
  const [canvasBackground, setCanvasBackground] = useState('#ffffff')
  const [cropArea, setCropArea] = useState(null)
  const [isCropping, setIsCropping] = useState(false)
  const scrollPositionRef = useRef(0)
  
  const PRESET_LOGOS = [
    { id: 'blue', name: 'Blue Circle', path: '/logo-blue.svg' },
    { id: 'red', name: 'Red Square', path: '/logo-red.svg' },
    { id: 'green', name: 'Green Triangle', path: '/logo-green.svg' }
  ]

  // Prevent auto-scroll and restore scroll position
  useEffect(() => {
    if (backgroundImage) {
      // Restore scroll position after image loads
      window.scrollTo(0, scrollPositionRef.current)
    }
  }, [backgroundImage])

  const handleImageUpload = (event) => {
    // Save current scroll position
    scrollPositionRef.current = window.scrollY || window.pageYOffset
    
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBackgroundImage(e.target.result)
        
        // Load image dimensions
        const img = new Image()
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height })
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
    
    // Blur the input to prevent focus-related scroll
    if (event.target) {
      event.target.blur()
    }
  }

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCurrentLogo(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectPresetLogo = (logoPath) => {
    setCurrentLogo(logoPath)
  }

  const handleExport = () => {
    if (stageRef) {
      const uri = stageRef.toDataURL()
      const link = document.createElement('a')
      link.download = 'edited-image.png'
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2
      return Math.max(0.5, Math.min(3, newZoom))
    })
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
  }

  const handleLogoOpacityChange = (opacity) => {
    setLogoConfig(prev => ({
      ...prev,
      opacity: Math.max(0, Math.min(1, opacity))
    }))
  }

  const handleLogoScaleChange = (scale) => {
    setLogoConfig(prev => ({
      ...prev,
      scale: Math.max(0.1, Math.min(2, scale))
    }))
  }

  const handleLogoRotationChange = (rotation) => {
    setLogoConfig(prev => ({
      ...prev,
      rotation: rotation % 360
    }))
  }

  // Crop Handlers
  const handleStartCrop = () => {
    setIsCropping(true)
  }

  const handleApplyCrop = () => {
    if (cropArea) {
      setIsCropping(false)
      // The crop will be applied in CanvasEditor
    }
  }

  const handleCancelCrop = () => {
    setIsCropping(false)
    setCropArea(null)
  }

  const handleResetCrop = () => {
    setCropArea(null)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🖼️ Image Overlay Editor</h1>
        <p>Upload your image, drag the logo, and edit with ease</p>
      </header>

      <div className="app-container">
        {/* Left Column - Image Viewer */}
        <main className="image-viewer">
          {backgroundImage ? (
            <CanvasEditor
              backgroundImage={backgroundImage}
              logoPosition={logoPosition}
              setLogoPosition={setLogoPosition}
              logoConfig={logoConfig}
              zoomLevel={zoomLevel}
              setStageRef={setStageRef}
              currentLogo={currentLogo}
              imageDimensions={imageDimensions}
              canvasBackground={canvasBackground}
              isCropping={isCropping}
              cropArea={cropArea}
              setCropArea={setCropArea}
            />
          ) : (
            <div className="empty-state">
              <div className="empty-state-content">
                <h2>📷 No Image Selected</h2>
                <p>Click "Upload Image" to get started</p>
              </div>
            </div>
          )}
        </main>

        {/* Right Column - Control Panel */}
        <aside className="control-panel">
          <Toolbar
            onImageUpload={handleImageUpload}
            onLogoUpload={handleLogoUpload}
            onSelectPresetLogo={handleSelectPresetLogo}
            onExport={handleExport}
            onZoomIn={() => handleZoom('in')}
            onZoomOut={() => handleZoom('out')}
            onResetZoom={handleResetZoom}
            zoomLevel={zoomLevel}
            logoConfig={logoConfig}
            onOpacityChange={handleLogoOpacityChange}
            onScaleChange={handleLogoScaleChange}
            onRotationChange={handleLogoRotationChange}
            hasImage={!!backgroundImage}
            presetLogos={PRESET_LOGOS}
            imageDimensions={imageDimensions}
            canvasBackground={canvasBackground}
            onCanvasBackgroundChange={setCanvasBackground}
            isCropping={isCropping}
            onStartCrop={handleStartCrop}
            onApplyCrop={handleApplyCrop}
            onCancelCrop={handleCancelCrop}
            onResetCrop={handleResetCrop}
            cropArea={cropArea}
          />
        </aside>
      </div>
    </div>
  )
}

export default App

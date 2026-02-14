import React, { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Image as KonvaImage, Rect } from 'react-konva'
import useImage from './useImage'
import Logo from './Logo'
import './CanvasEditor.css'

function CanvasEditor({
  backgroundImage,
  logoPosition,
  setLogoPosition,
  logoConfig,
  zoomLevel,
  setStageRef,
  currentLogo,
  imageDimensions,
  canvasBackground,
  isCropping,
  cropArea,
  setCropArea
}) {
  const stageContainerRef = useRef(null)
  const stageInternalRef = useRef(null)
  const imageRef = useImage(backgroundImage)
  const logoRef = useImage(currentLogo)
  const cropLayerRef = useRef(null)
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [isCropDrawing, setIsCropDrawing] = useState(false)

  // Load and calculate image dimensions
  useEffect(() => {
    if (backgroundImage) {
      const img = new window.Image()
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height })
      }
      img.crossOrigin = 'anonymous'
      img.src = backgroundImage
    }
  }, [backgroundImage])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (stageContainerRef.current) {
        const rect = stageContainerRef.current.getBoundingClientRect()
        const newWidth = Math.max(300, rect.width)
        const newHeight = Math.max(300, rect.height)
        
        // Only update if size actually changed significantly
        setStageSize(prevSize => {
          if (Math.abs(prevSize.width - newWidth) > 5 || Math.abs(prevSize.height - newHeight) > 5) {
            return {
              width: newWidth,
              height: newHeight
            }
          }
          return prevSize
        })
      }
    }

    const resizeObserver = new ResizeObserver(handleResize)
    if (stageContainerRef.current) {
      resizeObserver.observe(stageContainerRef.current)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
    }
  }, [])

  const calculateScaledImageSize = () => {
    if (!imageSize.width || !imageSize.height) return { width: stageSize.width, height: stageSize.height }
    
    const maxWidth = stageSize.width * 0.95
    const maxHeight = stageSize.height * 0.95
    
    let width = imageSize.width
    let height = imageSize.height
    
    if (width > maxWidth) {
      height = (maxWidth / width) * height
      width = maxWidth
    }
    
    if (height > maxHeight) {
      width = (maxHeight / height) * width
      height = maxHeight
    }
    
    return { width, height }
  }

  const scaledImageSize = calculateScaledImageSize()
  const imageX = (stageSize.width - scaledImageSize.width * zoomLevel) / 2
  const imageY = (stageSize.height - scaledImageSize.height * zoomLevel) / 2

  // Calculate displayed image size with zoom
  const displayedWidth = Math.round(imageSize.width * zoomLevel)
  const displayedHeight = Math.round(imageSize.height * zoomLevel)

  // Handle crop area changes
  const handleCropMouseDown = (e) => {
    if (!isCropping) return
    const stage = e.target.getStage()
    const pointerPos = stage.getPointerPosition()
    
    setIsCropDrawing(true)
    setCropArea({
      x: pointerPos.x,
      y: pointerPos.y,
      width: 0,
      height: 0,
      startX: pointerPos.x,
      startY: pointerPos.y
    })
  }

  const handleCropMouseMove = (e) => {
    if (!isCropping || !isCropDrawing || !cropArea?.startX) return
    const stage = e.target.getStage()
    const pointerPos = stage.getPointerPosition()
    
    const x = Math.min(cropArea.startX, pointerPos.x)
    const y = Math.min(cropArea.startY, pointerPos.y)
    const width = Math.abs(pointerPos.x - cropArea.startX)
    const height = Math.abs(pointerPos.y - cropArea.startY)
    
    setCropArea(prev => ({
      ...prev,
      x,
      y,
      width,
      height
    }))
  }

  const handleCropMouseUp = () => {
    setIsCropDrawing(false)
  }

  const handleTouchStart = (e) => {
    if (!isCropping) return
    const stage = e.target.getStage()
    const touch = e.evt.touches[0]
    const pointerPos = stage.getPointerPosition()
    
    setIsCropDrawing(true)
    setCropArea({
      x: pointerPos.x,
      y: pointerPos.y,
      width: 0,
      height: 0,
      startX: pointerPos.x,
      startY: pointerPos.y
    })
  }

  const handleTouchMove = (e) => {
    if (!isCropping || !isCropDrawing || !cropArea?.startX) return
    const stage = e.target.getStage()
    const pointerPos = stage.getPointerPosition()
    
    const x = Math.min(cropArea.startX, pointerPos.x)
    const y = Math.min(cropArea.startY, pointerPos.y)
    const width = Math.abs(pointerPos.x - cropArea.startX)
    const height = Math.abs(pointerPos.y - cropArea.startY)
    
    setCropArea(prev => ({
      ...prev,
      x,
      y,
      width,
      height
    }))
  }

  const handleTouchEnd = () => {
    setIsCropDrawing(false)
  }

  return (
    <div className="canvas-editor">
      <div className="canvas-container" ref={stageContainerRef}>
        {imageRef && (
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            scale={{ x: zoomLevel, y: zoomLevel }}
            ref={(node) => {
              setStageRef(node)
              stageInternalRef.current = node
            }}
            style={{ backgroundColor: canvasBackground }}
            onMouseDown={handleCropMouseDown}
            onMouseMove={handleCropMouseMove}
            onMouseUp={handleCropMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Layer>
              {/* Canvas Background */}
              <Rect
                x={0}
                y={0}
                width={stageSize.width}
                height={stageSize.height}
                fill={canvasBackground}
              />

              {/* Background Image */}
              <KonvaImage
                image={imageRef}
                x={imageX}
                y={imageY}
                width={scaledImageSize.width}
                height={scaledImageSize.height}
              />
            </Layer>
            
            <Layer>
              {/* Logo Overlay */}
              {logoRef && !isCropping && (
                <Logo
                  image={logoRef}
                  x={logoPosition.x}
                  y={logoPosition.y}
                  scale={logoConfig.scale}
                  rotation={logoConfig.rotation}
                  opacity={logoConfig.opacity}
                  onDragEnd={(e) => {
                    setLogoPosition({
                      x: e.target.x(),
                      y: e.target.y()
                    })
                  }}
                />
              )}
            </Layer>

            {/* Crop Layer */}
            {isCropping && cropArea && (
              <Layer ref={cropLayerRef}>
                {/* Darken non-crop areas */}
                <Rect
                  x={0}
                  y={0}
                  width={stageSize.width}
                  height={cropArea.y}
                  fill="#000000"
                  opacity={0.5}
                />
                <Rect
                  x={0}
                  y={cropArea.y}
                  width={cropArea.x}
                  height={cropArea.height}
                  fill="#000000"
                  opacity={0.5}
                />
                <Rect
                  x={cropArea.x + cropArea.width}
                  y={cropArea.y}
                  width={stageSize.width - (cropArea.x + cropArea.width)}
                  height={cropArea.height}
                  fill="#000000"
                  opacity={0.5}
                />
                <Rect
                  x={0}
                  y={cropArea.y + cropArea.height}
                  width={stageSize.width}
                  height={stageSize.height - (cropArea.y + cropArea.height)}
                  fill="#000000"
                  opacity={0.5}
                />
                
                {/* Crop area border */}
                <Rect
                  x={cropArea.x}
                  y={cropArea.y}
                  width={cropArea.width}
                  height={cropArea.height}
                  stroke="#00ff00"
                  strokeWidth={2}
                  fill="transparent"
                  dash={[5, 5]}
                />
              </Layer>
            )}
          </Stage>
        )}
      </div>
      
      {/* Image Size Display */}
      {imageDimensions.width > 0 && (
        <div className="image-size-display">
          <div className="size-info">
            <span className="size-label">Original:</span>
            <span className="size-value">{imageDimensions.width} × {imageDimensions.height}px</span>
          </div>
          <div className="size-info">
            <span className="size-label">Displayed:</span>
            <span className="size-value">{displayedWidth} × {displayedHeight}px</span>
          </div>
          <div className="size-info">
            <span className="size-label">Zoom:</span>
            <span className="size-value">{(zoomLevel * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CanvasEditor

import React, { useState } from 'react'
import './Toolbar.css'

function Toolbar({
  onImageUpload,
  onLogoUpload,
  onSelectPresetLogo,
  onExport,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoomLevel,
  logoConfig,
  onOpacityChange,
  onScaleChange,
  onRotationChange,
  hasImage,
  presetLogos,
  imageDimensions,
  canvasBackground,
  onCanvasBackgroundChange,
  isCropping,
  onStartCrop,
  onApplyCrop,
  onCancelCrop,
  onResetCrop,
  cropArea
}) {
  const [cropMode, setCropMode] = useState('freeform')
  return (
    <aside className="toolbar">
      <div className="toolbar-section">
        <h3>Image</h3>
        <label className="file-input-label" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          📤 Upload Image
          <input type="file" accept="image/*" onChange={onImageUpload} />
        </label>
      </div>

      <div className="toolbar-section">
        <h3>Logo</h3>
        
        <div className="logo-presets">
          <p className="label-text">Preset Logos:</p>
          <div className="preset-buttons">
            {presetLogos.map(logo => (
              <button
                key={logo.id}
                onClick={() => onSelectPresetLogo(logo.path)}
                className="preset-btn"
                title={logo.name}
              >
                {logo.name}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label className="file-input-label" style={{ backgroundColor: '#8b5cf6', color: 'white' }}>
            📁 Upload Custom Logo
            <input type="file" accept="image/*" onChange={onLogoUpload} />
          </label>
        </div>
        
        <div className="control-group">
          <label>
            Scale
            <div className="slider-container">
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={logoConfig.scale}
                onChange={(e) => onScaleChange(parseFloat(e.target.value))}
              />
              <span>{logoConfig.scale.toFixed(1)}x</span>
            </div>
          </label>
        </div>

        <div className="control-group">
          <label>
            Opacity
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={logoConfig.opacity}
                onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
              />
              <span>{(logoConfig.opacity * 100).toFixed(0)}%</span>
            </div>
          </label>
        </div>

        <div className="control-group">
          <label>
            Rotation
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={logoConfig.rotation}
                onChange={(e) => onRotationChange(parseFloat(e.target.value))}
              />
              <span>{logoConfig.rotation.toFixed(0)}°</span>
            </div>
          </label>
        </div>
      </div>

      {hasImage && (
        <>
          {/* Canvas Settings */}
          <div className="toolbar-section">
            <h3>Canvas</h3>
            
            <div className="control-group">
              <label>
                Background Color
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={canvasBackground}
                    onChange={(e) => onCanvasBackgroundChange(e.target.value)}
                  />
                  <span>{canvasBackground}</span>
                </div>
              </label>
            </div>
          </div>

          {/* Crop Tool */}
          <div className="toolbar-section">
            <h3>Crop</h3>
            
            {!isCropping ? (
              <button
                onClick={onStartCrop}
                style={{ backgroundColor: '#10b981', color: 'white', width: '100%' }}
              >
                🔪 Start Crop
              </button>
            ) : (
              <>
                <div className="control-group">
                  <label>
                    Crop Preset
                    <select
                      value={cropMode}
                      onChange={(e) => setCropMode(e.target.value)}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--gray-300)' }}
                    >
                      <option value="freeform">Freeform</option>
                      <option value="1:1">Square (1:1)</option>
                      <option value="16:9">Landscape (16:9)</option>
                      <option value="4:3">Standard (4:3)</option>
                    </select>
                  </label>
                </div>

                <div className="control-group">
                  {cropArea && (
                    <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginBottom: '8px' }}>
                      <p>X: {Math.round(cropArea.x)} | Y: {Math.round(cropArea.y)}</p>
                      <p>W: {Math.round(cropArea.width)} | H: {Math.round(cropArea.height)}</p>
                    </div>
                  )}
                </div>

                <div className="control-group" style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={onApplyCrop}
                    style={{ backgroundColor: '#10b981', color: 'white', flex: 1 }}
                  >
                    ✓ Apply
                  </button>
                  <button
                    onClick={onCancelCrop}
                    style={{ backgroundColor: 'var(--danger)', color: 'white', flex: 1 }}
                  >
                    ✕ Cancel
                  </button>
                </div>
              </>
            )}

            {cropArea && (
              <button
                onClick={onResetCrop}
                style={{ backgroundColor: 'var(--gray-400)', color: 'white', width: '100%', marginTop: '8px' }}
              >
                ↺ Reset Crop
              </button>
            )}
          </div>
        </>
      )}

      <div className="toolbar-section">
        <h3>View</h3>
        <div className="control-group">
          <button onClick={onZoomIn} style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
            🔍+ Zoom In
          </button>
          <button onClick={onZoomOut} style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
            🔍- Zoom Out
          </button>
          <button onClick={onResetZoom} style={{ backgroundColor: 'var(--gray-200)', color: 'var(--gray-900)' }}>
            ↺ Reset Zoom
          </button>
        </div>
        <div className="zoom-display">
          Zoom: {(zoomLevel * 100).toFixed(0)}%
        </div>
      </div>

      {hasImage && (
        <div className="toolbar-section">
          <button 
            onClick={onExport}
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'white',
              width: '100%'
            }}
          >
            ⬇️ Export Image
          </button>
        </div>
      )}

      <div className="toolbar-section info">
        <h4>💡 Tips</h4>
        <ul>
          <li>Drag the logo to move it</li>
          <li>Use sliders to adjust size & rotation</li>
          <li>Zoom to see details</li>
          <li>Export your final image</li>
        </ul>
      </div>
    </aside>
  )
}

export default Toolbar

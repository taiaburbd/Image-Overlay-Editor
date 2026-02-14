import React from 'react'
import { Group, Text as KonvaText } from 'react-konva'

function TextOverlay({ 
  textData, 
  isSelected,
  onSelect,
  onUpdate 
}) {
  const fontStyle = textData.italic ? 'italic' : 'normal'
  const fontWeight = textData.bold ? 'bold' : 'normal'
  const fontString = `${fontWeight} ${fontStyle} ${textData.fontSize}px ${textData.fontFamily}`

  return (
    <Group
      x={textData.x}
      y={textData.y}
      draggable
      onDragEnd={(e) => {
        onUpdate(textData.id, {
          x: e.target.x(),
          y: e.target.y()
        })
      }}
      onClick={() => onSelect(textData.id)}
    >
      <KonvaText
        text={textData.text}
        fontSize={textData.fontSize}
        fontFamily={textData.fontFamily}
        fill={textData.color}
        fontStyle={fontString}
        stroke={isSelected ? '#3b82f6' : 'transparent'}
        strokeWidth={isSelected ? 2 : 0}
        padding={8}
        cornerRadius={4}
      />
    </Group>
  )
}

export default TextOverlay

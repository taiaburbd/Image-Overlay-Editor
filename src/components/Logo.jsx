import React from 'react'
import { Group, Image as KonvaImage } from 'react-konva'

function Logo({ image, x, y, scale, rotation, opacity, onDragEnd }) {
  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={onDragEnd}
      offsetX={(image?.width * scale) / 2}
      offsetY={(image?.height * scale) / 2}
    >
      <KonvaImage
        image={image}
        scaleX={scale}
        scaleY={scale}
        rotation={rotation}
        opacity={opacity}
        cursor="move"
      />
    </Group>
  )
}

export default Logo

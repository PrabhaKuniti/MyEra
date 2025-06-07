import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Stage, Layer, Text, Line } from 'react-konva';
import { Sticker } from '../types/sticker';
import { snapPositionToGrid, GRID_SIZE } from '../utils/grid';
import Konva from 'konva';

interface StickerCanvasProps {
  stickers: Sticker[];
  onStickerMove: (id: string, x: number, y: number) => void;
  onStickerDelete: (id: string) => void;
  showGrid: boolean;
}

export const StickerCanvas = forwardRef<Konva.Stage, StickerCanvasProps>(({
  stickers,
  onStickerMove,
  onStickerDelete,
  showGrid
}, ref) => {
  const stageRef = useRef<Konva.Stage>(null);
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);

  useImperativeHandle(ref, () => stageRef.current!);

  const handleStickerDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    const snappedPos = snapPositionToGrid(node.x(), node.y());
    
    // Ensure sticker stays within bounds
    const constrainedX = Math.max(0, Math.min(600 - 40, snappedPos.x));
    const constrainedY = Math.max(0, Math.min(400 - 40, snappedPos.y));
    
    onStickerMove(id, constrainedX, constrainedY);
    setDraggedSticker(null);
  };

  const renderGridLines = () => {
    if (!showGrid) return null;

    const lines = [];
    
    // Vertical lines
    for (let i = 0; i <= 600; i += GRID_SIZE) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i, 0, i, 400]}
          stroke="#e5e7eb"
          strokeWidth={1}
          listening={false}
        />
      );
    }
    
    // Horizontal lines
    for (let i = 0; i <= 400; i += GRID_SIZE) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, i, 600, i]}
          stroke="#e5e7eb"
          strokeWidth={1}
          listening={false}
        />
      );
    }
    
    return lines;
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <Stage 
          width={600} 
          height={400} 
          ref={stageRef}
          className="cursor-grab active:cursor-grabbing"
        >
          <Layer>
            {renderGridLines()}
            {stickers.map((sticker) => (
              <Text
                key={sticker.id}
                x={sticker.x}
                y={sticker.y}
                text={sticker.emoji}
                fontSize={sticker.fontSize}
                draggable
                onDragStart={() => setDraggedSticker(sticker.id)}
                onDragEnd={(e) => handleStickerDragEnd(sticker.id, e)}
                onDblClick={() => onStickerDelete(sticker.id)}
                shadowColor={draggedSticker === sticker.id ? "rgba(0,0,0,0.3)" : "transparent"}
                shadowBlur={draggedSticker === sticker.id ? 10 : 0}
                shadowOffset={draggedSticker === sticker.id ? { x: 3, y: 3 } : { x: 0, y: 0 }}
                scaleX={draggedSticker === sticker.id ? 1.1 : 1}
                scaleY={draggedSticker === sticker.id ? 1.1 : 1}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white/80 backdrop-blur-sm rounded px-2 py-1">
        Double-click to delete • Drag to move
      </div>
    </div>
  );
});

StickerCanvas.displayName = 'StickerCanvas';

export default StickerCanvas;
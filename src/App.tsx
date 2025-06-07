import React, { useState, useRef } from 'react';
import { Stage } from 'react-konva';
import StickerCanvas from './components/StickerCanvas';
import { ControlPanel } from './components/ControlPanel';
import { Sticker, StickerTemplate } from './types/sticker';
import { Palette } from 'lucide-react';

const STICKER_TEMPLATES: StickerTemplate[] = [
  { emoji: '😊', label: 'Happy', fontSize: 32 },
  { emoji: '🌟', label: 'Star', fontSize: 32 },
  { emoji: '❤️', label: 'Heart', fontSize: 32 },
  { emoji: '🎉', label: 'Party', fontSize: 32 },
  { emoji: '🚀', label: 'Rocket', fontSize: 32 },
  { emoji: '🌈', label: 'Rainbow', fontSize: 32 },
  { emoji: '🎨', label: 'Art', fontSize: 32 },
  { emoji: '🔥', label: 'Fire', fontSize: 32 },
  { emoji: '⚡', label: 'Lightning', fontSize: 32 },
  { emoji: '🎵', label: 'Music', fontSize: 32 },
  { emoji: '🌸', label: 'Flower', fontSize: 32 },
  { emoji: '🦋', label: 'Butterfly', fontSize: 32 }
];

function App() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const stageRef = useRef<Stage>(null);

  const generateId = () => `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addSticker = (template: StickerTemplate) => {
    const newSticker: Sticker = {
      id: generateId(),
      x: Math.floor(Math.random() * 14) * 40, // Random grid position
      y: Math.floor(Math.random() * 9) * 40,  // Random grid position
      emoji: template.emoji,
      fontSize: template.fontSize
    };
    setStickers(prev => [...prev, newSticker]);
  };

  const moveSticker = (id: string, x: number, y: number) => {
    setStickers(prev => prev.map(sticker => 
      sticker.id === id ? { ...sticker, x, y } : sticker
    ));
  };

  const deleteSticker = (id: string) => {
    setStickers(prev => prev.filter(sticker => sticker.id !== id));
  };

  const downloadCanvas = () => {
    if (!stageRef.current) return;
    
    const stage = stageRef.current.getStage();
    const dataURL = stage.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: 2
    });
    
    const link = document.createElement('a');
    link.download = `sticker-canvas-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                           bg-clip-text text-transparent">
              Sticker Canvas
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create beautiful compositions by adding and arranging stickers on the canvas. 
            Drag to move, double-click to delete, and download your creation!
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Canvas */}
          <div className="flex-shrink-0">
            <StickerCanvas
              ref={stageRef}
              stickers={stickers}
              onStickerMove={moveSticker}
              onStickerDelete={deleteSticker}
              showGrid={showGrid}
            />
          </div>

          {/* Control Panel */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
              <ControlPanel
                stickerTemplates={STICKER_TEMPLATES}
                onAddSticker={addSticker}
                onDownload={downloadCanvas}
                showGrid={showGrid}
                onToggleGrid={() => setShowGrid(!showGrid)}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/50 backdrop-blur-sm 
                          rounded-full px-6 py-3 border border-white/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                {stickers.length} sticker{stickers.length !== 1 ? 's' : ''} on canvas
              </span>
            </div>
            {showGrid && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Grid enabled</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
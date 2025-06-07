import React from 'react';
import { Download, Grid3X3, Eye, EyeOff } from 'lucide-react';
import { StickerButton } from './StickerButton';
import { StickerTemplate } from '../types/sticker';

interface ControlPanelProps {
  stickerTemplates: StickerTemplate[];
  onAddSticker: (template: StickerTemplate) => void;
  onDownload: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  stickerTemplates,
  onAddSticker,
  onDownload,
  showGrid,
  onToggleGrid
}) => {
  return (
    <div className="space-y-6">
      {/* Sticker Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>Add Stickers</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {stickerTemplates.map((template, index) => (
            <StickerButton
              key={index}
              template={template}
              onClick={onAddSticker}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Controls</span>
        </h3>
        
        <div className="space-y-3">
          {/* Grid Toggle */}
          <button
            onClick={onToggleGrid}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg 
                       transition-all duration-200 font-medium ${
              showGrid 
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-200 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
            }`}
          >
            {showGrid ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showGrid ? 'Hide Grid' : 'Show Grid'}</span>
          </button>

          {/* Download Button */}
          <button
            onClick={onDownload}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 
                       hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg 
                       transition-all duration-200 flex items-center justify-center space-x-2 
                       shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
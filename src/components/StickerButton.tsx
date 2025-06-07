import React from 'react';
import { StickerTemplate } from '../types/sticker';

interface StickerButtonProps {
  template: StickerTemplate;
  onClick: (template: StickerTemplate) => void;
}

export const StickerButton: React.FC<StickerButtonProps> = ({ template, onClick }) => {
  return (
    <button
      onClick={() => onClick(template)}
      className="group relative bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 
                 rounded-xl p-4 transition-all duration-200 ease-out shadow-sm hover:shadow-md 
                 transform hover:scale-105 active:scale-95"
      title={`Add ${template.label}`}
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
          {template.emoji}
        </span>
        <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
          {template.label}
        </span>
      </div>
      <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-200" />
    </button>
  );
};
import React from 'react';
import { Type, Move, Palette } from 'lucide-react';

interface TextOverlayProps {
  text: string;
  onTextChange: (text: string) => void;
  textColor: string;
  onColorChange: (color: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  textPosition: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
}

export default function TextOverlay({
  text,
  onTextChange,
  textColor,
  onColorChange,
  fontSize,
  onFontSizeChange,
  textPosition,
  onPositionChange,
}: TextOverlayProps) {
  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-sm font-semibold text-gray-800">Text Overlay</h3>
      
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Type className="w-4 h-4" />
          Text Content
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter text overlay"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Palette className="w-4 h-4" />
          Text Color
        </label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-8 rounded-md cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Type className="w-4 h-4" />
          Font Size
        </label>
        <input
          type="range"
          min="12"
          max="72"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-500">{fontSize}px</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Move className="w-4 h-4" />
            X Position
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={textPosition.x}
            onChange={(e) => onPositionChange({ ...textPosition, x: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500">{textPosition.x}%</span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Move className="w-4 h-4" />
            Y Position
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={textPosition.y}
            onChange={(e) => onPositionChange({ ...textPosition, y: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500">{textPosition.y}%</span>
        </div>
      </div>
    </div>
  );
}
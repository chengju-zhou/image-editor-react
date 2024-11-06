import React from 'react';
import { Sun, Contrast, GalleryVerticalEnd, ImageOff } from 'lucide-react';

interface ControlsProps {
  brightness: number;
  contrast: number;
  blur: number;
  grayscale: boolean;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onBlurChange: (value: number) => void;
  onGrayscaleChange: (value: boolean) => void;
}

export default function Controls({
  brightness,
  contrast,
  blur,
  grayscale,
  onBrightnessChange,
  onContrastChange,
  onBlurChange,
  onGrayscaleChange,
}: ControlsProps) {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Sun className="w-4 h-4" />
          Brightness
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          value={brightness}
          onChange={(e) => onBrightnessChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-500">{brightness}%</span>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Contrast className="w-4 h-4" />
          Contrast
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          value={contrast}
          onChange={(e) => onContrastChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-500">{contrast}%</span>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <GalleryVerticalEnd className="w-4 h-4" />
          Blur
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={blur}
          onChange={(e) => onBlurChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-500">{blur}px</span>
      </div>

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <ImageOff className="w-4 h-4" />
          Grayscale
        </label>
        <input
          type="checkbox"
          checked={grayscale}
          onChange={(e) => onGrayscaleChange(e.target.checked)}
          className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
import React, { useRef, useEffect } from 'react';

interface ImageCanvasProps {
  imageUrl: string;
  brightness: number;
  contrast: number;
  blur: number;
  grayscale: boolean;
  overlayText: string;
  textPosition: { x: number; y: number };
  textColor: string;
  fontSize: number;
  onImageLoad: () => void;
}

export default function ImageCanvas({ 
  imageUrl, 
  brightness, 
  contrast, 
  blur,
  grayscale,
  overlayText,
  textPosition,
  textColor,
  fontSize,
  onImageLoad 
}: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    
    image.onload = () => {
      // Set canvas size to match image
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply filters
      ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%) blur(${blur}px)`;
      
      // Draw image
      ctx.drawImage(image, 0, 0);
      
      // Apply grayscale if enabled
      if (grayscale) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;     // Red
          data[i + 1] = avg; // Green
          data[i + 2] = avg; // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
      }

      // Add text overlay if provided
      if (overlayText) {
        ctx.filter = 'none'; // Reset filters for text
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const x = (canvas.width * textPosition.x) / 100;
        const y = (canvas.height * textPosition.y) / 100;

        // Add text stroke for better visibility
        ctx.strokeStyle = 'black';
        ctx.lineWidth = fontSize / 8;
        ctx.strokeText(overlayText, x, y);
        ctx.fillText(overlayText, x, y);
      }
      
      onImageLoad();
    };

    image.src = imageUrl;
  }, [imageUrl, brightness, contrast, blur, grayscale, overlayText, textPosition, textColor, fontSize, onImageLoad]);

  return (
    <canvas 
      ref={canvasRef}
      className="max-w-full h-auto rounded-lg shadow-lg"
    />
  );
}
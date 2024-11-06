import React, { useState } from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';
import ImageCanvas from './components/ImageCanvas';
import Controls from './components/Controls';
import TextOverlay from './components/TextOverlay';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=1000";

function App() {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [blur, setBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(DEFAULT_IMAGE);
  const [overlayText, setOverlayText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(24);

  const handleReset = () => {
    setBrightness(0);
    setContrast(0);
    setBlur(0);
    setGrayscale(false);
    setOverlayText('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Image Processing Demo</h1>
          </div>
          <p className="text-gray-600">Experiment with various image processing effects</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Original Image */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 text-center">Original Image</h2>
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
                <ImageCanvas
                  imageUrl={currentImage}
                  brightness={0}
                  contrast={0}
                  blur={0}
                  grayscale={false}
                  onImageLoad={() => setIsLoading(false)}
                  overlayText=""
                  textPosition={textPosition}
                  textColor={textColor}
                  fontSize={fontSize}
                />
              </div>
              
              <label className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer gap-2">
                <Upload className="w-5 h-5" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 text-center">Controls</h2>
              <Controls
                brightness={brightness}
                contrast={contrast}
                blur={blur}
                grayscale={grayscale}
                onBrightnessChange={setBrightness}
                onContrastChange={setContrast}
                onBlurChange={setBlur}
                onGrayscaleChange={setGrayscale}
              />

              <TextOverlay
                text={overlayText}
                onTextChange={setOverlayText}
                textColor={textColor}
                onColorChange={setTextColor}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                textPosition={textPosition}
                onPositionChange={setTextPosition}
              />
              
              <button
                onClick={handleReset}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Reset All Effects
              </button>
            </div>

            {/* Processed Images */}
            <div className="space-y-4">
              {/* Main processed image */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">Processed Image</h2>
                <div className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                  )}
                  <ImageCanvas
                    imageUrl={currentImage}
                    brightness={brightness}
                    contrast={contrast}
                    blur={blur}
                    grayscale={grayscale}
                    onImageLoad={() => setIsLoading(false)}
                    overlayText={overlayText}
                    textPosition={textPosition}
                    textColor={textColor}
                    fontSize={fontSize}
                  />
                </div>
              </div>

              {/* Grayscale version */}
              <div>
                <h3 className="text-md font-medium text-gray-800 text-center mb-4">Grayscale Preview</h3>
                <div className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                  )}
                  <ImageCanvas
                    imageUrl={currentImage}
                    brightness={brightness}
                    contrast={contrast}
                    blur={blur}
                    grayscale={true}
                    onImageLoad={() => setIsLoading(false)}
                    overlayText={overlayText}
                    textPosition={textPosition}
                    textColor={textColor}
                    fontSize={fontSize}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
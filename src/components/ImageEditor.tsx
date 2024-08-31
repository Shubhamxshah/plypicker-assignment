import React, { useState, useRef } from 'react';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { Slider } from './ImgEditorComponents/Slider';

interface ImageEditorProps {
  src: string;
  onSave: (editedImageBlob: string) => void;
  onCancel: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ src, onSave, onCancel }) => {
  const cropperRef = useRef<CropperRef>(null);

  const [mode, setMode] = useState('crop');
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0,
  });

  const onChangeValue = (value: number) => {
    if (mode in adjustments) {
      setAdjustments((prev) => ({
        ...prev,
        [mode]: value,
      }));
    }
  };

  const handleSave = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            onSave(URL.createObjectURL(blob));
          }
        });
      }
    }
  };

  return (
    <div className="image-editor">
      <div className="image-editor__cropper" style={{ maxHeight: '60vh', overflow: 'hidden' }}>
        <Cropper
          ref={cropperRef}
          src={src}
          className={'cropper'}
          stencilProps={{
            aspectRatio: 1,
          }}
        />
      </div>
      <div className="mt-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="crop">Crop</option>
          <option value="brightness">Brightness</option>
          <option value="contrast">Contrast</option>
          <option value="hue">Hue</option>
          <option value="saturation">Saturation</option>
        </select>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};
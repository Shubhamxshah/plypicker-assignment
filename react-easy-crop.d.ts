declare module 'react-easy-crop' {
    import React from 'react';
    
    export interface Point {
      x: number;
      y: number;
    }
    
    export interface Area {
      width: number;
      height: number;
      x: number;
      y: number;
    }
    
    export interface CropperProps {
      image: string;
      crop: Point;
      zoom: number;
      aspect: number;
      onCropChange: (crop: Point) => void;
      onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
      onZoomChange: (zoom: number) => void;
    }
    
    const Cropper: React.FC<CropperProps>;
    
    export default Cropper;
  }
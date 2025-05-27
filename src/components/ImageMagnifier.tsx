import React, { useState, useRef } from 'react';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  magnifierHeight: number;
  magnifierWidth: number;
  zoomLevel: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  width,
  height,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2.5
}) => {
  const [[x, y], setXY] = useState<[number, number]>([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState<[number, number]>([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);

  return (
    <div 
      style={{
        position: "relative",
        height: height,
        width: width
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onMouseEnter={(e) => {
          // Get image size and update state
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // Get mouse position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          
          // Calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          
          // Prevent magnifier from overflowing right/bottom edge
          left: Math.min(
            x - magnifierWidth / 2,
            imgWidth - magnifierWidth
          ),
          top: Math.min(
            y - magnifierHeight / 2,
            imgHeight - magnifierHeight
          ),
          
          width: `${magnifierWidth}px`,
          height: `${magnifierHeight}px`,
          
          // Some styling
          border: "1px solid lightgray",
          borderRadius: "50%",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          
          // Calculate background position based on cursor
          backgroundPosition: `
            ${-x * zoomLevel + magnifierWidth / 2}px 
            ${-y * zoomLevel + magnifierHeight / 2}px
          `,
          
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          
          // Add pointer events none to prevent the magnifier from triggering mouse events
          pointerEvents: "none",
          
          // Add a subtle shadow
          boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
          
          // Add smooth transition for the magnifier appearance
          transition: "opacity 0.2s ease-in-out",
          opacity: showMagnifier ? 1 : 0,
          
          // Ensure magnifier is always on top
          zIndex: 1000
        }}
      />
    </div>
  );
};

export default ImageMagnifier; 
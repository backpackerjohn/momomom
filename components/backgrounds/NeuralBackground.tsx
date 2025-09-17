import React from 'react';

const NeuralBackground: React.FC = () => {
  // A subtle, tiled SVG pattern of dots. Using a data URL is efficient.
  // Increased fill-opacity and dot radius to make dots more visible.
  const gridPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23e57452' fill-opacity='0.15'%3E%3Ccircle cx='50' cy='50' r='1.5'/%3E%3C/svg%3E")`;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl"
    >
      {/* Solid dark gradient background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-primary to-dark-secondary" />

      {/* Parallax Layer 1: Faster, smaller grid */}
      <div
        className="absolute inset-0 animate-neural-scroll-fast opacity-50"
        style={{
          backgroundImage: gridPattern,
          backgroundSize: '30px 30px',
        }}
      />
      
      {/* Parallax Layer 2: Slower, larger grid */}
      <div
        className="absolute inset-0 animate-neural-scroll-slow opacity-30"
        style={{
          backgroundImage: gridPattern,
          backgroundSize: '90px 90px',
        }}
      />
    </div>
  );
};

export default NeuralBackground;

import React from 'react';

interface AfogSVGProps {
  theme: string;
  scale: number;
}

const AfogSVG: React.FC<AfogSVGProps> = ({ theme, scale }) => (
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 520.8 493.3" style={{ transform: `scale(${scale})`, fill: theme === 'dark' ? '#000' : '#fff' }}>
    {/* rest of the SVG markup */}
  </svg>
);

export default AfogSVG;
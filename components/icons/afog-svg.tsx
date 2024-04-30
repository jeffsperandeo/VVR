import React from 'react';

interface AfogSVGProps {
  theme: string;
  scale: number;
}

const AfogSVG: React.FC<AfogSVGProps> = ({ theme, scale }) => (
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 520.8 493.3" style={{ transform: `scale(${scale})`, fill: theme === 'dark' ? '#fff' : '#000' }}>
    <g>
      <polygon fill="currentColor" points="55 89 0 89 0 0 520.8 0 520.8 337.1 465.9 337.1 465.9 55.9 55 55.9 55 89"/>
      <polygon fill="currentColor" points="465.9 404.2 520.8 404.2 520.8 493.3 0 493.3 0 156.2 55 156.2 55 437.4 465.9 437.4 465.9 404.2"/>
    </g>
    <g>
      <path fill="currentColor" d="M187.4,206.8c-44.7,0-81,36.3-81,81v11.6c0,44.7,36.3,81,81,81h87.4v-173.6h-87.4ZM227.3,333h-33.1c-21.7,0-39.2-17.6-39.2-39.2h0c0-21.7,17.6-39.2,39.2-39.2h33.1v78.4h0Z"/>
      <path fill="currentColor" d="M342.3,206.8v.4h54.4v47.4h-54.4v120.5h-50.8v-186.5c0-45.8,37.1-82.9,82.9-82.9h25.1v48.9c-30.8-2.2-57.2-3.5-57.2,52.2Z"/>
    </g>
  </svg>
);

export default AfogSVG;
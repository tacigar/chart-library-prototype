import React from 'react';
import { PlotContextProvider } from '../PlotContext';

export interface PlotProps {
  width: number;
  height: number;
  margin: {
    top: number;
    bottom: number;
    right: number;
    left: number;
  };
}

export const Plot: React.FC<PlotProps> = ({
  width,
  height,
  margin,
  children,
}) => {
  return (
    <PlotContextProvider value={{ width, height, margin }}>
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {children}
        </svg>
      </div>
    </PlotContextProvider>
  );
};

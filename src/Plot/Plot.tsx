import * as d3Scale from 'd3-scale';
import React, { useEffect, useMemo, useState } from 'react';
import { LineSeries } from '../LineSeries';
import { PlotContextProvider } from '../PlotContext';
import { PlotData } from '../types';

export interface PlotProps {
  width: number;
  height: number;
  margin?: {
    top: number;
    bottom: number;
    right: number;
    left: number;
  };
  children: JSX.Element[];
}

export const Plot: React.FC<PlotProps> = ({
  width,
  height,
  margin = { top: 20, bottom: 5, right: 5, left: 20 },
  children,
}) => {
  const chartWidth = width - (margin.right + margin.left);
  const chartHeight = height - (margin.top + margin.bottom);

  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;

  children.forEach((child) => {
    if (child.type === LineSeries) {
      const data: PlotData = child.props.data;
      data.forEach(({ x, y }) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    }
  });

  const xScale = d3Scale.scaleLinear().domain([minX, maxX]).range([0, chartWidth]);
  const yScale = d3Scale.scaleLinear().domain([minY, maxY]).range([chartHeight, 0]);

  return (
    <PlotContextProvider
      value={{
        width,
        height,
        margin,
        chartWidth,
        chartHeight,
        xScale,
        yScale,
      }}
    >
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {children}
        </svg>
      </div>
    </PlotContextProvider>
  );
};

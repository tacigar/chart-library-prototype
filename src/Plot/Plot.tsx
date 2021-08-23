import * as d3Scale from 'd3-scale';
import React from 'react';
import { AreaSeries } from '../AreaSeries/AreaSeries';
import { LineSeries } from '../LineSeries';
import { PlotContextProvider } from '../PlotContext';
import { ScatterSeries } from '../ScatterSeries';
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
  margin = { top: 5, bottom: 20, right: 10, left: 40 },
  children,
}) => {
  const chartWidth = width - (margin.right + margin.left);
  const chartHeight = height - (margin.top + margin.bottom);

  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;

  const allData: PlotData[] = [];

  children.forEach((child) => {
    if (child.type === LineSeries || child.type === AreaSeries || child.type === ScatterSeries) {
      const data: PlotData = child.props.data;
      data.forEach(({ x, y }) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
      allData.push(data);
    }
  });

  const xScale = d3Scale.scaleLinear().domain([minX, maxX]).range([0, chartWidth]);
  const yScale = d3Scale.scaleLinear().domain([minY, maxY]).range([chartHeight, 0]);

  return (
    <PlotContextProvider
      value={{
        allData,
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

import * as d3Shape from 'd3-shape';
import React, { useMemo } from 'react';
import { usePlotContext } from '../PlotContext';
import { PlotData } from '../types';

export interface LineSeriesProps {
  data: PlotData;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export const LineSeries: React.FC<LineSeriesProps> = ({
  data,
  strokeWidth = 1,
  stroke = '#456789',
  strokeDasharray,
}) => {
  const { xScale, yScale, margin } = usePlotContext();

  const d = useMemo(() => {
    if (!xScale || !yScale) {
      return undefined;
    }
    return (
      d3Shape
        .line()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]))(data.map(({ x, y }) => [x, y])) || undefined
    );
  }, [data, xScale, yScale]);

  return (
    <path
      d={d}
      transform={`translate(${margin.left},${margin.top})`}
      strokeWidth={strokeWidth}
      fill="none"
      stroke={stroke}
      strokeDasharray={strokeDasharray}
    />
  );
};

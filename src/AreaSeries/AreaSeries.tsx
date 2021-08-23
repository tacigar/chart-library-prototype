import * as d3Shape from 'd3-shape';
import React, { useMemo } from 'react';
import { usePlotContext } from '../PlotContext';
import { PlotData } from '../types';

export interface AreaSeriesProps {
  data: PlotData;
  fill?: string;
}

export const AreaSeries: React.FC<AreaSeriesProps> = ({ data, fill = '#abcdef' }) => {
  const { xScale, yScale, margin } = usePlotContext();

  const d = useMemo(() => {
    if (!xScale || !yScale) {
      return undefined;
    }
    return (
      d3Shape
        .area()
        .x((d) => xScale(d[0]))
        .y0(yScale(yScale.domain()[0]))
        .y1((d) => yScale(d[1]))(data.map(({ x, y }) => [x, y])) || undefined
    );
  }, [data, xScale, yScale]);

  return <path d={d} transform={`translate(${margin.left},${margin.top})`} fill={fill} />;
};

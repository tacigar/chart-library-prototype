import * as d3Shape from 'd3-shape';
import React, { useMemo } from 'react';
import { usePlotContext } from '../PlotContext';
import { PlotData } from '../types';

export interface LineSeriesProps {
  data: PlotData;
}

export const LineSeries: React.FC<LineSeriesProps> = ({ data }) => {
  const { xScale, yScale } = usePlotContext();

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

  return <path d={d} strokeWidth="1px" fill="none" stroke="black" />;
};

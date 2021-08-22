import * as d3Axis from 'd3-axis';
import * as d3Selection from 'd3-selection';
import React, { useEffect } from 'react';
import { usePlotContext } from '../PlotContext';

export interface YAxisProps {}

export const YAxis: React.FC<YAxisProps> = () => {
  const { margin, yScale } = usePlotContext();

  useEffect(() => {
    if (!yScale) {
      return;
    }
    (d3Selection.select('.axis.y-axis') as d3Selection.Selection<SVGGElement, unknown, HTMLElement, any>).call(
      d3Axis.axisLeft(yScale).ticks(10)
    );
  }, [yScale]);

  return <g className="axis y-axis" transform={`translate(${margin.left},${margin.top})`} />;
};

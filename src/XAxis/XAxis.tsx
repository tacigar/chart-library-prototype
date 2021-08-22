import * as d3Axis from 'd3-axis';
import * as d3Selection from 'd3-selection';
import React, { useEffect } from 'react';
import { usePlotContext } from '../PlotContext';

export interface XAxisProps {}

export const XAxis: React.FC<XAxisProps> = () => {
  const { margin, chartHeight, xScale } = usePlotContext();

  useEffect(() => {
    if (!xScale) {
      return;
    }
    (d3Selection.select('.axis.x-axis') as d3Selection.Selection<SVGGElement, unknown, HTMLElement, any>).call(
      d3Axis.axisBottom(xScale).ticks(10)
    );
  }, [xScale]);

  return <g className="axis x-axis" transform={`translate(${margin.left},${chartHeight + margin.top})`} />;
};

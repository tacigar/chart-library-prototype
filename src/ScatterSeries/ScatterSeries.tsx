import * as d3Selection from 'd3-selection';
import { useEffect, useRef } from 'react';
import { usePlotContext } from '../PlotContext';
import { PlotData } from '../types';

export interface ScatterSeriesProps {
  data: PlotData;
  fill?: string;
}

export const ScatterSeries: React.FC<ScatterSeriesProps> = ({ data, fill = '#abcdef' }) => {
  const rootEl = useRef<SVGGElement | null>(null);

  const { xScale, yScale, margin } = usePlotContext();

  useEffect(() => {
    if (!xScale || !yScale) {
      return;
    }

    d3Selection
      .select(rootEl.current)
      .selectAll('circle')
      .data(data.map(({ x, y }) => [x, y]))
      .join(
        (enter) =>
          enter
            .append('circle')
            .attr('cx', (d) => xScale(d[0]))
            .attr('cy', (d) => yScale(d[1]))
            .attr('r', 4)
            .attr('fill', fill),
        (update) => update,
        (exit) => exit.remove()
      );
  });

  return <g ref={rootEl} transform={`translate(${margin.left},${margin.top})`} />;
};

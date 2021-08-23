import * as d3Array from 'd3-array';
import * as d3Selection from 'd3-selection';
import React, { useEffect, useRef } from 'react';
import { usePlotContext } from '../PlotContext';

export interface CrossHairProps {}

export const CrossHair: React.FC<CrossHairProps> = () => {
  const rectEl = useRef<SVGRectElement | null>(null);
  const focusEl = useRef<SVGGElement | null>(null);
  const focusXLineEl = useRef<SVGLineElement | null>(null);
  const focusYLineEl = useRef<SVGLineElement | null>(null);
  const focusCircleEl = useRef<SVGCircleElement | null>(null);
  const { allData, chartWidth, chartHeight, margin, xScale, yScale } = usePlotContext();

  useEffect(() => {
    const focus = d3Selection.select(focusEl.current);
    const bisect = d3Array.bisector((d: { x: number }) => d.x).left;

    d3Selection
      .select(rectEl.current)
      .on('mouseover', () => focus.style('display', null))
      .on('mouseout', () => focus.style('display', 'none'))
      .on('mousemove', (event) => {
        if (!xScale || !yScale) {
          return;
        }
        const pointer = d3Selection.pointer(event);
        const x = xScale.invert(pointer[0]);
        const y = yScale.invert(pointer[1]);

        let nearlest: { x: number; y: number } | undefined;
        allData.forEach((data) => {
          const i = bisect(data, x);
          let d = data[i];
          if (i >= 1 && x - data[i - 1].x < d.x - x) {
            d = data[i - 1];
          }

          if (!nearlest) {
            nearlest = d;
          } else {
            if (Math.abs(nearlest.y - y) > Math.abs(d.y - y)) {
              nearlest = d;
            }
          }
        });

        if (nearlest) {
          d3Selection
            .select(focusXLineEl.current)
            .attr('x1', xScale(nearlest.x))
            .attr('x2', xScale(nearlest.x))
            .attr('y1', yScale(yScale.domain()[0]))
            .attr('y2', yScale(yScale.domain()[1]));
          d3Selection
            .select(focusYLineEl.current)
            .attr('x1', xScale(xScale.domain()[0]))
            .attr('x2', xScale(xScale.domain()[1]))
            .attr('y1', yScale(nearlest.y))
            .attr('y2', yScale(nearlest.y));
          d3Selection.select(focusCircleEl.current).attr('cx', xScale(nearlest.x)).attr('cy', yScale(nearlest.y));
        }
      });
  }, [allData, xScale, yScale]);

  return (
    <>
      <g ref={focusEl} transform={`translate(${margin.left},${margin.top})`}>
        <line ref={focusXLineEl} fill="none" stroke="#bdbdbd" strokeWidth="1px" />
        <line ref={focusYLineEl} fill="none" stroke="#bdbdbd" strokeWidth="1px" />
        <circle ref={focusCircleEl} fill="#456789" r="4" />
      </g>
      <rect
        ref={rectEl}
        width={chartWidth}
        height={chartHeight}
        transform={`translate(${margin.left},${margin.top})`}
        fill="none"
        stroke="none"
        pointerEvents="all"
      />
    </>
  );
};

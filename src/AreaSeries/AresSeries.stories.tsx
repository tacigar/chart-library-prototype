import { storiesOf } from '@storybook/react';
import { Plot } from '../Plot';
import { XAxis } from '../XAxis';
import { YAxis } from '../YAxis';
import { AreaSeries } from './AreaSeries';

storiesOf('AreaSeries', module).add('AreaSeries', () => (
  <Plot width={400} height={300}>
    <AreaSeries
      data={[
        { x: 10, y: 20 },
        { x: 20, y: 30 },
        { x: 30, y: 50 },
        { x: 40, y: 80 },
        { x: 50, y: 70 },
        { x: 60, y: 90 },
        { x: 70, y: 100 },
      ]}
    />
    <XAxis />
    <YAxis />
  </Plot>
));

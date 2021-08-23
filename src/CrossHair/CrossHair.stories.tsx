import { storiesOf } from '@storybook/react';
import { LineSeries } from '../LineSeries';
import { Plot } from '../Plot';
import { XAxis } from '../XAxis';
import { YAxis } from '../YAxis';
import { CrossHair } from './CrossHair';

storiesOf('CrossHair', module).add('CrossHair', () => (
  <Plot width={400} height={300}>
    <LineSeries
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
    <CrossHair />
  </Plot>
));

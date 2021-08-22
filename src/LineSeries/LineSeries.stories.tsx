import { storiesOf } from '@storybook/react';
import { Plot } from '../Plot';
import { XAxis } from '../XAxis';
import { LineSeries } from './LineSeries';

storiesOf('LineSeries', module).add('LineSeries', () => (
  <Plot width={400} height={300}>
    <LineSeries
      data={[
        { x: 10, y: 20 },
        { x: 20, y: 30 },
        { x: 30, y: 50 },
      ]}
    />
    <XAxis />
  </Plot>
));

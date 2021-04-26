import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    let data_list = []
    data_list.push(this.props.data)

    return (
      <Paper>
        <Chart
          data={data_list}
          height={250}
          width={600}
        >
          <ArgumentAxis />
          <ValueAxis max={1} />

          <BarSeries
            valueField="Total"
            argumentField="Photos"
            barWidth='8'
          />
          <Title text="Total Photos on our site" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

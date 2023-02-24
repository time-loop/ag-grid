import { AgChart, AgChartOptions } from 'ag-charts-community';
import { getData } from "./data";

const options: AgChartOptions = {
  container: document.getElementById('myChart'),
  autoSize: true,
  data: getData(),
  theme: {
    overrides: {
      bar: {
        series: {
          strokeWidth: 0,
        },
      },
    },
  },
  title: {
    text: 'Gross Weekly Earnings\nby Occupation (Q4 2019)',
    fontSize: 18,
  },
  subtitle: {
    text: 'Source: Office for\nNational Statistics',
  },
  series: [
    {
      type: 'bar',
      xKey: 'type',
      yKey: 'earnings',
    },
  ],
  axes: [
    {
      type: 'category',
      position: 'left',
    },
    {
      type: 'number',
      position: 'bottom',
      title: {
        enabled: true,
        text: '£/week',
      },
    },
  ],
  legend: {
    enabled: false,
  },
}

var chart = AgChart.create(options)

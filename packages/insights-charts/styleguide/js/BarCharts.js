import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class BarCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const data = {
      categories: getRandomCategories(dataPoints, 'ordinal'),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints, -10000000000, 10000, true),
        },
        {
          label: 'Loss',
          data: getRandomData(dataPoints, -10000000000, 10000, true),
        },
      ],
    };

    const singleSeriesData = {
      categories: getRandomCategories(dataPoints, 'ordinal'),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
      column: {
        layout: 'stacked',
      },
      axis: {
        y: [{
          ticks: 4,
          title: 'Left axis',
          orientation: 'bottom',
        }],
        x: {
          title: 'I am a x axis title',
          orientation: 'left',
        },
      },
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
      annotations: [{
        highestPoint: true,
        tooltip: {
          title: 'this is a title',
          message: 'this is a message',
        },
      }],
    };

    this.barChart = new ReflectChart(this.single, {
      type: 'column',
      data: singleSeriesData,
      options,
    });

    this.barChart.render();

    options.column.layout = 'grouped';

    this.groupedColumnChart = new ReflectChart(this.grouped, {
      type: 'column',
      data,
      options,
    });

    this.groupedColumnChart.render();

    options.column.layout = 'stacked';

    this.stackedColumnChart = new ReflectChart(this.stacked, {
      type: 'column',
      data,
      options,
    });

    this.stackedColumnChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.stackedColumnChart.render();
  }

  componentWillUnmount() {
    this.barChart.destroy();
    this.groupedColumnChart.destroy();
    this.stackedColumnChart.destroy();
  }

  render() {
    return (
      <div>
        <h1>Single series</h1>
        <div className="sg-chart" ref={ (c) => { this.single = c; } } />
        <h1>Grouped</h1>
        <div className="sg-chart" ref={ (c) => { this.grouped = c; } } />
        <h1>Stacked</h1>
        <div className="sg-chart" ref={ (c) => { this.stacked = c; } } />
      </div>
    );
  }
}

export default BarCharts;

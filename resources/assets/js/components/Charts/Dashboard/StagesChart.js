import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';

export default class StagesChart extends Component {
    render() {
        let data = {
            labels: ['STAGE 1', 'STAGE 2', 'STAGE 3', 'STAGE 4'],
            series: [
                [32, 48, 56, 51],
                [8, 18, 20, 10],
                [4, 8, 15, 24]
            ]
        };

        let options = {
            stackBars: true,
            low: 0,
            high: 95,
            axisY: {
                type: Chartist.FixedScaleAxis,
                ticks: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
                low: 0
            }
        };

        return (
            <ChartistGraph className="graph-stage" data={data} options={options} type="Bar" />
        )
    }
}
import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

export default class CallChart extends Component {
    render() {
        let data = {
            series: [30, 70]
        };

        let options = {
            donut: true,
            donutWidth: 30,
            startAngle: 270,
            donutSolid: true,
            showLabel: true,
            total: 200,
        };

        return (
            <ChartistGraph data={data} options={options} type="Pie" />
        )
    }
}
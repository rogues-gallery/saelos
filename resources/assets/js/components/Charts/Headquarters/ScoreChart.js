import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

export default class ScoreChart extends Component {
    render() {
        let data = {
            series: [79]
        };

        let options = {
            donut: true,
            donutWidth: 30,
            donutSolid: true,
            showLabel: true,
            total: 100,
        };

        return (
            <ChartistGraph data={data} options={options} type="Pie" />
        )
    }
}
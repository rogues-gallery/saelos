import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import PropTypes from 'prop-types';

export default class GaugeChart extends Component {
    render() {
        let options = {
            donut: true,
            donutWidth: 20,
            startAngle: 270,
            total: 200,
            showLabel: false
        };

        return (
            <ChartistGraph className="gauge-chart" data={this.props.data} options={options} type="Pie" />
        )
    }
}

GaugeChart.propTypes = {
    data: PropTypes.object.isRequired
}
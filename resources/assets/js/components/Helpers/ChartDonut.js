import React, { Component } from 'react';

import ChartistGraph from 'react-chartist';

export default class ChartDonut extends Component {
    render () {
        let data = {
            labels: ['Visits', 'Email', 'Call', 'Text', 'Outreach', 'Response'],
            series: [5, 4, 3, 7, 5, 10]
        };

        let options = {
            donut: true,
            donutWidth: 40,
            labelOffset: 20,
            labelDirection: 'explode'
        };

        let type = 'Pie';

        return (
            <ChartistGraph data={data} options={options} type={type} />
        );
    }
}

import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreChart extends Component {
    render() {
        let data = {
            series: [this.props.user.vector]
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

ScoreChart.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        user: store.authState.user,
    }
})(ScoreChart)
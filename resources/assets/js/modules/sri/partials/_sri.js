import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import { connect } from 'react-redux';

import * as MDIcons from 'react-icons/lib/md'

class SRI extends React.Component {
	render() {
		
		const data = {series: [[2, 3, 5, 7, 5, 8, 4, 5]] }
		const options = {
						low: 0,
						fullWidth: true,
						showArea: true, 
						showLabel: false,
					  axisX: {
					    showGrid: true,
					    showLabel: false,
					    offset: 0
					  },
					  axisY: {
					    showGrid: false,
					    showLabel: false,
					    offset: 0
					  },
}
	// @TODO Implement this hover as an 'upsell' for Savant (Saelos Cloud)
	//<div style={{position:"absolute", top: "50%", margin:"0 auto", textAlign: "center", width: "90%"}}><button type="button" className="btn btn-outline-primary">Learn More</button></div>
	
		return (
			<div className="sriValue">
				<div className="h1 text-center">0.75</div>
				<div className="text-center mini-text text-muted text-uppercase pb-2"><MDIcons.MdAccessTime /> EST <span className="text-dark">3 days</span> to close</div>
		
				<ScoreChart data={data} options={options} type="Line" />

				<div className="mini-text text-muted font-weight-bold text-uppercase mt-2">Next Action</div>
				<p>Send an email in 3 days</p>
			</div>
		)
	}
}


const ScoreChart = ({data, options, type}) => {
	return (
		<ChartistGraph data={data} options={options} type={type} className="sri-chart" />
	)
}

export default SRI
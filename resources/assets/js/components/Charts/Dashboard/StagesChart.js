import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import PropTypes from 'prop-types';
import {actionCreators} from "../../../actions";
import {connect} from 'react-redux';

require('chartist-plugin-tooltips');

class StagesChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stages: props.stages
        }
    }

    componentWillMount() {
        this.props.dispatch(actionCreators.fetchStages());
    }

    render() {
        let stagesData = {
            company: [],
            team: [],
            user: []
        };

        let labels = [];

        this.props.stages.map((stage) => {
            labels.push(stage.title);

            let companyInfo = {
                meta: 'There are ' + stage.deals.length + ' total opportunities in this stage.',
                value: stage.deals.length - stage.team_deals.length
            };

            let teamInfo = {
                meta: 'Your team has ' + stage.team_deals.length + ' in this stage.',
                value: stage.team_deals.length - stage.user_deals.length
            };

            let userInfo = {
                meta: 'You have ' + stage.user_deals.length + ' opportunities in this stage.',
                value: stage.user_deals.length
            };

            stagesData.company.push(companyInfo);
            stagesData.team.push(teamInfo);
            stagesData.user.push(userInfo);
        });

        let data = {
            labels: labels,
            series: [
                stagesData.user,
                stagesData.team,
                stagesData.company
            ]
        };

        let options = {
            stackBars: true,
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        return (
            this.props.isFetching ? '' :
            <ChartistGraph className="graph-stage" data={data} options={options} type="Bar" />
        )
    }
}

StagesChart.propTypes = {
    stages: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
}

export default connect((store) => {
    return {
        stages: store.stageState.data,
        isFetching: store.stageState.isFetching
    }
})(StagesChart)
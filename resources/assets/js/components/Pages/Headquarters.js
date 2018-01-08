import React, { Component } from 'react';

import Backend from '../Layouts/Backend';
import { actionCreators } from "../../actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loading from "../Helpers/Loading";
import Box from "../UI/Box";
import ScoreChart from "../Charts/Headquarters/ScoreChart";
import CallPanel from "../Panels/CallPanel";
import Gravatar from 'react-gravatar';

class Headquarters extends Component {
    componentWillMount() {
        this.props.dispatch(actionCreators.fetchTasks());
    }

    _toggleGraphPanel() {
        document.querySelector('div.my-vector').classList.toggle('call-panel-open');
    }

    render() {
        console.log(this.props.tasks);

        let results = this.props.tasks.map((task) => {
            return <Task key={task.id} task={task} />
        });

        return (
            this.props.isFetching ? <Backend><Loading /></Backend> :
                <Backend>
                    <div className="content-inner">
                        <div className="headquarters flex-row-even">
                            <div style={{flexGrow: 2}}>
                                <h1>Contact Today</h1>
                                <table>
                                    <tbody>
                                    {results}
                                    </tbody>
                                </table>
                            </div>
                            <Box title="SCORE" classes="bordered">
                                <div className="graph-score">
                                    <ScoreChart/>
                                </div>

                                <div className="my-vector">
                                    <div onClick={this._toggleGraphPanel.bind(this)}>
                                        <strong>Volume: </strong> <span>Averaging 100 daily calls</span>
                                    </div>
                                    <div onClick={this._toggleGraphPanel.bind(this)}>
                                        <strong>Emails: </strong> <span>Averaging 100 daily calls</span>
                                    </div>
                                    <div onClick={this._toggleGraphPanel.bind(this)}>
                                        <strong>Calls: </strong> <span>Averaging 100 daily calls</span>
                                    </div>
                                    <div onClick={this._toggleGraphPanel.bind(this)}>
                                        <strong>Texts: </strong> <span>Averaging 100 daily calls</span>
                                    </div>
                                    <div onClick={this._toggleGraphPanel.bind(this)}>
                                        <strong>Opportunities: </strong> <span>Averaging 100 daily calls</span>
                                    </div>
                                    <div onClick={this._toggleGraphPanel.bind(this)}>
                                        <strong>Responses: </strong> <span>Averaging 100 daily calls</span>
                                    </div>

                                    <CallPanel/>
                                </div>
                            </Box>
                        </div>
                    </div>
                </Backend>
        );
    }
}

Headquarters.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};

class TaskHeader extends Component {
    render() {
        return (
            <tr className="heading">
                <td colSpan={5}>{this.props.header.title}</td>
            </tr>
        )
    }
}

TaskHeader.propTypes = {
    header: PropTypes.object.isRequired
}

class Task extends Component {
    render() {
        return (
            <tr>
                <td className="min-width">
                    <div className={'status '}>
                        <i className="md-icon">check</i>
                    </div>

                    <div className="title-wrapper">
                        <div className="title">{this.props.task.first_name} {this.props.task.last_name}</div>
                        <div className="subtitle">{this.props.task.company.name}</div>
                    </div>
                </td>

                <td>
                    <div className="avatar">
                        <Gravatar email={this.props.task.email} size={44} />
                    </div>
                    <div className="title-wrapper">
                        <div className="title">{this.props.task.first_name} {this.props.task.last_name}</div>
                    </div>
                </td>
            </tr>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        tasks: store.taskState.data,
        user: store.authState.user,
        isFetching: store.taskState.isFetching,
        pagination: store.taskState.pagination
    };
})(Headquarters)

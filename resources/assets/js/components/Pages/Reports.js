import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import Loading from '../Helpers/Loading';
import {actionCreators} from "../../actions";
import { NavLink } from 'react-router-dom';

class Reports extends Component {
    componentWillMount() {
        this.props.dispatch(actionCreators.fetchReports());
    }

    render() {
        let results = this.props.data.map((report) => {
            return <ReportRow key={report.id} report={report} />
        });

        return (
            this.props.isFetching && this.props.data.length === 0 ? <Backend><Loading /></Backend> :
            <Backend>
                <div className="content-inner">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>{results}</tbody>
                        </table>
                    </div>
                </div>
            </Backend>
        );
    }
}

Reports.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
}

class ReportRow extends Component {
    render() {
        return (
            <tr className={"report-row-" + this.props.report.id}>
                <td>
                    <NavLink to={"/reports/" + this.props.report.id}>
                        {this.props.report.name}
                    </NavLink>
                </td>
                <td>{this.props.report.description}</td>
            </tr>
        )
    }
}

ReportRow.propTypes = {
    report: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        data: store.reportState.data,
        pagination: store.reportState.pagination,
        isFetching: store.reportState.isFetching
    };
})(Reports)

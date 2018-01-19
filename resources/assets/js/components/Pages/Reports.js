import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import Loading from '../Helpers/Loading';
import {actionCreators} from "../../actions";
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

class Reports extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(actionCreators.fetchReports());
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchReports(page.selected + 1));
    }

    render() {
        let results = this.props.data.map((report) => {
            return <ReportRow key={report.id} report={report} />
        });

        let initialPage = 0;
        let pageCount = 10;

        if (this.props.pagination.hasOwnProperty('current_page')) {
            initialPage = this.props.pagination.current_page - 1;
        }

        if (this.props.pagination.hasOwnProperty('last_page')) {
            pageCount = this.props.pagination.last_page;
        }

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

                    <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} pageCount={pageCount} containerClassName="pagination" />
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

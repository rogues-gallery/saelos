import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import Loading from '../Helpers/Loading';
import {actionCreators} from "../../actions";
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

class Report extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
    }

    componentWillMount() {
        let id = this.props.match.params.id;

        this.props.dispatch(actionCreators.fetchReport(id));
    }

    _navToPage(page) {
        let id = this.props.match.params.id;

        this.props.dispatch(actionCreators.fetchReport(id, page.selected + 1));
    }

    render() {
        if (Object.keys(this.props.report).length === 0) {
            return <Backend><Loading/></Backend>;
        }

        let results = this.props.report.data.data.map((row) => {
            return <ReportItem key={row.id} item={row} columns={this.props.report.columns} />
        });

        let initialPage = 0;
        let pageCount = 10;

        if (this.props.report.data.hasOwnProperty('current_page')) {
            initialPage = this.props.report.data.current_page - 1;
        }

        if (this.props.report.data.hasOwnProperty('last_page')) {
            pageCount = this.props.report.data.last_page;
        }

        let headerRow = this.props.report.columns.map((header, index) => {
            return <th key={index}>{header}</th>
        });

        return (
            <Backend>
                <div className="content-inner">
                    <div className="table-responsive">
                        <h1>{this.props.report.name}</h1>
                        <p>{this.props.report.description}</p>
                        <table>
                            <thead>
                            <tr>
                                {headerRow}
                            </tr>
                            </thead>
                            <tbody>{results}</tbody>
                        </table>
                    </div>

                    <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} disableInitialCallback={true} pageCount={pageCount} containerClassName="pagination" />
                </div>
            </Backend>
        )
    }
}

Report.propTypes = {
    report: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dataFetched: PropTypes.bool.isRequired
}

class ReportItem extends Component {
    render() {
        let cells = this.props.columns.map((column, index) => {
            if (/custom_fields/.test(column)) {
                column = column + '.value';
            }

            let cellValue = _.get(this.props.item, column);

            return <td key={index}>{cellValue}</td>
        });

        return (
            <tr>
                {cells}
            </tr>
        )
    }
}

ReportItem.propTypes = {
    item: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired
}

export default connect((store) => {
    return {
        report: store.reportState.singleReport,
        isFetching: store.reportState.isFetching,
        dataFetched: store.reportState.dataFetched
    }
})(Report);


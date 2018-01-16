import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import Loading from '../Helpers/Loading';
import {actionCreators} from "../../actions";
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import * as types from '../../actions/types';

class Report extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
        this._initReportDownload = this._initReportDownload.bind(this);
        this._openReportFlyout = this._openReportFlyout.bind(this);
    }

    componentWillMount() {
        let id = this.props.match.params.id;

        this.props.dispatch(actionCreators.fetchReport(id));
    }

    _navToPage(page) {
        let id = this.props.match.params.id;

        this.props.dispatch(actionCreators.fetchReport(id, page.selected + 1));
    }

    _initReportDownload() {
        actionCreators.downloadReport(this.props.report.id);
    }

    _openReportFlyout(data, dataSource) {
        switch(dataSource) {
            case 'App\\Person':
                this.props.dispatch({
                    type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
                    data: data
                });

                document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
                break;
            case 'App\\Deal':
                this.props.dispatch({
                    type: types.FETCHING_OPPORTUNITY_FOR_FLYOUT_SUCCESS,
                    data: data
                });

                document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-panel-open');
                break;
            case 'App\\Company':
                this.props.dispatch({
                    type: types.FETCHING_ACCOUNT_FOR_FLYOUT_SUCCESS,
                    data: data
                });

                document.getElementById('account-panel-wrapper').classList.toggle('account-panel-open');
                break;
        }

        document.querySelector('body').classList.toggle('panel-open');
    }

    render() {
        if (Object.keys(this.props.report).length === 0) {
            return <Backend><Loading/></Backend>;
        }

        let results = this.props.report.data.data.map((row) => {
            return <ReportItem key={row.id} item={row} columns={this.props.report.columns} openFlyout={this._openReportFlyout} dataSource={this.props.report.data_source} />
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

        let showDetails = ((report) => {
            switch (report.data_source) {
                case 'App\\Person':
                case 'App\\Deal':
                case 'App\\Company':
                    return true;
                default:
                    return false;
            }

        })(this.props.report);

        return (
            <Backend>
                <div className="content-inner">
                    <div className="table-responsive">
                        <h1>{this.props.report.name}</h1>
                        <p>{this.props.report.description}</p>
                        <button className="button button-primary" onClick={this._initReportDownload}>
                            <i className="md-icon">download</i> Download
                        </button>
                        <table>
                            <thead>
                            <tr>
                                {showDetails ? <th>Details</th> : null}
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
    _openReportFlyout(data, dataSource) {
        this.props.openFlyout(data, dataSource);
    }

    render() {
        let cells = this.props.columns.map((column, index) => {
            if (/custom_fields/.test(column)) {
                column = column + '.value';
            }

            let cellValue = _.get(this.props.item, column);

            return <td key={index}>{cellValue}</td>
        });


        let firstColumn = ((dataSource) => {
            switch (dataSource) {
                case 'App\\Person':
                case 'App\\Deal':
                case 'App\\Company':
                    return <td onClick={this._openReportFlyout.bind(this, this.props.item, this.props.dataSource)}>Details</td>
                default:
                    return false;
            }

        })(this.props.dataSource);

        return (
            <tr>
                {firstColumn ? firstColumn : null}
                {cells}
            </tr>
        )
    }
}

ReportItem.propTypes = {
    item: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    openFlyout: PropTypes.func.isRequired,
    dataSource: PropTypes.string.isRequired
}

export default connect((store) => {
    return {
        report: store.reportState.singleReport,
        isFetching: store.reportState.isFetching,
        dataFetched: store.reportState.dataFetched
    }
})(Report);


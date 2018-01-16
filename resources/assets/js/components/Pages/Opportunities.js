import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { actionCreators } from '../../actions';
import Loading from '../Helpers/Loading';
import { InfoboxOpportunity } from "../UI/Infobox";
import * as types from "../../actions/types";
import Filter from '../Helpers/Filter';

class Opportunities extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
        this._toggleNewPanel = this._toggleNewPanel.bind(this);
    }

    _toggleNewPanel() {
        document.getElementById('opportunity-panel-wrapper').classList.toggle('account-panel-open');
        document.querySelector('body').classList.toggle('panel-open');

        // Set the form state for a new contact
        this.props.dispatch({
            type: types.FETCHING_OPPORTUNITY_FOR_FLYOUT_SUCCESS,
            data: {}
        });
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchOpportunities(page.selected + 1));
    }

    render() {
        let results = this.props.opportunities.map((opportunity) => {
            return <InfoboxOpportunity key={opportunity.id} opportunity={opportunity} />
        });

        let initialPage = 0;
        let pageCount = 10;

        if (this.props.pagination.hasOwnProperty('current_page')) {
            initialPage = this.props.pagination.current_page - 1;
        }

        if (this.props.pagination.hasOwnProperty('last_page')) {
            pageCount = this.props.pagination.last_page;
        }

        let filterFields = {
            name: null,
            amount: null
        }

        return (
            this.props.isFetching && this.props.opportunities.length === 0 ? <Backend><Loading /></Backend> :
            <Backend>
                <div className="content-inner">
                    <div className="content-top flex-row-even">
                        <Filter onInputChange={actionCreators.fetchOpportunities} filterFields={filterFields} type="opportunities" />
                        <div className="content-top-buttons">
                            <span className="create-button button button-primary" onClick={this._toggleNewPanel}>
                                <i className="md-icon">add</i> <span>Create Opportunity</span>
                            </span>
                        </div>
                    </div>
                    <div className="opportunities flex-row-even">
                        {results}
                    </div>
                    <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} pageCount={pageCount} containerClassName="pagination" />
                </div>
            </Backend>
        );
    }
}

Opportunities.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    opportunities: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        opportunities: store.opportunityState.data,
        pagination: store.opportunityState.pagination,
        isFetching: store.opportunityState.isFetching,
        opportunityUpdated: store.accountState.opportunityUpdated
    };
})(Opportunities)

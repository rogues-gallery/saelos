import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { actionCreators } from '../../actions';
import Loading from '../Helpers/Loading';
import { InfoboxOpportunity } from "../UI/Infobox";
import * as types from "../../actions/types";
import OpportunityPanel from '../Panels/OpportunityPanel'
import Filter from '../Helpers/Filter';

class Opportunities extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
        this._getNewOpportunity = this._getNewOpportunity.bind(this);
        this._toggleNewPanel = this._toggleNewPanel.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(actionCreators.fetchOpportunities());
    }

    _toggleNewPanel() {
        document.querySelector('.opportunity-item-new').classList.toggle('opportunity-panel-open');

        // Set the form state for a new contact
        this.props.dispatch({type: types.FETCHING_SINGLE_OPPORTUNITY_SUCCESS, data: this._getNewOpportunity()});
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchOpportunities(page.selected + 1));
    }

    _getNewOpportunity() {
        let customFieldDefinitions = {};

        this.props.opportunities.length !== 0 ? Object.keys(this.props.opportunities[0].custom_fields).map((key, index) => {
            let thisField = this.props.opportunities[0].custom_fields[key];

            thisField.value = null;

            customFieldDefinitions[thisField.alias] = thisField;
        }) : {};

        return {
            id: 'new',
            custom_fields: customFieldDefinitions
        }
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
                    <Filter onInputChange={actionCreators.fetchOpportunities} filterFields={filterFields} type="opportunities" />
                    <div className="button button-primary" onClick={this._toggleNewPanel}>
                        <i className="md-icon">add</i> <span>Create Account</span>
                    </div>
                    <div className="opportunity-item-new">
                        <OpportunityPanel opportunity={this._getNewOpportunity()} />
                    </div>
                    <div className="opportunities flex-row-even">
                        {results}
                    </div>
                    <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} disableInitialCallback={true} pageCount={pageCount} containerClassName="pagination" />
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

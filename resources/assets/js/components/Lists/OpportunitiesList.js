import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import { actionCreators } from '../../actions';
import { InfoboxOpportunity } from "../UI/Infobox";
import Loading from '../Helpers/Loading';

class OpportunitiesList extends Component {

    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this)
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchOpportunities(page.selected + 1, this.props.search));
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

        return (
            this.props.isFetching && this.props.opportunities.length === 0 ? <Loading /> :
            <div>
                <div className="opportunities flex-row-even">
                    {results}
                </div>
                <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} pageCount={pageCount} containerClassName="pagination" />
            </div>
        );
    }
}

OpportunitiesList.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    opportunities: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        opportunities: store.opportunityState.data,
        pagination: store.opportunityState.pagination,
        isFetching: store.opportunityState.isFetching,
        opportunityUpdated: store.accountState.opportunityUpdated,
        search: store.opportunityState.search
    }
})(OpportunitiesList);
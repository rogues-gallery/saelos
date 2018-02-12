import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { actionCreators } from '../../actions';
import { InfoboxOpportunity } from "../UI/Infobox";
import Loading from '../Helpers/Loading';
import { getInitialPage, getPageCount } from "../../utils/helpers";

const getResults = (opportunities) => {
    return opportunities.map((opportunity) => {
        return <InfoboxOpportunity key={opportunity.id} opportunity={opportunity} />
    });
};

const OpportunitiesList = ({dispatch, search, opportunities, pagination, isFetching}) => {
    const navToPage = (page) => {
        dispatch(actionCreators.fetchOpportunities(page.selected + 1, search));
    };

    return (
        isFetching && opportunities.length === 0 ? <Loading /> :
        <div>
            <div className="opportunities flex-row-even">
                {getResults(opportunities)}
            </div>
            <ReactPaginate onPageChange={navToPage} initialPage={getInitialPage(pagination)} pageCount={getPageCount(pagination)} containerClassName="pagination" />
        </div>
    );
};

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
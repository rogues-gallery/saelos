import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { actionCreators } from '../../actions';
import InfoboxAccount from "../UI/Infobox/InfoboxAccount";
import Loading from '../Helpers/Loading';
import { getPageNumber, getPageCount } from "../../utils/helpers";

const getResults = (accounts) => {
    return accounts.map((account) => {
        return <InfoboxAccount key={account.id} account={account} />
    });
};

const AccountsList = ({dispatch, search, accounts, isFetching, pagination}) => {
    const navToPage = (page) => {
        dispatch(actionCreators.fetchAccounts(page.selected + 1, search));
    };

    return (
        isFetching && accounts.length === 0 ? <Loading /> :
        <div>
            <div className="accounts flex-row-even">
                {getResults(accounts)}
            </div>

            <ReactPaginate onPageChange={navToPage} initialPage={getPageNumber(pagination)} pageCount={getPageCount(pagination)} containerClassName="pagination" />
        </div>
    )
};

AccountsList.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    accounts: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        accounts: store.accountState.data,
        pagination: store.accountState.pagination,
        isFetching: store.accountState.isFetching,
        accountUpdated: store.accountState.accountUpdated,
        search: store.accountState.search
    }
})(AccountsList);
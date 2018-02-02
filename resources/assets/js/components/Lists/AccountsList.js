import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { actionCreators } from '../../actions';
import InfoboxAccount from "../UI/Infobox/InfoboxAccount";
import Loading from '../Helpers/Loading';

class AccountsList extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchAccounts(page.selected + 1, this.props.search));
    }

    render() {
        let results = this.props.accounts.map((account) => {
            return <InfoboxAccount key={account.id} account={account} />
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
            this.props.isFetching && this.props.accounts.length === 0 ? <Loading /> :
            <div>
                <div className="accounts flex-row-even">
                    {results}
                </div>

                <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} pageCount={pageCount} containerClassName="pagination" />
            </div>
        )
    }
}

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
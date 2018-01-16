import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { actionCreators } from '../../actions';
import Loading from '../Helpers/Loading';
import InfoboxAccount from "../UI/Infobox/InfoboxAccount";
import AccountPanel from '../Panels/AccountPanel';
import Filter from '../Helpers/Filter';
import * as types from "../../actions/types";

class Accounts extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
        this._getNewAccount = this._getNewAccount.bind(this);
        this._toggleNewPanel = this._toggleNewPanel.bind(this);
    }

    _toggleNewPanel() {
        document.getElementById('account-panel-wrapper').classList.toggle('account-panel-open');
        document.querySelector('body').classList.toggle('panel-open');

        // Set the form state for a new contact
        this.props.dispatch({
            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
            data: {
                custom_fields: []
            }
        });
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchAccounts(page.selected + 1));
    }

    _getNewAccount() {
        let customFieldDefinitions = {};

        this.props.accounts.length !== 0 ? Object.keys(this.props.accounts[0].custom_fields).map((key) => {
            let thisField = this.props.accounts[0].custom_fields[key];

            thisField.value = null;

            customFieldDefinitions[thisField.alias] = thisField;
        }) : {};

        return {
            id: 'new',
            custom_fields: customFieldDefinitions
        }
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

        let filterFields = {
            name: null,
            city: null,
            state: null
        }

        return (
            this.props.isFetching && this.props.accounts.length === 0 ? <Backend><Loading /></Backend> :
            <Backend>
                <div className="content-inner">
                    <div className="content-top flex-row-even">
                        <Filter onInputChange={actionCreators.fetchAccounts} filterFields={filterFields} type="accounts" />
                        <div className="content-top-buttons">
                            <span className="create-button button button-primary" onClick={this._toggleNewPanel}>
                                <i className="md-icon">add</i> <span>Create Account</span>
                            </span>
                        </div>
                    </div>

                    <div className="accounts flex-row-even">
                        {results}
                    </div>
                    <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} pageCount={pageCount} containerClassName="pagination" />
                </div>
            </Backend>
        );
    }
}

Accounts.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    accounts: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        accounts: store.accountState.data,
        pagination: store.accountState.pagination,
        isFetching: store.accountState.isFetching,
        accountUpdated: store.accountState.accountUpdated
    };
})(Accounts)

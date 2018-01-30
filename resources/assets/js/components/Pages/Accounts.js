import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { actionCreators } from '../../actions';
import Filter from '../Helpers/Filter';
import * as types from "../../actions/types";
import AccountsList from '../Lists/AccountsList';

class Accounts extends Component {

    constructor(props) {
        super(props);

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
        let filterFields = {
            name: null,
            city: null,
            state: null
        };

        return (
            <Backend>
                <div className="content-inner">
                    <div className="content-top flex-row-even">
                        <Filter onInputChange={actionCreators.fetchAccounts} filterFields={filterFields} type="accounts" />
                        <div className="content-top-buttons">
                            <span className="create-button button button-primary" onClick={this._toggleNewPanel}>
                                <span>Create Account</span>
                            </span>
                        </div>
                    </div>

                    <AccountsList/>
                </div>
            </Backend>
        );
    }
}

Accounts.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    accounts: PropTypes.array.isRequired
};

export default connect((store) => {
    return {
        accounts: store.accountState.data,
        isFetching: store.accountState.isFetching,
        accountUpdated: store.accountState.accountUpdated
    };
})(Accounts)

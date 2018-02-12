import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { actionCreators } from '../../actions';
import Filter from '../Helpers/Filter';
import * as types from "../../actions/types";
import AccountsList from '../Lists/AccountsList';
import { togglePanel, togglePreventContentScroll } from '../../utils/helpers';

class Accounts extends Component {

    constructor(props) {
        super(props);

        this._toggleNewPanel = this._toggleNewPanel.bind(this);
    }

    _toggleNewPanel() {
        togglePanel('account-panel-wrapper', 'account-panel-open');
        togglePreventContentScroll();

        // Set the form state for a new contact
        this.props.dispatch({
            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
            data: {
                custom_fields: []
            }
        });
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
    dispatch: PropTypes.func.isRequired
};

export default connect()(Accounts)

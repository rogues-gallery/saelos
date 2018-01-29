import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import Filter from '../Helpers/Filter';
import { actionCreators } from '../../actions';
import * as types from "../../actions/types";
import ContactsList from '../Lists/ContactsList';

class Contacts extends Component {
    constructor(props) {
        super(props);

        this._toggleNewPanel = this._toggleNewPanel.bind(this);
    }

    _toggleNewPanel() {
        document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
        document.querySelector('body').classList.toggle('panel-open');

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
            first_name: null,
            last_name: null,
            email: null
        }

        return (
            <Backend>
                <div className="content-inner">
                    <div className="content-top flex-row-even">
                        <Filter onInputChange={actionCreators.fetchContacts} filterFields={filterFields} type="contacts" />
                        <div className="content-top-buttons">
                            <span className="create-button button button-primary" onClick={this._toggleNewPanel}>
                                <span>Create Contact</span>
                            </span>
                        </div>
                    </div>
                    <ContactsList />
                </div>
            </Backend>
        );
    }
}

Contacts.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export default connect()(Contacts)

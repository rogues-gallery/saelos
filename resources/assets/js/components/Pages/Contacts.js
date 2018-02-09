import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import Filter from '../Helpers/Filter';
import { actionCreators } from '../../actions';
import * as types from "../../actions/types";
import ContactsList from '../Lists/ContactsList';

const toggleNewPanel = (dispatch) => {
    document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
    document.querySelector('body').classList.toggle('panel-open');

    // Set the form state for a new contact
    dispatch({
        type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
        data: {
            custom_fields: []
        }
    });
};

const filterFields = {
    first_name: null,
    last_name: null,
    email: null
};

const Contacts = ({ dispatch }) => (
    <Backend>
        <div className="content-inner">
            <div className="content-top flex-row-even">
                <Filter onInputChange={actionCreators.fetchContacts} filterFields={filterFields} type="contacts" />
                <div className="content-top-buttons">
                    <span className="create-button button button-primary" onClick={() => toggleNewPanel(dispatch)}>
                        <span>Create Contact</span>
                    </span>
                </div>
            </div>
            <ContactsList />
        </div>
    </Backend>
);

Contacts.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export default connect()(Contacts)

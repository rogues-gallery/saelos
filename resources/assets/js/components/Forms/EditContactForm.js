import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Money } from 'react-format';
import { connect } from 'react-redux';
import { customFieldsHelper } from '../../utils/helpers';
import * as types from "../../actions/types";
import Select from 'react-select';
import {actionCreators} from "../../actions";

let _ = require('lodash');

class EditContactForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._openOpportunityPanel = this._openOpportunityPanel.bind(this);
        this._setCompanyForContact = this._setCompanyForContact.bind(this);

        this.state = {
            formState: props.contact
        }
    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let contactState = this.state.formState;

        // Special handling for custom field state
        if (/custom_fields\./.test(name)) {
            let customField = this.props.customFields[_.split(name, '.')[1]];
            let contactCustomFieldIndex = _.findIndex(contactState.custom_fields, (o) => o.custom_field_id === customField.field_id);

            if (contactCustomFieldIndex >= 0) {
                contactState.custom_fields[contactCustomFieldIndex].value = value;
            } else {
                contactState.custom_fields.push({
                    custom_field_id: customField.field_id,
                    value: value
                });
            }
        } else {
            _.set(contactState, name, value);
        }

        this.setState({formState: contactState});

        this.props.setFormState(contactState)
    }

    _openOpportunityPanel(data) {
        if (JSON.stringify(data) === '{}') {
            data = {
                people: [
                    {
                        id: this.props.contact.id,
                        is_primary: true
                    }
                ]
            };
        }

        this.props.dispatch({
            type: types.FETCHING_OPPORTUNITY_FOR_FLYOUT_SUCCESS,
            data: data
        });

        document.getElementById('contact-panel-wrapper').classList.toggle('opportunity-panel-open');
        document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-panel-open');
        document.querySelector('body').classList.toggle('panel-open');
    }

    _searchCompanies(input, callback) {
        let search = '';

        if (input && input.length > 0) {
            search = {
                name: input
            }
        }

        return actionCreators.searchAccounts(search)
            .then((companies) => {
                let options = companies.map((company) => {
                    return {
                        value: company.id,
                        label: company.name
                    }
                });

                callback(null, {options: options})

                return {options: options};
            });
    }

    _setCompanyForContact(value) {
        let selectedId = value ? value.value : null;
        let selectedName = value ? value.label : null;

        let event = {
            target: {
                type: 'select',
                name: 'company',
                value: {
                    id: selectedId,
                    name: selectedName
                }
            }
        };

        this._handleInputChange(event);
    }

    render() {
        let customFields = customFieldsHelper(this.props.contact, this.props.customFields, this._handleInputChange);
        let lastInteraction = this.props.contact.activities && this.props.contact.activities.length ? this.props.contact.activities.slice(-1)[0].description : 'None';
        let totalValue = _.sum(_.map(this.props.contact.deals, 'amount'));
        let opportunities = this.props.contact.deals.map((deal) => {
            return (
                <div key={deal.id} className="contact-opportunity">
                    <div className="contact-opportunity-title" onClick={this._openOpportunityPanel.bind(this, deal)}>
                        {deal.name}
                    </div>
                </div>
            )
        });

        return (
            <form id="contact-details-form">
                <div className="panel-contact-details-column">
                    <span className="button button-primary" onClick={this._openOpportunityPanel.bind(this, {})}>
                        Create Opportunity
                    </span>

                    <div className="input-container">
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="Phone" defaultValue={this.props.contact.phone} onChange={this._handleInputChange} />
                    </div>

                    <div className="input-container">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" defaultValue={this.props.contact.email} onChange={this._handleInputChange} />
                    </div>

                    <div className="input-container">
                        <label>Address</label>
                        <input type="text" name="address1" placeholder="Address 1" defaultValue={this.props.contact.address1} onChange={this._handleInputChange} />
                        <input type="text" name="address2" placeholder="Address 2" defaultValue={this.props.contact.address2} onChange={this._handleInputChange} />
                        <input type="text" name="city" placeholder="City" defaultValue={this.props.contact.city} onChange={this._handleInputChange} />
                        <input type="text" name="state" placeholder="State" defaultValue={this.props.contact.state} onChange={this._handleInputChange} />
                        <input type="text" name="zip" placeholder="Zip" defaultValue={this.props.contact.zip} onChange={this._handleInputChange} />
                    </div>

                    <div className="input-container">
                        <label>Company</label>
                        <Select.Async
                            multi={false}
                            value={this.state.formState.company ? {value: this.state.formState.company.id, label: this.state.formState.company.name} : null}
                            onChange={this._setCompanyForContact}
                            filterOptions={(options) => options}
                            onInputChange={(inputValue) => {
                                console.log(inputValue);
                            }}
                            loadOptions={this._searchCompanies} />
                    </div>

                    <div className="input-container opportunities">
                        <label>Opportunities</label>
                        {opportunities}
                    </div>
                </div>
                <div className="panel-contact-details-column">
                    <div className="input-container">
                        <label>Last Interaction</label>
                        <p>{lastInteraction}</p>
                    </div>

                    <div className="input-container">
                        <label>Value</label>
                        <p><Money>{totalValue}</Money></p>
                    </div>

                    {customFields}
                </div>
            </form>
        )
    }
}

EditContactForm.propTypes = {
    contact: PropTypes.object.isRequired,
    setFormState: PropTypes.func.isRequired,
    dataUpdated: PropTypes.bool.isRequired,
    customFields: PropTypes.object.isRequired,
    companies: PropTypes.array.isRequired
}

export default connect((store) => {
    return {
        contact: store.contactFlyoutState.data,
        dataUpdated: store.contactFlyoutState.dataUpdated,
        customFields: store.customFieldsState.contactFields,
        companies: store.accountState.data
    }
})(EditContactForm);
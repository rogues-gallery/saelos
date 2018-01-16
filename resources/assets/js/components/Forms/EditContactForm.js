import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Money } from 'react-format';
import { connect } from 'react-redux';
import { customFieldsHelper } from '../../utils/helpers';

let _ = require('lodash');

class EditContactForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);

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

        this.props.setFormState(contactState)
    }

    render() {
        let customFields = customFieldsHelper(this.props.contact, this.props.customFields, this._handleInputChange);
        let lastInteraction = this.props.contact.activities && this.props.contact.activities.length ? this.props.contact.activities.slice(-1)[0].description : 'None';
        let totalValue = _.sum(_.map(this.props.contact.deals, 'amount'));

        return (
            <form id="contact-details-form">
                <div className="panel-contact-details-column">
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

                    {this.props.contact.company ?
                        <div className="input-container">
                            <label>Company</label>
                            <input type="text" name="company.address1" placeholder="Address 1" defaultValue={this.props.contact.company.address1} onChange={this._handleInputChange} />
                            <input type="text" name="company.address2" placeholder="Address 2" defaultValue={this.props.contact.company.address2} onChange={this._handleInputChange} />
                            <input type="text" name="company.city" placeholder="City" defaultValue={this.props.contact.company.city} onChange={this._handleInputChange} />
                            <input type="text" name="company.state" placeholder="State" defaultValue={this.props.contact.company.state} onChange={this._handleInputChange} />
                            <input type="text" name="company.zip" placeholder="Zip" defaultValue={this.props.contact.company.zip} onChange={this._handleInputChange} />
                        </div>
                        : ''}
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
    customFields: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        contact: store.contactFlyoutState.data,
        dataUpdated: store.contactFlyoutState.dataUpdated,
        customFields: store.customFieldsState.contactFields
    }
})(EditContactForm);
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {customFieldsHelper} from "../../utils/helpers";

class NewContactForm extends Component {
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

        this.setState({
            formState: contactState
        });

        this.props.setFormState(contactState)
    }

    render() {
        let customFields = customFieldsHelper({}, this.props.customFields, this._handleInputChange);

        return (
            <form id="contact-details-form">
                <div className="panel-contact-details-column">
                    <div className="input-container">
                        <label>Name</label>
                        <input type="text" name="first_name" placeholder="First Name" onChange={this._handleInputChange} />
                        <input type="text" name="last_name" placeholder="Last Name" onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="Phone" onChange={this._handleInputChange} />
                    </div>

                    <div className="input-container">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" onChange={this._handleInputChange} />
                    </div>

                    <div className="input-container">
                        <label>Address</label>
                        <input type="text" name="address1" placeholder="Address 1" onChange={this._handleInputChange} />
                        <input type="text" name="address2" placeholder="Address 2" onChange={this._handleInputChange} />
                        <input type="text" name="city" placeholder="City" onChange={this._handleInputChange} />
                        <input type="text" name="state" placeholder="State" onChange={this._handleInputChange} />
                        <input type="text" name="zip" placeholder="Zip" onChange={this._handleInputChange} />
                    </div>

                    {this.props.contact.company ?
                        <div className="input-container">
                            <label>Company</label>
                            {this.props.contact.id === 'new' ? <input type="text" name="company.name" placeholder="Company Name" onChange={this._handleInputChange} /> : ''}
                            <input type="text" name="company.address1" placeholder="Address 1" onChange={this._handleInputChange} />
                            <input type="text" name="company.address2" placeholder="Address 2" onChange={this._handleInputChange} />
                            <input type="text" name="company.city" placeholder="City" onChange={this._handleInputChange} />
                            <input type="text" name="company.state" placeholder="State" onChange={this._handleInputChange} />
                            <input type="text" name="company.zip" placeholder="Zip" onChange={this._handleInputChange} />
                        </div>
                        : ''}
                </div>
                <div className="panel-contact-details-column">
                    {customFields}
                </div>
            </form>
        )
    }
}

NewContactForm.propTypes = {
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
})(NewContactForm);
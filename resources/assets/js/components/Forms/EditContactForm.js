import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Money } from 'react-format';

let _ = require('lodash');

class EditContactForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._getCustomFields = this._getCustomFields.bind(this);
    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let contactState = this.props.contact;

        // Special handling for custom field state
        if (/custom_fields/.test(name)) {
            name = name + '.value';
        }

        _.set(contactState, name, value);

        this.props.setFormState(contactState)
    }

    _getCustomFields() {
        return Object.keys(this.props.contact.custom_fields).map((key, index) => {
            let thisField = this.props.contact.custom_fields[key];
            let input = '';

            switch (thisField.type) {
                case 'select':
                case 'picklist':
                    let options = Object.keys(thisField.options).map((option, i) => {
                        return <option key={i} value={option}>{thisField.options[option]}</option>
                    });

                    input = <select name={"custom_fields." + thisField.alias} defaultValue={thisField.value} onChange={this._handleInputChange}>
                        {options}
                    </select>
                    break;
                case 'lookup':
                case 'text':
                default:
                    input = <input type="text" name={"custom_fields." + thisField.alias} onChange={this._handleInputChange} defaultValue={thisField.value} placeholder={thisField.label} />
                    break;
            }


            return (
                <div key={index} className="input-container">
                    <label>{thisField.label}</label>
                    {input}
                </div>
            )
        });
    }

    render() {
        let customFields = this._getCustomFields();
        let lastInteraction = this.props.contact.activities.slice(-1)[0];
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
                        <p>{typeof lastInteraction === 'object' ? lastInteraction.description : 'None'}</p>
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
    setFormState: PropTypes.func.isRequired
}

export default EditContactForm;
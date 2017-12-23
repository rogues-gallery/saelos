import React, { Component } from 'react';
import PropTypes from "prop-types";

class NewContactForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);

        this.props.setFormState({});
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
                case 'lookup':
                    let options = Object.keys(thisField.options).map((option, i) => {
                        return <option key={i} value={option}>{thisField.options[option]}</option>
                    });

                    input = <select name={"custom_fields." + thisField.alias} onChange={this._handleInputChange}>
                        {options}
                    </select>
                    break;
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
        let stageSelect = <select name="stage">
            <option value="">Please Select</option>
            <option value="1">Stage 1</option>
            <option value="2">Stage 2</option>
            <option value="3">Stage 3</option>
            <option value="4">Stage 4</option>
        </select>;

        let customFields = this._getCustomFields();

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
    setFormState: PropTypes.func.isRequired
}

export default NewContactForm;
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Money } from 'react-format';

let _ = require('lodash');

class EditAccountForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
    }

    _handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let accountState = this.props.account;

        // Special handling for custom field state
        if (/custom_fields/.test(name)) {
            name = name + '.value';
        }

        _.set(accountState, name, value);

        this.props.setFormState(accountState)
    }

    _getCustomFields() {
        return Object.keys(this.props.account.custom_fields).map((key, index) => {
            let thisField = this.props.account.custom_fields[key];
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
        let totalValue = _.sum(_.map(this.props.account.deals, 'amount'));

        return (
            <form id="account-details-form">
                <div className="panel-account-details-column">
                    <div className="input-container">
                        <label>Amount</label>
                        <Money>{totalValue}</Money>
                    </div>
                    <div className="input-container">
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="Phone" defaultValue={this.props.account.phone} onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Fax</label>
                        <input type="text" name="fax" placeholder="Fax" defaultValue={this.props.account.fax} onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Website</label>
                        <input type="text" name="website" placeholder="Website" defaultValue={this.props.account.website} onChange={this._handleInputChange} />
                    </div>

                    <div className="input-container">
                        <label>Address</label>
                        <input type="text" name="address1" placeholder="Address 1" defaultValue={this.props.account.address1} onChange={this._handleInputChange} />
                        <input type="text" name="address2" placeholder="Address 2" defaultValue={this.props.account.address2} onChange={this._handleInputChange} />
                        <input type="text" name="city" placeholder="City" defaultValue={this.props.account.city} onChange={this._handleInputChange} />
                        <input type="text" name="state" placeholder="State" defaultValue={this.props.account.state} onChange={this._handleInputChange} />
                        <input type="text" name="zip" placeholder="Zip" defaultValue={this.props.account.zip} onChange={this._handleInputChange} />
                        <input type="text" name="country" placeholder="Country" defaultValue={this.props.account.country} onChange={this._handleInputChange} />
                    </div>

                </div>
                <div className="panel-account-details-column">
                    {customFields}
                </div>
            </form>
        )
    }
}

EditAccountForm.propTypes = {
    account: PropTypes.object.isRequired,
    setFormState: PropTypes.func.isRequired
}

export default EditAccountForm;
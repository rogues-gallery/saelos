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
        const value = target.type === 'checkbox' ? target.checked : target.value;
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
                case 'text':
                    input = <input type="text" name={"custom_fields." + thisField.alias} onChange={this._handleInputChange} defaultValue={thisField.value} placeholder={thisField.label} />
                    break;
                case 'select':
                    let options = Object.keys(thisField.options).map((option, i) => {
                        return <option key={i} value={option}>{thisField.options[option]}</option>
                    });

                    input = <select name={"custom_fields." + thisField.alias} defaultValue={thisField.value} onChange={this._handleInputChange}>
                        {options}
                    </select>
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

        return (
            <form id="account-details-form">
                <div className="panel-account-details-column">
                    <div className="input-container">
                        <label>Amount</label>
                        <Money>12000</Money>
                    </div>

                </div>
                <div className="panel-account-details-column">
                    {this.props.account.status ?
                        <div className="input-container">
                            <label>Status</label>
                            {this.props.account.status.name}
                        </div>
                        : ''}

                    <div className="input-container">
                        <label>Next Step</label>
                        {this.props.account.next_step}
                    </div>

                    <div className="input-container">
                        <label>Interests</label>
                        Maven, Maestro, Mautic Cloud
                    </div>

                    <div className="input-container">
                        <label>Last Interaction</label>
                        <p>Output phone call with Alex W. on Nov 18 with a rep score of 6.</p>
                    </div>

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
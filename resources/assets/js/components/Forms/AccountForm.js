import React, { Component } from 'react';
import PropTypes from "prop-types";

class AccountForm extends Component {
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

    render() {
        let stageSelect = <select name="stage">
            <option value="">Please Select</option>
            <option value="1">Stage 1</option>
            <option value="2">Stage 2</option>
            <option value="3">Stage 3</option>
            <option value="4">Stage 4</option>
        </select>;

        let customFields = Object.keys(this.props.account.custom_fields).map((key, index) => {
            let thisField = this.props.account.custom_fields[key];
            let input = '';

            switch (thisField.type) {
                case 'text':
                    input = <input type="text" name={"custom_fields." + thisField.alias} onChange={this._handleInputChange} defaultValue={thisField.value} />
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

        return (
            <form id="account-details-form">
                <div className="panel-account-details-column">
                    {this.props.account.id === 'new' ?
                        <div className="input-container">
                            <label>Name</label>
                            <input type="text" name="first_name" placeholder="First Name" onChange={this._handleInputChange} />
                            <input type="text" name="last_name" placeholder="Last Name" onChange={this._handleInputChange} />
                        </div>
                        : ''}
                    <div className="input-container">
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="Phone" defaultValue={this.props.account.phone} onChange={this._handleInputChange} />
                    </div>

                    <div className="input-container">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" defaultValue={this.props.account.email} onChange={this._handleInputChange} />
                    </div>

                    <div className="input-container">
                        <label>Address</label>
                        <input type="text" name="address1" placeholder="Address 1" defaultValue={this.props.account.address1} onChange={this._handleInputChange} />
                        <input type="text" name="address2" placeholder="Address 2" defaultValue={this.props.account.address2} onChange={this._handleInputChange} />
                        <input type="text" name="city" placeholder="City" defaultValue={this.props.account.city} onChange={this._handleInputChange} />
                        <input type="text" name="state" placeholder="State" defaultValue={this.props.account.state} onChange={this._handleInputChange} />
                        <input type="text" name="zip" placeholder="Zip" defaultValue={this.props.account.zip} onChange={this._handleInputChange} />
                    </div>

                    {this.props.account.company ?
                        <div className="input-container">
                            <label>Company</label>
                            {this.props.account.id === 'new' ? <input type="text" name="company.name" placeholder="Company Name" onChange={this._handleInputChange} /> : ''}
                            <input type="text" name="company.address1" placeholder="Address 1" defaultValue={this.props.account.company.address1} onChange={this._handleInputChange} />
                            <input type="text" name="company.address2" placeholder="Address 2" defaultValue={this.props.account.company.address2} onChange={this._handleInputChange} />
                            <input type="text" name="company.city" placeholder="City" defaultValue={this.props.account.company.city} onChange={this._handleInputChange} />
                            <input type="text" name="company.state" placeholder="State" defaultValue={this.props.account.company.state} onChange={this._handleInputChange} />
                            <input type="text" name="company.zip" placeholder="Zip" defaultValue={this.props.account.company.zip} onChange={this._handleInputChange} />
                        </div>
                        : ''}
                </div>
                <div className="panel-account-details-column">
                    <label>Stage</label>
                    {stageSelect}

                    <label>Next Step</label>
                    Send updated sales information

                    <label>Interests</label>
                    Maven, Maestro, Mautic Cloud

                    <label>Last Interaction</label>
                    <p>Output phone call with Alex W. on Nov 18 with a rep score of 6.</p>

                    <label>Value</label>
                    <p>$12,500 which contributes 4% to total pipeline.</p>

                    {customFields}
                </div>
            </form>
        )
    }
}

AccountForm.propTypes = {
    account: PropTypes.object.isRequired,
    setFormState: PropTypes.func.isRequired
}

export default AccountForm;
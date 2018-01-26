import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Money } from 'react-format';
import {customFieldsHelper} from "../../utils/helpers";
import { connect } from 'react-redux';

let _ = require('lodash');

class EditAccountForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);

        this.state = {
            formState: props.account
        }
    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let accountState = this.state.formState;

        // Special handling for custom field state
        if (/custom_fields\./.test(name)) {
            let customField = this.props.customFields[_.split(name, '.')[1]];
            let accountCustomFieldIndex = _.findIndex(accountState.custom_fields, (o) => o.custom_field_id === customField.field_id);

            if (accountCustomFieldIndex >= 0) {
                accountState.custom_fields[accountCustomFieldIndex].value = value;
            } else {
                accountState.custom_fields.push({
                    custom_field_id: customField.field_id,
                    value: value
                });
            }
        } else {
            _.set(accountState, name, value);
        }

        this.props.setFormState(accountState)
    }

    render() {
        let customFields = customFieldsHelper(this.props.account, this.props.customFields, this._handleInputChange);
        let totalValue = _.sum(_.map(this.props.account.deals, 'amount'));

        return (
            <form id="account-details-form">
                <div className="panel-account-details-column">
                    <div className="input-container">
                        <label>Account name</label>
                        <input type="text" name="name" placeholder="Name" defaultValue={this.props.account.name} onChange={this._handleInputChange} />
                    </div>
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
    setFormState: PropTypes.func.isRequired,
    customFields: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        account: store.accountFlyoutState.data,
        dataUpdated: store.accountFlyoutState.dataUpdated,
        customFields: store.customFieldsState.accountFields
    }
})(EditAccountForm);
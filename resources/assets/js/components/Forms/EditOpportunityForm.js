import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Money } from 'react-format';

let _ = require('lodash');

class EditOpportunityForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
    }

    _handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let opportunityState = this.props.opportunity;

        // Special handling for custom field state
        if (/custom_fields/.test(name)) {
            name = name + '.value';
        }

        _.set(opportunityState, name, value);

        this.props.setFormState(opportunityState)
    }

    _getCustomFields() {
        return Object.keys(this.props.opportunity.custom_fields).map((key, index) => {
            let thisField = this.props.opportunity.custom_fields[key];
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

        return (
            <form id="opportunity-details-form">
                <div className="panel-opportunity-details-column">
                    <div className="input-container">
                        <label>Amount</label>
                        <input type="text" name="amount" placeholder="Amount" defaultValue={this.props.opportunity.amount} onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Probability</label>
                        <input type="text" name="probability" placeholder="Probability" defaultValue={this.props.opportunity.probability} onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Expected Close</label>
                        <input type="text" name="expected_close" placeholder="Expected Close" defaultValue={this.props.opportunity.expected_close} onChange={this._handleInputChange} />
                    </div>

                </div>
                <div className="panel-opportunity-details-column">
                    {customFields}
                </div>
            </form>
        )
    }
}

EditOpportunityForm.propTypes = {
    opportunity: PropTypes.object.isRequired,
    setFormState: PropTypes.func.isRequired
}

export default EditOpportunityForm;
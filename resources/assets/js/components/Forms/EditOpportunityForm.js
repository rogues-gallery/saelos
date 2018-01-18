import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Money } from 'react-format';
import Gravatar from 'react-gravatar';
import {customFieldsHelper} from "../../utils/helpers";
import {connect} from "react-redux";

let _ = require('lodash');

class EditOpportunityForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleContactLookup = this._handleContactLookup.bind(this);

        this.state = {
            formState: props.opportunity
        }
    }

    _handleContactLookup(event) {
        const target = event.target;
        const value = target.value;


    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let oppState = this.props.opportunity;

        // Special handling for custom field state
        if (/custom_fields\./.test(name)) {
            let customField = this.props.customFields[_.split(name, '.')[1]];
            let oppCustomFieldIndex = _.findIndex(oppState.custom_fields, (o) => o.custom_field_id === customField.field_id);

            if (oppCustomFieldIndex >= 0) {
                oppState.custom_fields[oppCustomFieldIndex].value = value;
            } else {
                oppState.custom_fields.push({
                    custom_field_id: customField.field_id,
                    value: value
                });
            }
        } else {
            _.set(oppState, name, value);
        }

        this.props.setFormState(oppState)
    }

    render() {
        let customFields = customFieldsHelper(this.props.opportunity, this.props.customFields, this._handleInputChange);

        let contacts = this.props.opportunity.people.map((person) => {
            return <div key={person.id}>
                <span className="avatar">
                    <Gravatar email={person.email} size={44} />
                </span>
                <span>{person.first_name + ' ' + person.last_name}</span>
            </div>
        });

        let stageOptions = this.props.stages.map((stage) => {
            return <option key={stage.id} value={stage.id}>{stage.title}</option>
        });

        return (
            <form id="opportunity-details-form">
                <div className="panel-opportunity-details-column">
                    <div className="input-container">
                        <label>Created At</label>
                        {this.props.opportunity.created_at}
                    </div>

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
                    <div className="input-container">
                        <label>Stage</label>
                        <select name="stage_id" defaultValue={this.props.opportunity.stage_id} onChange={this._handleInputChange}>
                            <option value={null}>Please select...</option>
                            {stageOptions}
                        </select>
                    </div>

                    <div className="input-container">
                        <label>Contacts</label>
                        <input placeholder="Start typing a contact name or email to add..." onChange={this._handleContactLookup} />
                        <hr />
                        <div id="contact-typeahead-container">
                        </div>
                        {contacts}
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
    setFormState: PropTypes.func.isRequired,
    dataUpdated: PropTypes.bool.isRequired,
    customFields: PropTypes.object.isRequired,
    stages: PropTypes.array.isRequired,
}

export default connect((store) => {
    return {
        opportunity: store.opportunityFlyoutState.data,
        dataUpdated: store.opportunityFlyoutState.dataUpdated,
        customFields: store.customFieldsState.opportunityFields,
        stages: store.stageState.data
    }
})(EditOpportunityForm);

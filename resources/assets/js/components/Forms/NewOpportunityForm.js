import React, { Component } from 'react';
import PropTypes from "prop-types";
import {customFieldsHelper} from "../../utils/helpers";
import {connect} from "react-redux";
import Select from 'react-select';

let _ = require('lodash');

class NewOpportunityForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);

        this.state = {
            formState: props.opportunity
        }
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

        this.setState({
            formState: oppState
        });

        this.props.setFormState(oppState)
    }

    render() {
        let customFields = customFieldsHelper({}, this.props.customFields, this._handleInputChange);
        let stageOptions = this.props.stages.map((stage) => {
            return <option key={stage.id} value={stage.id}>{stage.title}</option>
        });

        return (
            <form id="opportunity-details-form">
                <div className="panel-opportunity-details-column">
                    <div className="input-container">
                        <label>Deal name</label>
                        <input type="text" name="name" placeholder="Name" onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Amount</label>
                        <input type="text" name="amount" placeholder="Amount" onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Probability</label>
                        <input type="text" name="probability" placeholder="Probability" onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Expected Close</label>
                        <input type="text" name="expected_close" placeholder="Expected Close" onChange={this._handleInputChange} />
                    </div>
                    <div className="input-container">
                        <label>Stage</label>
                        <Select
                            name="stage_id"
                            value={this.props.opportunity.stage_id}
                            onChange={(input) => {
                                let selectedId = input ? input.value : null;
                                let selectedName = input ? input.label : null;

                                let event = {
                                    target: {
                                        type: 'select',
                                        name: "stage_id",
                                        value: {
                                            value: selectedId,
                                            label: selectedName
                                        }
                                    }
                                };

                                return this._handleInputChange(event);
                            }}
                            options={stageOptions}
                        />
                    </div>

                </div>
                <div className="panel-opportunity-details-column">
                    {customFields}
                </div>
            </form>
        )
    }
}

NewOpportunityForm.propTypes = {
    opportunity: PropTypes.object.isRequired,
    setFormState: PropTypes.func.isRequired,
    dataUpdated: PropTypes.bool.isRequired,
    customFields: PropTypes.object.isRequired,
    stages: PropTypes.array.isRequired
}

export default connect((store) => {
    return {
        opportunity: store.opportunityFlyoutState.data,
        dataUpdated: store.opportunityFlyoutState.dataUpdated,
        customFields: store.customFieldsState.opportunityFields,
        stages: store.stageState.data
    }
})(NewOpportunityForm);
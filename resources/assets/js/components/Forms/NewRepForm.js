import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Money } from 'react-format';
import {customFieldsHelper} from "../../utils/helpers";
import { connect } from 'react-redux';

let _ = require('lodash');

class NewRepForm extends Component {
    constructor(props) {
        super(props);

        this._handleInputChange = this._handleInputChange.bind(this);

        this.state = {
            formState: props.rep
        }
    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let repState = this.state.formState;

        // Special handling for custom field state
        if (/custom_fields\./.test(name)) {
            let customField = this.props.customFields[_.split(name, '.')[1]];
            let repCustomFieldIndex = _.findIndex(repState.custom_fields, (o) => o.custom_field_id === customField.field_id);

            if (repCustomFieldIndex >= 0) {
                repState.custom_fields[repCustomFieldIndex].value = value;
            } else {
                repState.custom_fields.push({
                    custom_field_id: customField.field_id,
                    value: value
                });
            }
        } else {
            _.set(repState, name, value);
        }

        this.props.setFormState(repState)
    }

    render() {
        let customFields = customFieldsHelper({}, this.props.customFields, this._handleInputChange);

        return (
            <form id="rep-details-form">
                <div className="flex-row-even">
                    <div>
                        <div className="input-container">
                            <label>Name ({this.props.rep.name})</label>
                            <input type="text" name="name" placeholder="Name" onChange={this._handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label>Phone ({this.props.rep.phone})</label>
                            <input type="text" name="phone" placeholder="Phone" onChange={this._handleInputChange} />
                        </div>

                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" name="email" placeholder="Email" onChange={this._handleInputChange} />
                        </div>

                    </div>
                    <div>
                        {customFields}
                    </div>
                </div>
            </form>
        )
    }
}

NewRepForm.propTypes = {
    rep: PropTypes.object.isRequired,
    setFormState: PropTypes.func.isRequired,
    customFields: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        rep: store.repFlyoutState.data,
        dataUpdated: store.repFlyoutState.dataUpdated,
        customFields: store.customFieldsState.repFields
    }
})(NewRepForm);
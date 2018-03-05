import React from 'react';
import Select from 'react-select';
import 'react-day-picker/lib/style.css';
import DatePicker from '../../components/UI/DatePicker';
import _ from 'lodash';

export const getCustomField = (customField, fields) => {
    let fieldIndex = _.findIndex(fields, (f) => f.custom_field_alias === customField);

    return fieldIndex >= 0 ? fields[fieldIndex] : {};
};

export const getCustomFieldValue = (customField, fields, defaultValue) => {
    const field = getCustomField(customField, fields);

    return field.value ? field.value : defaultValue;
};

export function customFieldsHelper(object, fields, handleInputChange) {
    return Object.keys(fields).map((key, index) => {
        let thisField = fields[key];
        let input = '';
        let thisValue = thisField.default;
        let customField = _.find(object.custom_fields, (o) => o.custom_field_id === thisField.field_id);

        if (customField) {
            thisValue = customField.value;
        }

        switch (thisField.type) {
            case 'select':
            case 'picklist':
                let options = Object.keys(thisField.options).map((option, i) => {
                    return {
                        value: option,
                        label: thisField.options[option]
                    }
                });

                options.unshift({value: null, label: "Please select..."});

                input = <Select
                    name={"custom_fields." + thisField.alias}
                    value={thisValue}
                    onChange={(input) => {
                        let selected = input ? input.value : null;

                        let event = {
                            target: {
                                type: 'select',
                                name: "custom_fields." + thisField.alias,
                                value: selected
                            }
                        };

                        return handleInputChange(event);
                    }}
                    options={options}
                />
                break;
            case 'date':
                input = <DatePicker
                    name={"custom_fields." + thisField.alias}
                    value={thisValue != null ? new Date(thisValue) : null}
                    onChange={handleInputChange} />;
                break;

            case 'lookup':
            case 'text':
            default:
                input = <input type="text" name={"custom_fields." + thisField.alias} onChange={handleInputChange} defaultValue={thisValue} placeholder={thisField.label} />
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
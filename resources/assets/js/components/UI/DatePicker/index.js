import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from "react-day-picker/moment";
import 'react-day-picker/lib/style.css';
import moment from "moment/moment";

export default
class DatePicker extends React.Component {

    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    _onChange(day) {
        let event = {
            target: {
                type: 'input',
                name: this.props.name,
                value: moment(day).format('YYYY-MM-DD')
            }
        };

        return this.props.onChange(event);
    }

    render() {
        if (this.props.defaultValue === null) {
            this.props.defaultValue = '';
        }

        return (
            <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                value={this.props.value != null ? this.props.value : this.props.defaultValue}
                format="YYYY-MM-DD"
                onDayChange={this._onChange}
                placeholder="YYYY-MM-DD"
                inputProps={{
                    name: this.props.name
                }}
            />
        )
    }
}

DatePicker.propTypes = {
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string
};
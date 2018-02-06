import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from "react-day-picker/moment";
import 'react-day-picker/lib/style.css';

export default
class DatePicker extends React.Component {

    render() {
        if (this.props.defaultValue === null) {
            this.props.defaultValue = '';
        }

        return (
            <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                value={this.props.dateValue != null ? this.props.dateValue : this.props.defaultValue}
                format="YYYY-MM-DD"
                onDayChange={this.props.onChange}
                placeholder="YYYY-MM-DD"
            />
        )
    }
}

DatePicker.propTypes = {
    dateValue: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func.isRequired
};
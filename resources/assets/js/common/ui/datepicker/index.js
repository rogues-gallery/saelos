import React from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import moment from "moment";

const DatePicker = ({ value, defaultValue, onChange, name, className }) => {
  const pickerOnChange = day => {
    let event = {
      target: {
        type: "input",
        name: name,
        value: moment(day).format("YYYY-MM-DD")
      }
    };

    return onChange(event);
  };

  return (
    <DayPickerInput
      formatDate={formatDate}
      parseDate={parseDate}
      value={value !== null ? value : defaultValue === null ? "" : defaultValue}
      format="YYYY-MM-DD"
      onDayChange={pickerOnChange}
      placeholder="YYYY-MM-DD"
      inputProps={{
        name: name,
        className: className
      }}
    />
  );
};

DatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  defaultValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default DatePicker;

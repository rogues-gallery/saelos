import React, { Component } from "react";
import Backend from '../../Layouts/Backend';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import { actionCreators } from "../../../actions";

const form = reduxForm({
    form: 'create_contact',
    onSubmit: actionCreators.postContact
})

class ContactFormPage extends Component {
    render() {
        return (
            <Backend>
                <div className="content-inner">
                    <div className="form-container">
                        <ContactForm dispatch={this.props.dispatch} />
                    </div>
                </div>
            </Backend>
        );
    }
}

ContactFormPage.propTypes = {
    dispatch: PropTypes.func.isRequired
}

class ContactForm extends Component {
    render() {
        const renderField = ({input, label, type, meta: { touched, error } }) => (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} placeholder={label} type={type}/>
                    {touched && error && <span>{error}</span>}
                </div>
            </div>
        )

        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field name="first_name" type="text" label="First Name" component={renderField} />
                <Field name="last_name" type="text" label="Last Name" component={renderField} />
                <Field name="email" type="email" label="Email Address" component={renderField} />
                <button className="button button-primary" type="button" onClick={() => this.props.dispatch(submit('create_contact'))}>
                    Submit
                </button>
            </form>
        )
    }
}

export default connect((store) => {
    return {
        //
    }
})(form(ContactFormPage));
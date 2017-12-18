import React, { Component } from 'react';

import Empty from '../Layouts/Empty';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from "../../actions";

const form = reduxForm({
    form: 'login'
})


class Login extends Component {
    constructor(props) {
        super(props);

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _handleFormSubmit(formProps) {
        this.props.loginUser(formProps);
    }

    _renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            )
        }
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <Empty>
                <h1>Welcome Back</h1>

                <form onSubmit={handleSubmit(this._handleFormSubmit)}>
                    {this._renderAlert()}
                    <div className="form-group">
                        <label>Username</label>
                        <Field name="username" className="form-control" component="input" type="text" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <Field name="password" className="form-control" component="input" type="password" />
                    </div>

                    <div className="form-group form-group-button">
                        <div className="form-group-button-description">
                            <a>I forgot password</a>
                        </div>

                        <button type="submit" className="button button-primary button-right">Login</button>
                    </div>
                </form>
            </Empty>
        );
    }
}

export default connect((state) => {
    return {
        errorMessage: state.authState.error,
        message: state.authState.message
    }
}, { loginUser })(form(Login));

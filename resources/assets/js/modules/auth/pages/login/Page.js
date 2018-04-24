import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import { login } from "../../service";
import ReeValidate from "ree-validate";
import Form from "./components/Form";

class Page extends Component {
  constructor(props) {
    super(props);

    this.validator = new ReeValidate({
      email: "required|email",
      password: "required|min:6"
    });

    // set the state of the app
    this.state = {
      credentials: {
        email: "",
        password: "",
        remember: false
      },
      errors: this.validator.errors
    };

    // bind component with event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // event to handle input change
  handleChange(name, value) {
    const { errors } = this.validator;

    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    });

    errors.remove(name);

    this.validator.validate(name, value).then(() => {
      this.setState({ errors });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { credentials } = this.state;
    const { errors } = this.validator;

    this.validator.validateAll(credentials).then(success => {
      if (success) {
        this.submit(credentials);
      } else {
        this.setState({ errors });
      }
    });
  }

  submit(credentials) {
    this.props.dispatch(login(credentials)).catch(({ error, statusCode }) => {
      const { errors } = this.validator;

      if (statusCode === 422) {
        _.forOwn(error, (message, field) => {
          errors.add(field, message);
        });
      } else if (statusCode === 401) {
        errors.add("password", error);
      }

      this.setState({ errors });
    });
  }

  render() {
    // check if user is authenticated then redirect him to home page
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const props = {
      email: this.state.credentials.email,
      password: this.state.credentials.password,
      remember: this.state.credentials.remember,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    };

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="mx-auto">
                <span className="anchor" />
                <div className="text-center mb-4">
                  <div className="bark m-auto">
                    <svg
                      enableBackground="new 0 0 407 407"
                      version="1.1"
                      viewBox="0 0 407 407"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="bow"
                        d="m203.5 365.5c-89.3 0-162-72.7-162-162s72.7-162 162-162 162 72.7 162 162-72.7 162-162 162z"
                      />
                      <path
                        className="wow"
                        d="m215.9 136.4c-3.6-11.2-13-16.1-25.8-15.7 0 0.1-13.2-48.4-13.2-48.4s58.8-19.7 93.9 32.4c-0.1 0.1-32 19-54.9 31.7z"
                      />
                      <path
                        className="wow"
                        d="m153.2 78.6c3.4 12.7 12.4 48 12.4 48-20.1 15.5-14.9 32.3 0.3 37.8 9.8 3.6 20.7 5 31.2 6.1 33.8 3.5 48.5 1.9 83.4 15.9 34.9 14.1 43.4 52.3 35.1 77-11.9 34.8-38 57.6-69.7 65.2 0 0.2-12.9-47.1-12.9-47.1s6.9-3.4 9.9-5.8c8.4-6.6 12.3-15.2 11.1-25.8-1.2-10.3-7.9-16.1-16.9-19.8-12-4.8-24.7-5.1-37.3-6-17.1-1.2-34.4-1.4-51.1-4.5-38.5-8.4-49.6-27.5-55.2-49.1-10.3-38.5 17.3-77.5 59.7-91.9z"
                      />
                      <path
                        className="wow"
                        d="m176.3 266.5c5.5 13.5 15.4 19.5 32.9 21.1 0 0 12.8 47.6 12.8 47.5-12.4 3.5-25.5 4.7-38.1 2.7-18-2.8-34.3-9.9-47.7-22.3-7.7-7.2-12.6-17-12.6-17s52.7-32 52.7-32z"
                      />
                      <path
                        className="bow"
                        d="M203.5,407C91.3,407,0,315.7,0,203.5S91.3,0,203.5,0S407,91.3,407,203.5S315.7,407,203.5,407z M203.5,16    C100.1,16,16,100.1,16,203.5S100.1,391,203.5,391S391,306.9,391,203.5S306.9,16,203.5,16z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="card has-shadow">
                  <div className="card-body">
                    <Form {...props} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Page;

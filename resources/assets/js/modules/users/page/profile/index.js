import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { getActiveUser } from "../../store/selectors";
import { saveUser } from "../../service";
import { handleInputChange } from "../../../../utils/helpers/fields";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: props.user.originalProps
    };
  }

  _handleInputChange = event => {
    this.setState({
      formState: handleInputChange(event, this.state.formState, {})
    });
  };

  _submit = () => {
    this.props.dispatch(saveUser(this.state.formState));
  };

  render() {
    const { user } = this.props;
    const { formState } = this.state;

    return (
      <main className="col main-panel px-3 full-panel">
        <h4 className="border-bottom py-3">
          <button
            className="float-right btn btn-primary list-inline-item"
            onClick={this._submit}
          >
            Save
          </button>
          My Profile
        </h4>
        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Personal</div>
                <div className="row">
                  <div className="col">
                    <div className={`form-group mb-2`}>
                      <label htmlFor="name" className="">
                        Name
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          onChange={this._handleInputChange}
                          placeholder="Name"
                          defaultValue={formState.name}
                        />
                      </div>
                    </div>
                    <div className={`form-group mb-2`}>
                      <label htmlFor="username" className="">
                        Username
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control"
                          onChange={this._handleInputChange}
                          placeholder="Username"
                          value={formState.username}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Contact</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">
                    Email
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      onChange={this._handleInputChange}
                      placeholder="Email Address"
                      defaultValue={formState.email}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="phone" className="">
                    Phone
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      onChange={this._handleInputChange}
                      placeholder="Phone"
                      defaultValue={formState.phone}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(state => ({
  user: getActiveUser(state)
}))(Profile);

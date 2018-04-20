import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { getTeam } from "../../../store/selectors";
import { deleteTeam, saveTeam } from "../../../service";
import { getUsers } from "../../../../users/store/selectors";

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: props.team.originalProps
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      formState: nextProps.team.originalProps
    });
  }

  _submit = () => {
    this.props.dispatch(saveTeam(this.state.formState));
  };

  // @todo: Abstract this out
  _handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { formState } = this.state;

    _.set(formState, name, value);

    this.setState({
      formState
    });
  };

  _delete = () => {
    const { dispatch, team } = this.props;

    if (confirm("Are you sure?")) {
      dispatch(deleteTeam(team.id));
    }
  };

  render() {
    const { team, users, match } = this.props;
    const { formState } = this.state;

    if (team.id === null && match.params.id !== "new") {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">
            Select a team
            <span className="d-none d-lg-inline">on the left </span>to edit.
          </h2>
        </main>
      );
    }

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
          <button
            className="float-right btn btn-primary list-inline-item"
            onClick={this._submit}
          >
            Save
          </button>
          {team.name ? team.name : "New Team"}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className={`form-group mb-2`}>
                  <label htmlFor="name">Name</label>
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={this._handleInputChange}
                      className="form-control"
                      placeholder="Team Name"
                      value={formState.name}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="description">Description</label>
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      onChange={this._handleInputChange}
                      className="form-control"
                      defaultValue={formState.description}
                    />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="form-group mb-2">
                  <label htmlFor="leader_id">Team Leader</label>
                  <Select
                    value={formState.leader_id}
                    options={formState.users.map(u => ({
                      value: u.id,
                      label: u.name
                    }))}
                    onChange={value => {
                      const event = {
                        target: {
                          name: "leader_id",
                          value: value ? value.value : null
                        }
                      };

                      this._handleInputChange(event);
                    }}
                  />
                </div>
              </li>
              <li className="list-group-item">
                <div className="form-group mb-2">
                  <label htmlFor="users">Team Members</label>
                  <Select
                    value={formState.users.map(u => u.id)}
                    multi={true}
                    options={users.map(u => ({ value: u.id, label: u.name }))}
                    onChange={values => {
                      const event = {
                        target: {
                          name: "users",
                          value: values.map(v => ({
                            id: v.value,
                            name: v.label
                          }))
                        }
                      };

                      this._handleInputChange(event);
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(
  connect((state, ownProps) => ({
    team: getTeam(state, ownProps.match.params.id),
    users: getUsers(state)
  }))(Record)
);

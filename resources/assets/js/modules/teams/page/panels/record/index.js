import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { getTeam } from "../../../store/selectors";
import { deleteTeam, saveTeam } from "../../../service";
import { getUsers } from "../../../../users/store/selectors";
import { handleInputChange } from "../../../../../utils/helpers/fields";

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

  _handleInputChange = event => {
    this.setState({
      formState: handleInputChange(event, this.state.formState, {})
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
            {this.context.i18n.t("messages.select.team.to.edit")}
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
            {this.context.i18n.t("messages.save")}
          </button>
          {team.name
            ? team.name
            : this.context.i18n.t("messages.generic.new", {
                type: this.context.i18n.t("messages.team")
              })}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className={`form-group mb-2`}>
                  <label htmlFor="name">
                    {this.context.i18n.t("messages.name")}
                  </label>
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
                  <label htmlFor="description">
                    {this.context.i18n.t("messages.description")}
                  </label>
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
                  <label htmlFor="leader_id">
                    {this.context.i18n.t("messages.team.leader")}
                  </label>
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
                  <label htmlFor="users">
                    {this.context.i18n.t("messages.team.members")}
                  </label>
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

Record.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default withRouter(
  connect((state, ownProps) => ({
    team: getTeam(state, ownProps.match.params.id),
    users: getUsers(state)
  }))(Record)
);

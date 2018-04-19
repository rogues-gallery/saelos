import React from "react";
import PropTypes from "prop-types";
import { getField } from "../../../store/selectors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteField, fetchField, saveField } from "../../../service";
import Select from "react-select";
import _ from "lodash";

class Record extends React.Component {
  constructor(props) {
    super(props);

    this._submit = this._submit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._delete = this._delete.bind(this);

    this.state = {
      formState: props.field.originalProps
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;

    if (this.props.match.params.id === "new") {
      //dispatch(editingField())
    } else {
      dispatch(fetchField(this.props.match.params.id));
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ formState: nextProps.field.originalProps });
  }

  _submit() {
    this.props.dispatch(saveField(this.state.formState));
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const formState = this.state.formState;

    _.set(formState, name, value);

    this.setState({
      formState
    });
  }

  _delete() {
    const { dispatch, field } = this.props;

    dispatch(deleteField(field.id));
    // this.context.router.history.push('/config/fields')
  }

  render() {
    const { field } = this.props;
    const { formState } = this.state;

    if (field.id === null && this.props.match.params.id !== "new") {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">
            Select a field{" "}
            <span className="d-none d-lg-inline">on the left</span> to edit.
          </h2>
        </main>
      );
    }

    const objectOptions = [
      {
        value: "App\\Company",
        label: "Company"
      },
      {
        value: "App\\Contact",
        label: "Contact"
      },
      {
        value: "App\\Opportunity",
        label: "Opportunity"
      }
    ];

    const groupOptions = [
      {
        value: "core",
        label: "Core"
      },
      {
        value: "social",
        label: "Social"
      },
      {
        value: "personal",
        label: "Personal"
      },
      {
        value: "professional",
        label: "Professional"
      },
      {
        value: "additional",
        label: "Additional"
      }
    ];

    return (
      <main className="col main-panel px-3">
        <div className="list-inline pt-3 float-right">
          <button
            className="btn btn-link mr-2 btn-sm list-inline-item"
            onClick={this._delete}
          >
            Delete
          </button>
          <button
            className="btn btn-primary list-inline-item"
            onClick={this._submit}
          >
            Save
          </button>
        </div>
        <h4 className="border-bottom py-3">{formState.label || "New Field"}</h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Core</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="label">Name</label>
                  <div>
                    <input
                      type="text"
                      id="label"
                      name="label"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.label}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="alias">Alias</label>
                  <div>
                    <input
                      type="text"
                      id="alias"
                      name="alias"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.alias}
                    />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Options</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="model">Object</label>
                  <div>
                    <Select
                      options={objectOptions}
                      value={formState.model}
                      valueKey="value"
                      labelKey="label"
                      onChange={value => {
                        const event = {
                          target: {
                            name: "model",
                            value: value ? value.value : null
                          }
                        };

                        this._handleInputChange(event);
                      }}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="group">Group</label>
                  <div>
                    <Select
                      options={groupOptions}
                      value={formState.group}
                      valueKey="value"
                      labelKey="label"
                      onChange={value => {
                        const event = {
                          target: {
                            name: "group",
                            value: value ? value.value : null
                          }
                        };

                        this._handleInputChange(event);
                      }}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="ordering">Order</label>
                  <div>
                    <input
                      type="text"
                      id="ordering"
                      name="ordering"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.ordering}
                    />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="hidden"
                        checked={formState.hidden}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">Hidden</div>
                  </div>
                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="required"
                        checked={formState.required}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">Required</div>
                  </div>

                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="searchable"
                        checked={formState.searchable}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">Searchable</div>
                  </div>

                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="summary"
                        checked={formState.summary}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">Summary</div>
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

Record.propTypes = {
  field: PropTypes.object.isRequired
};

Record.contextTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(
  connect((state, ownProps) => ({
    field: getField(state, ownProps.match.params.id),
    isDirty: state.fieldState.isFetching
  }))(Record)
);

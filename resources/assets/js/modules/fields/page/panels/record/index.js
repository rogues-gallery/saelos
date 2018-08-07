import React from "react";
import PropTypes from "prop-types";
import { getField, getFieldError } from "../../../store/selectors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteField, fetchField, saveField } from "../../../service";
import Select from "react-select";
import { handleInputChange } from "../../../../../utils/helpers/fields";

class Record extends React.Component {
  constructor(props) {
    super(props);

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
    if (nextProps.match.params.id !== "new") {
      this.setState({ formState: nextProps.field.originalProps });
    }
  }

  _submit = () => {
    this.props.dispatch(saveField(this.state.formState));
  };

  _handleInputChange = event => {
    this.setState({
      formState: handleInputChange(event, this.state.formState, {})
    });
  };

  _delete = () => {
    const { dispatch, field } = this.props;

    dispatch(deleteField(field.id));
    // this.context.router.history.push('/config/fields')
  };

  render() {
    const { field, error } = this.props;
    const { formState } = this.state;
    const hasError = error !== false;

    if (field.id === null && this.props.match.params.id !== "new") {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">
            {this.context.i18n.t("messages.select.field.to.edit")}
          </h2>
        </main>
      );
    }

    const objectOptions = [
      {
        value: "App\\Company",
        label: this.context.i18n.t("messages.company")
      },
      {
        value: "App\\Contact",
        label: this.context.i18n.t("messages.contact")
      },
      {
        value: "App\\Opportunity",
        label: this.context.i18n.t("messages.opportunity")
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

    const typeOptions = [
      {
        value: "text",
        label: "Text"
      },
      {
        value: "textarea",
        label: "Textarea"
      },
      {
        value: "radio",
        label: "Radio"
      },
      {
        value: "checkbox",
        label: "Checkbox"
      },
      {
        value: "select",
        label: "Select"
      },
      {
        value: "number",
        label: "Number"
      },
      {
        value: "date",
        label: "Date"
      },
      {
        value: "email",
        label: "Email"
      },
      {
        value: "url",
        label: "URL"
      }
    ];

    return (
      <main className="col main-panel px-3">
        <div className="list-inline pt-3 float-right">
          <button
            className="btn btn-link mr-2 btn-sm list-inline-item"
            onClick={this._delete}
          >
            {this.context.i18n.t("messages.delete")}
          </button>
          <button
            className="btn btn-primary list-inline-item"
            onClick={this._submit}
          >
            {this.context.i18n.t("messages.save")}
          </button>
        </div>
        <h4 className="border-bottom py-3">
          {formState.label ||
            this.context.i18n.t("messages.generic.new", {
              type: this.context.i18n.t("messages.field")
            })}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">
                  {this.context.i18n.t("messages.core")}
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("label")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="label">
                    {this.context.i18n.t("messages.name")}
                  </label>
                  <div>
                    <input
                      type="text"
                      id="label"
                      name="label"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.label}
                    />
                    {hasError && error.hasOwnProperty("label") ? (
                      <div className="warning small">{error.label}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("alias")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="alias">
                    {this.context.i18n.t("messages.alias")}
                  </label>
                  <div>
                    <input
                      type="text"
                      id="alias"
                      name="alias"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.alias}
                    />
                    {hasError && error.hasOwnProperty("alias") ? (
                      <div className="warning small">{error.alias}</div>
                    ) : null}
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">
                  {this.context.i18n.t("messages.options")}
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("model")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="model">
                    {this.context.i18n.t("messages.object")}
                  </label>
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
                    {hasError && error.hasOwnProperty("model") ? (
                      <div className="warning small">{error.model}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("group")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="group">
                    {this.context.i18n.t("messages.group")}
                  </label>
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
                    {hasError && error.hasOwnProperty("group") ? (
                      <div className="warning small">{error.group}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("ordering")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="ordering">
                    {this.context.i18n.t("messages.order")}
                  </label>
                  <div>
                    <input
                      type="text"
                      id="ordering"
                      name="ordering"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.ordering}
                    />
                    {hasError && error.hasOwnProperty("ordering") ? (
                      <div className="warning small">{error.ordering}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("type") ? "hasError" : null
                  }`}
                >
                  <label htmlFor="type">
                    {this.context.i18n.t("messages.field.type")}
                  </label>
                  <div>
                    <Select
                      options={typeOptions}
                      value={formState.type}
                      valueKey="value"
                      labelKey="label"
                      onChange={value => {
                        const event = {
                          target: {
                            name: "type",
                            value: value ? value.value : null
                          }
                        };

                        this._handleInputChange(event);
                      }}
                    />
                    {hasError && error.hasOwnProperty("type") ? (
                      <div className="warning small">{error.type}</div>
                    ) : null}
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
                    <div className="pt-1">
                      {this.context.i18n.t("messages.hidden")}
                    </div>
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
                    <div className="pt-1">
                      {this.context.i18n.t("messages.required")}
                    </div>
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
                    <div className="pt-1">
                      {this.context.i18n.t("messages.searchable")}
                    </div>
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
                    <div className="pt-1">
                      {this.context.i18n.t("messages.summary")}
                    </div>
                  </div>
                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="export"
                        checked={formState.export}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">
                      {this.context.i18n.t("messages.export")}
                    </div>
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
  router: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired
};

export default withRouter(
  connect((state, ownProps) => ({
    field: getField(state, ownProps.match.params.id),
    isDirty: state.fieldState.isFetching,
    error: getFieldError(state)
  }))(Record)
);

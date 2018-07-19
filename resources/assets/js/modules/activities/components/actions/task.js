import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import Select from "react-select";
import DatePicker from "../../../../common/ui/datepicker/index";
import { saveActivity } from "../../service";
import Contact from "../../../contacts/Contact";
import Opportunity from "../../../opportunities/Opportunity";
import Company from "../../../companies/Company";
import Activity from "../../Activity";

class TaskAction extends Component {
  constructor(props) {
    super(props);

    if (props.activity) {
      this.state = {
        formState: props.activity.originalProps
      };
    } else {
      this.state = {
        formState: {
          user_id: props.user.id,
          contact_id: props.model instanceof Contact ? props.model.id : null,
          opportunity_id:
            props.model instanceof Opportunity ? props.model.id : null,
          company_id: props.model instanceof Company ? props.model.id : null
        }
      };
    }
  }

  _handleInputChange = event => {
    const { target } = event;
    const { name, value } = target;
    const { formState } = this.state;

    formState[name] = value;

    this.setState({
      formState
    });
  };

  _handleContentChange = value => {
    const { formState } = this.state;

    formState.description = value;

    this.setState({
      formState
    });
  };

  _submit = () => {
    const { formState } = this.state;

    if (typeof formState.details_type === "undefined") {
      alert("Please select a task type");
    } else {
      this.props.dispatch(saveActivity(formState)).then(() => {
        this._cancel();
      });
    }
  };

  _cancel = () => {
    this.setState({
      formState: {
        user_id: this.props.user.id,
        contact_id:
          this.props.model instanceof Contact ? this.props.model.id : null,
        opportunity_id:
          this.props.model instanceof Opportunity ? this.props.model.id : null,
        company_id:
          this.props.model instanceof Company ? this.props.model.id : null
      }
    });

    this.props.toggle();
  };

  render() {
    const { model, user } = this.props;
    const { formState } = this.state;

    let opportunityOptions = null;
    let companyOptions = null;
    let contactOptions = null;
    let assigneeOptions = null;

    if (model instanceof Opportunity) {
      companyOptions = model.companies.map(c => ({
        value: c.id,
        label: c.name
      }));
      contactOptions = model.contacts.map(c => ({
        value: c.id,
        label: c.name
      }));
    }

    if (model instanceof Company) {
      opportunityOptions = model.opportunities.map(o => ({
        value: o.id,
        label: o.name
      }));
      contactOptions = model.contacts.map(c => ({
        value: c.id,
        label: c.name
      }));
    }

    if (model instanceof Contact) {
      opportunityOptions = model.opportunities.map(o => ({
        value: o.id,
        label: o.name
      }));
      companyOptions = model.companies.map(c => ({
        value: c.id,
        label: c.name
      }));
    }

    assigneeOptions = user.team.users.map(u => ({
      value: u.id,
      label: u.name
    }));

    return (
      <React.Fragment>
        <div className="card-body taskActionView">
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="assignee_name">
                {this.context.i18n.t("messages.assignee")}
              </label>
              {user.authorized(["admin", "manager"]) ? (
                <Select
                  value={formState.user_id}
                  onChange={value => {
                    const event = {
                      target: {
                        name: "user_id",
                        value: value ? value.value : null
                      }
                    };

                    this._handleInputChange(event);
                  }}
                  options={assigneeOptions}
                />
              ) : (
                <input
                  type="text"
                  readOnly={true}
                  className="form-control"
                  value={formState.user ? formState.user.name : user.name}
                />
              )}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="due_date">
                {this.context.i18n.t("messages.type")}
              </label>
              <Select
                value={formState.details_type}
                onChange={value => {
                  const event = {
                    target: {
                      name: "details_type",
                      value: value ? value.value : null
                    }
                  };

                  this._handleInputChange(event);
                }}
                options={[
                  {
                    value: "App\\CallActivity",
                    label: this.context.i18n.t("messages.call")
                  },
                  {
                    value: "App\\EmailActivity",
                    label: this.context.i18n.t("messages.email")
                  },
                  {
                    value: "App\\SmsActivity",
                    label: this.context.i18n.t("messages.sms")
                  }
                ]}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="due_date">
                {this.context.i18n.t("messages.due_date")}
              </label>
              <DatePicker
                className="form-control"
                name="due_date"
                placeholder={this.context.i18n.t("messages.enter.due_date")}
                onChange={this._handleInputChange}
                value={formState.due_date}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="task_name">
                {this.context.i18n.t("messages.name")}
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder={this.context.i18n.t("messages.enter.task.name")}
                onChange={this._handleInputChange}
                value={formState.name}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <ReactQuill
                onChange={this._handleContentChange}
                defaultValue={formState.description}
              />
            </div>
          </div>
          <div className="form-row">
            {opportunityOptions ? (
              <div className="col">
                <label htmlFor="emailOpportunity">
                  {this.context.i18n.t("messages.opportunity")}
                </label>
                <Select
                  multi={false}
                  value={formState.opportunity_id}
                  onChange={value => {
                    const event = {
                      target: {
                        name: "opportunity_id",
                        value: value ? value.value : null
                      }
                    };

                    this._handleInputChange(event);
                  }}
                  options={opportunityOptions}
                />
              </div>
            ) : (
              ""
            )}

            {contactOptions ? (
              <div className="col">
                <label htmlFor="emailOpportunity">
                  {this.context.i18n.t("messages.contact")}
                </label>
                <Select
                  multi={false}
                  value={formState.contact_id}
                  onChange={value => {
                    const event = {
                      target: {
                        name: "contact_id",
                        value: value ? value.value : null
                      }
                    };

                    this._handleInputChange(event);
                  }}
                  options={contactOptions}
                />
              </div>
            ) : (
              ""
            )}

            {companyOptions ? (
              <div className="col">
                <label htmlFor="emailCompany">
                  {this.context.i18n.t("messages.company")}
                </label>
                <Select
                  multi={false}
                  value={formState.company_id}
                  onChange={value => {
                    const event = {
                      target: {
                        name: "company_id",
                        value: value ? value.value : null
                      }
                    };

                    this._handleInputChange(event);
                  }}
                  options={companyOptions}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          {this.props.activity instanceof Activity ? null : (
            <div className="mt-2">
              <button className="btn btn-primary mr-2" onClick={this._submit}>
                {this.context.i18n.t("messages.save")}
              </button>
              <button
                className="btn btn-link text-muted"
                onClick={this._cancel}
              >
                {this.context.i18n.t("messages.cancel")}
              </button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

TaskAction.propTypes = {
  user: PropTypes.object.isRequired,
  activity: PropTypes.instanceOf(Activity)
};

TaskAction.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default connect()(TaskAction);

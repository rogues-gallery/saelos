import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { emailContact } from "../../../contacts/service";
import Contact from "../../../contacts/Contact";
import Select from "react-select";
import Opportunity from "../../../opportunities/Opportunity";
import Company from "../../../companies/Company";

class EmailAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: {
        id: props.model.id,
        email_subject: "",
        email_content: "",
        opportunity_id: null,
        company_id: null
      },
      visibility: {
        showCC: false,
        showBCC: false
      }
    };
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

    formState.email_content = value;

    this.setState({
      formState
    });
  };

  _submit = () => {
    this.props.dispatch(emailContact(this.state.formState));
  };

  _cancel = () => {
    this.setState({
      formState: {
        id: this.props.contact.id,
        email_subject: "",
        email_content: "",
        email_cc: "",
        email_bcc: "",
        opportunity_id: null,
        company_id: null
      }
    });

    this.props.toggle();
  };

  _toggleInput = name => {
    const { showCC, showBCC } = this.state.visibility;

    this.setState({
      visibility: {
        showCC: name === "showCC" ? !showCC : showCC,
        showBCC: name === "showBCC" ? !showBCC : showBCC
      }
    });
  };

  render() {
    const { model } = this.props;
    const { formState, visibility } = this.state;
    const { showCC, showBCC } = visibility;

    let opportunityOptions = null;
    let companyOptions = null;
    let contactOptions = null;

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

    return (
      <React.Fragment>
        <div className="card-body emailActionView">
          <div className="float-right mb-2">
            <span className="mini-text font-weight-bold">
              <a
                href="javascript:void(0)"
                className="btn btn-sm btn-link"
                onClick={() => this._toggleInput("showCC")}
              >
                {this.context.i18n.t("messages.cc")}
              </a>
              <a
                href="javascript:void(0)"
                className="btn btn-sm btn-link"
                onClick={() => this._toggleInput("showBCC")}
              >
                {this.context.i18n.t("messages.bcc")}
              </a>
            </span>
          </div>
          <div className={`float-right mb-2 ml-2 ${showBCC ? "" : "d-none"}`}>
            <input
              type="text"
              onChange={this._handleInputChange}
              value={formState.email_bcc}
              name="email_bcc"
              className="form-control form-control-sm"
              placeholder="Enter BCC"
            />
          </div>
          <div className={`float-right mb-2 ${showCC ? "" : "d-none"}`}>
            <input
              type="text"
              onChange={this._handleInputChange}
              value={formState.email_cc}
              name="email_cc"
              className="form-control form-control-sm"
              placeholder="Enter CC"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email_subject">
              {this.context.i18n.t("messages.subject")}
            </label>
            <input
              type="text"
              onChange={this._handleInputChange}
              value={formState.email_subject}
              name="email_subject"
              className="form-control"
              placeholder="Enter email subject"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_content">
              {this.context.i18n.t("messages.message")}
            </label>
            <ReactQuill
              name="email_content"
              className="fh-200"
              onChange={this._handleContentChange}
            />
          </div>
          <div className="row">
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
                        value: value.value
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
                        value: value.value
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
          <div className="mt-2">
            <button className="btn btn-primary mr-2" onClick={this._submit}>
              {this.context.i18n.t("messages.send")}
            </button>
            <button className="btn btn-link text-muted" onClick={this._cancel}>
              {this.context.i18n.t("messages.cancel")}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

EmailAction.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.instanceOf(Contact).isRequired
};

EmailAction.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default connect()(EmailAction);

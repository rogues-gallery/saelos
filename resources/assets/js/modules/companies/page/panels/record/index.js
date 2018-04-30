import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import * as MDIcons from "react-icons/lib/md";

import Conversations from "../../../../conversations/partials/_conversations";
import TagsPartial from "../../../../tags/partials/tags";
import { getActiveUser } from "../../../../users/store/selectors";
import {
  getCompany,
  getCustomFieldsForCompanies,
  isStateDirty,
  getFirstCompanyId,
  isInEdit
} from "../../../store/selectors";
import { fetchCompany, saveCompany, deleteCompany } from "../../../service";
import { editingCompany, editingCompanyFinished } from "../../../store/actions";
import { renderGroupedFields } from "../../../../../utils/helpers/fields";
import { openTaskContainer } from "../../../../activities/store/actions";

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: props.company.originalProps
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;

    if (match.params.id === "new") {
      dispatch(editingCompany());
    } else if (match.params.id > 0) {
      dispatch(fetchCompany(match.params.id));
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { match, inEdit, dispatch, company } = nextProps;

    if (
      match.params.id === "new" &&
      !inEdit &&
      this.props.match.params.id !== "new"
    ) {
      dispatch(editingCompany());
    }

    this.setState({ formState: company.originalProps });
  }

  _delete = () => {
    const { dispatch, company } = this.props;

    dispatch(deleteCompany(company.id)).then(() =>
      this.context.router.history.push("/companies")
    );
  };

  _toggleTaskCompose = view => {
    const { dispatch, company } = this.props;

    dispatch(openTaskContainer(() => alert("hi"), company, view));
  };

  _toggleEdit = () => {
    const { dispatch, match, inEdit } = this.props;

    dispatch(inEdit ? editingCompanyFinished() : editingCompany());

    if (match.params.id === "new" && inEdit) {
      this.context.router.history.push("/companies");
    }
  };

  _submit = () => {
    const { dispatch, match } = this.props;
    const { formState } = this.state;

    dispatch(saveCompany(formState)).then(data => {
      if (match.params.id === "new") {
        this.context.router.history.push(`/companies/${data.id}`);
      }
    });
  };

  // @todo: Abstract this out ... Don - looking at you.
  _handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let companyState = this.state.formState;

    // Special handling for custom field state
    if (this.state.formState.hasOwnProperty(name) === false) {
      let customField = this.props.customFields[name];
      let companyCustomFieldIndex = _.findIndex(
        companyState.custom_fields,
        o => o.custom_field_id === customField.field_id
      );

      if (companyCustomFieldIndex >= 0) {
        companyState.custom_fields[companyCustomFieldIndex].value = value;
      } else {
        companyState.custom_fields.push({
          custom_field_id: customField.field_id,
          value: value
        });
      }
    } else {
      _.set(companyState, name, value);
    }

    this.setState({
      formState: companyState
    });
  };

  render() {
    const { inEdit, company, user } = this.props;
    const groups = _.groupBy(this.props.customFields, "group");
    const companyFields = renderGroupedFields(
      inEdit,
      ["core", "personal", "social", "additional"],
      groups,
      company,
      this._handleInputChange
    );

    const onAssignmentChange = id => {
      const event = {
        target: {
          type: "text",
          name: "user_id",
          value: id
        }
      };
      this._handleInputChange(event);
      this._submit();
    };

    if (company.id === null && this.props.match.params.id !== "new") {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">
            Select a company on the left to view.
          </h2>
        </main>
      );
    }

    return (
      <main className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button
            className="btn btn-link mr-2 btn-sm list-inline-item"
            onClick={this._delete}
          >
            <span className="h2">
              <MDIcons.MdDelete />
            </span>
          </button>

          <div className="float-right text-right pt-2">
            <div className="mini-text text-muted">Assigned To</div>
            {user.authorized(["admin", "manager"]) ? (
              <div className="dropdown show">
                <div
                  className="text-dark mini-text cursor-pointer"
                  id="assigneeDropdown"
                  data-toggle="dropdown"
                >
                  <b>{company.user.name ? company.user.name : "Unassigned"}</b>
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="assigneeDropdown"
                >
                  {user.team.users.map(u => (
                    <a
                      key={`team-${user.team.id}-member-${u.id}`}
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={() => onAssignmentChange(u.id)}
                    >
                      {u.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-dark mini-text">
                <b>{company.user.name ? company.user.name : "Unassigned"}</b>
              </div>
            )}
          </div>
        </div>

        {inEdit ? (
          <span className="float-right py-3 mt-1">
            <a href="javascript:void(0);" onClick={this._toggleEdit}>
              Cancel
            </a>
            <span
              className="ml-2 btn btn-primary btn-sm"
              onClick={this._submit}
            >
              Save
            </span>
          </span>
        ) : (
          <span className="float-right py-3 mt-1">
            <a href="javascript:void(0);" onClick={this._toggleEdit}>
              Edit
            </a>
          </span>
        )}
        <h4 className="border-bottom py-3">
          {company.name}
          <TagsPartial
            tags={company.tags}
            entityId={company.id}
            entityType="App\Company"
          />
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            {!inEdit ? (
              <ul className="list-group list-group-flush">
                <li key="address" className="list-group-item">
                  <div className="mini-text text-muted">Address</div>
                  <div className="py-2">
                    <p className="font-weight-bold">
                      {company.address1} {company.address2}
                    </p>
                    <p className="text-muted">
                      {company.city} {company.state} {company.zip}{" "}
                      {company.country}
                    </p>
                  </div>
                </li>
              </ul>
            ) : (
              ""
            )}
            {companyFields}
          </div>
          <Conversations
            dispatch={this.props.dispatch}
            conversations={_.filter(
              company.activities,
              a => a.details_type !== "App\\FieldUpdateActivity"
            )}
          />
        </div>
      </main>
    );
  }
}

Record.propTypes = {
  company: PropTypes.object.isRequired
};

Record.contextTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(
  connect((state, ownProps) => ({
    company: getCompany(
      state,
      ownProps.match.params.id || getFirstCompanyId(state)
    ),
    customFields: getCustomFieldsForCompanies(state),
    isDirty: isStateDirty(state),
    user: getActiveUser(state),
    inEdit: isInEdit(state)
  }))(Record)
);

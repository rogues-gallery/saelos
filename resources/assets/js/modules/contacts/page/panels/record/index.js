import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import * as MDIcons from "react-icons/lib/md";

import Conversations from "../../../../conversations/partials/_conversations";
import TagsPartial from "../../../../tags/partials/tags";

import { getActiveUser } from "../../../../users/store/selectors";
import {
  getContact,
  getCustomFieldsForContacts,
  isStateDirty,
  getFirstContactId,
  isInEdit,
  getContactError
} from "../../../store/selectors";
import { deleteContact, fetchContact, saveContact } from "../../../service";
import { editingContact, editingContactFinished } from "../../../store/actions";
import { renderGroupedFields } from "../../../../../utils/helpers/fields";
import { openTaskContainer } from "../../../../activities/store/actions";
import Contact from "../../../Contact";
import User from "../../../../users/User";

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: props.contact.originalProps
    };
  }

  componentDidMount() {
    const { dispatch, match, inEdit, contact } = this.props;

    if (match.params.id === "new" && !inEdit) {
      dispatch(editingContact());
    } else if (match.params.id > 0) {
      dispatch(fetchContact(match.params.id));
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { match, inEdit, dispatch, contact } = nextProps;

    if (
      match.params.id === "new" &&
      !inEdit &&
      this.props.match.params.id !== "new"
    ) {
      dispatch(editingContact());
    }

    this.setState({ formState: contact.originalProps });
  }

  _delete = () => {
    const { dispatch, contact } = this.props;

    if (confirm("Are you sure?")) {
      dispatch(deleteContact(contact.id)).then(() =>
        this.context.router.history.push("/contacts")
      );
    }
  };

  _toggleTaskCompose = view => {
    const { dispatch, contact } = this.props;

    dispatch(openTaskContainer(contact, view));
  };

  _toggleEdit = () => {
    const { match, dispatch, inEdit } = this.props;

    dispatch(inEdit ? editingContactFinished() : editingContact());

    if (match.params.id === "new" && inEdit) {
      this.context.router.history.push("/contacts");
    }
  };

  _submit = () => {
    const { dispatch, match } = this.props;
    const { formState } = this.state;

    dispatch(saveContact(formState)).then(data => {
      if (match.params.id === "new" && typeof data === "object") {
        this.context.router.history.push(`/contacts/${data.id}`);
      }
    });
  };

  // @todo: Abstract this out
  _handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let thisState = this.state.formState;
    let fieldDef = _.find(this.props.customFields, f => f.alias === name);

    if (typeof fieldDef === "undefined") {
      fieldDef = {
        is_custom: false
      };
    }

    if (fieldDef.is_custom) {
      let customFieldIndex = _.findIndex(
        thisState.custom_fields,
        o => o.custom_field_id === fieldDef.id
      );

      if (customFieldIndex >= 0) {
        thisState.custom_fields[customFieldIndex].value = value;
      } else {
        thisState.custom_fields.push({
          custom_field_id: fieldDef.id,
          value: value
        });
      }
    } else {
      _.set(thisState, name, value);
    }

    this.setState({
      formState: thisState
    });
  };

  render() {
    const { inEdit, contact, user, error } = this.props;
    const groups = _.groupBy(this.props.customFields, "group");

    const contactFields = renderGroupedFields(
      inEdit,
      ["core", "personal", "social", "additional"],
      groups,
      contact,
      this._handleInputChange,
      false,
      error
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

    if (contact.id === null && this.props.match.params.id !== "new") {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">
            Select a contact on the left to view.
          </h2>
        </main>
      );
    }

    return (
      <main className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button
            className="btn btn-primary mr-3 btn-sm list-inline-item"
            onClick={() => this._toggleTaskCompose("call")}
          >
            <span className="h5">
              <MDIcons.MdLocalPhone />
            </span>
          </button>
          <button
            className="btn btn-link mr-2 btn-sm list-inline-item"
            onClick={() => this._toggleTaskCompose("email")}
          >
            <span className="h2">
              <MDIcons.MdMailOutline />
            </span>
          </button>
          <button
            className="btn btn-link mr-2 btn-sm list-inline-item"
            onClick={() => this._toggleTaskCompose("sms")}
          >
            <span className="h3">
              <MDIcons.MdPermPhoneMsg />
            </span>
          </button>
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
            {user.authorized(["admin", "manager", "user"]) ? (
              <div className="dropdown show">
                <div
                  className="text-dark mini-text cursor-pointer"
                  id="assigneeDropdown"
                  data-toggle="dropdown"
                >
                  <b>{contact.user.name ? contact.user.name : "Unassigned"}</b>
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
                <b>{contact.user.name ? contact.user.name : "Unassigned"}</b>
              </div>
            )}
          </div>
        </div>

        {inEdit ? (
          <span className="float-right py-3 mt-1">
            <a
              href="javascript:void(0);"
              className="btn btn-link text-muted btn-sm"
              onClick={this._toggleEdit}
            >
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
            <a
              href="javascript:void(0);"
              className="btn btn-link btn-sm text-primary"
              onClick={this._toggleEdit}
            >
              Edit
            </a>
          </span>
        )}
        <h4 className="border-bottom py-3">
          {contact.first_name} {contact.last_name}
          <TagsPartial
            tags={contact.tags}
            entityId={contact.id}
            entityType="App\Contact"
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
                      {contact.address1} {contact.address2}
                    </p>
                    <p className="text-muted">
                      {contact.city} {contact.state} {contact.zip}{" "}
                      {contact.country}
                    </p>
                  </div>
                </li>
              </ul>
            ) : null}
            {contactFields}
          </div>
          <Conversations
            dispatch={this.props.dispatch}
            conversations={_.filter(
              contact.activities,
              a => a.details_type !== "App\\FieldUpdateActivity"
            )}
          />
        </div>
      </main>
    );
  }
}

Record.propTypes = {
  contact: PropTypes.instanceOf(Contact).isRequired,
  user: PropTypes.instanceOf(User).isRequired
};

Record.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({
  customFields: getCustomFieldsForContacts(state),
  isDirty: isStateDirty(state),
  user: getActiveUser(state),
  inEdit: isInEdit(state),
  error: getContactError(state)
}))(Record);

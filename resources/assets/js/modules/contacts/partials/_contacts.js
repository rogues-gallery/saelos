import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ContactList from "../page/panels/list/components/list";
import * as MDIcons from "react-icons/lib/md";
import Select from "react-select";
import { searchContacts } from "../service";
import { saveCompany } from "../../companies/service";
import { saveOpportunity } from "../../opportunities/service";
import Company from "../../companies/Company";
import Opportunity from "../../opportunities/Opportunity";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: props.model.originalProps,
      formState: {
        id: null,
        pivot: {
          primary: null,
          position: null
        }
      },
      adding: false
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      model: nextProps.model.originalProps,
      formState: {
        id: null,
        pivot: {
          primary: null,
          position: null
        }
      }
    });
  }

  _toggleAdd = () => {
    this.setState({ adding: !this.state.adding });
  };

  _searchContacts = input => {
    let search = "";

    if (input && input.length > 0) {
      search = {
        searchString: input
      };
    }

    return searchContacts(search).then(contacts => {
      let options = contacts.map(c => ({
        id: c.id,
        name: `${c.first_name} ${c.last_name}`
      }));

      return { options };
    });
  };

  _handleInputChange = e => {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { formState } = this.state;

    if (name === "contact") {
      _.set(formState, "id", value.id);
      _.set(formState, "name", value.name);
    } else {
      _.set(formState, name, value);
    }

    this.setState({
      formState
    });
  };

  _submit = (toggle = true) => {
    const { dispatch } = this.props;
    const { formState, model } = this.state;
    const saveFunc =
      this.props.model instanceof Company ? saveCompany : saveOpportunity;
    let contacts = model.contacts;

    if (formState.id) {
      // unset primary on the rest
      if (formState.pivot.primary) {
        contacts = contacts.map(c => _.set(c, "pivot.primary", false));
      }

      contacts.push(formState);

      model.contacts = contacts;
    }

    dispatch(saveFunc(model));

    toggle && this._toggleAdd();
  };

  _delete = id => {
    const { dispatch } = this.props;
    const { model } = this.state;

    _.remove(model.contacts, c => c.id === id);

    this.setState({
      model
    });

    this._submit(false);
  };

  render() {
    const { inEdit } = this.props;
    const { formState, adding, model } = this.state;
    const { contacts } = model;
    const entityType =
      this.props.model instanceof Company ? "App\\Company" : "App\\Opportunity";

    return (
      <div className="card">
        <div className="card-header" id="headingContacts">
          <a
            href="javascript:void(0);"
            className="float-right"
            onClick={this._toggleAdd}
          >
            <strong>+ Add</strong>
          </a>
          <h6
            className="mb-0"
            data-toggle="collapse"
            data-target="#collapseContacts"
            aria-expanded="true"
            aria-controls="collapseContacts"
          >
            <MDIcons.MdKeyboardArrowDown /> Contacts{" "}
            <span className="text-muted font-weight-normal">
              ({contacts.length})
            </span>
          </h6>
        </div>

        {adding && (
          <div id="addContact" className="py-2 px-3 border-bottom">
            <div className="form-group-sm">
              <Select.Async
                value={
                  formState.id
                    ? { id: formState.id, name: formState.name }
                    : null
                }
                loadOptions={this._searchContacts}
                labelKey="name"
                valueKey="id"
                onChange={value => {
                  console.log(value);
                  const event = {
                    target: {
                      type: "select",
                      name: "contact",
                      value: value
                    }
                  };

                  this._handleInputChange(event);
                }}
              />
              <div className="row pt-2 no-gutters">
                <div className="col-sm-10">
                  <div className="input-group pr-1">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <input
                          type="checkbox"
                          id="primary"
                          name="pivot.primary"
                          onChange={this._handleInputChange}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Primary Contact"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      id="position"
                      name="pivot.position"
                      placeholder={
                        entityType === "App\\Opportunity" ? "Role" : "Position"
                      }
                      className="form-control"
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => this._submit(true)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          id="collapseContacts"
          className="collapse show mh-200"
          aria-labelledby="headingContacts"
        >
          <div className="list-group">
            {contacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => {
                  !inEdit &&
                    this.context.router.history.push(`/contacts/${contact.id}`);
                }}
                className="list-group-item list-group-item-action align-items-start"
              >
                {inEdit ? (
                  <a
                    href="javascript:void(0)"
                    className="mini-text text-muted float-right"
                    onClick={e => {
                      e.stopPropagation();

                      this._delete(contact.id);
                    }}
                  >
                    Delete
                  </a>
                ) : (
                  <p className="mini-text text-muted float-right">
                    <b>{contact.status ? contact.status.name : null}</b>
                  </p>
                )}

                <p>
                  {contact.pivot.primary ? (
                    <span className="dot bg-primary mini" />
                  ) : null}
                  <strong>{`${contact.first_name} ${
                    contact.last_name
                  }`}</strong>
                  <br />
                  {contact.pivot.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Contacts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.oneOfType([
    PropTypes.instanceOf(Opportunity),
    PropTypes.instanceOf(Company)
  ])
};

Contacts.contextTypes = {
  router: PropTypes.object
};

export default connect()(Contacts);

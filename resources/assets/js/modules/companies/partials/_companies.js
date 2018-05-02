import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import Select from "react-select";
import _ from "lodash";
import { searchCompanies } from "../service";
import { saveContact } from "../../contacts/service";
import { saveOpportunity } from "../../opportunities/service";
import Contact from "../../contacts/Contact";
import Opportunity from "../../opportunities/Opportunity";

class Companies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: props.model.originalProps,
      formState: {
        id: null,
        name: null,
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
        name: null,
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

  _searchCompanies = input => {
    let search = "";

    if (input && input.length > 0) {
      search = {
        searchString: input
      };
    }

    return searchCompanies(search).then(companies => {
      let options = companies.map(c => ({
        id: c.id,
        name: c.name
      }));

      return { options };
    });
  };

  _handleInputChange = e => {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { formState } = this.state;

    if (name === "company") {
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
      this.props.model instanceof Contact ? saveContact : saveOpportunity;
    let companies = model.companies;

    if (formState.id) {
      // unset primary on the rest
      if (formState.pivot.primary) {
        companies = companies.map(c => _.set(c, "pivot.primary", false));
      }

      companies.push(formState);

      model.companies = companies;
    }

    dispatch(saveFunc(model));

    toggle && this._toggleAdd();
  };

  _delete = id => {
    const { dispatch } = this.props;
    const { model } = this.state;

    _.remove(model.companies, c => c.id === id);

    this.setState({
      model
    });

    this._submit(false);
  };

  render() {
    const { inEdit } = this.props;
    const { formState, adding, model } = this.state;
    const { companies } = model;

    return (
      <div className="card">
        <div className="card-header" id="headingCompanies">
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
            data-target="#collapseCompanies"
            aria-expanded="true"
            aria-controls="collapseCompanies"
          >
            <MDIcons.MdKeyboardArrowDown /> Companies{" "}
            <span className="text-muted font-weight-normal">
              ({companies.length})
            </span>
          </h6>
        </div>
        {adding && (
          <div id="addCompany" className="py-2 px-3 border-bottom">
            <div className="form-group-sm">
              <Select.Async
                value={
                  formState.id
                    ? { id: formState.id, name: formState.name }
                    : null
                }
                loadOptions={this._searchCompanies}
                labelKey="name"
                valueKey="id"
                onChange={value => {
                  const event = {
                    target: {
                      type: "select",
                      name: "company",
                      value: value
                    }
                  };

                  this._handleInputChange(event);
                }}
              />
              <div className="row pt-2 no-gutters">
                <div className="col-10">
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
                          title="Primary Company"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      id="position"
                      name="pivot.position"
                      placeholder="Position"
                      className="form-control"
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-2 text-right">
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
          id="collapseCompanies"
          className="collapse show mh-200"
          aria-labelledby="headingCompanies"
        >
          <div className="list-group">
            {companies.map(company => (
              <div
                key={company.id}
                onClick={() => {
                  !inEdit &&
                    this.context.router.history.push(
                      `/companies/${company.id}`
                    );
                }}
                className="list-group-item list-group-item-action align-items-start"
              >
                {inEdit ? (
                  <a
                    href="javascript:void(0)"
                    className="mini-text text-muted float-right"
                    onClick={e => {
                      e.stopPropagation();

                      this._delete(company.id);
                    }}
                  >
                    Delete
                  </a>
                ) : (
                  <p className="mini-text text-muted float-right" />
                )}

                <p>
                  {company.pivot.primary ? (
                    <span className="dot bg-primary mini" />
                  ) : null}
                  <strong>{company.name}</strong>
                  <br />
                  {company.pivot.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Companies.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.oneOfType([
    PropTypes.instanceOf(Opportunity),
    PropTypes.instanceOf(Contact)
  ])
};

Companies.contextTypes = {
  router: PropTypes.object
};

export default connect()(Companies);

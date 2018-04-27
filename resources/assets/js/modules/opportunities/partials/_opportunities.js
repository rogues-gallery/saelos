import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import Select from "react-select";
import { connect } from "react-redux";
import _ from "lodash";
import Contact from "../../contacts/Contact";
import Company from "../../companies/Company";
import Opportunity from "../Opportunity";
import { saveContact } from "../../contacts/service";
import { saveCompany } from "../../companies/service";
import { searchOpportunities } from "../service";

class Opportunities extends React.Component {
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

  _searchOpportunities = input => {
    let search = "";

    if (input && input.length > 0) {
      search = {
        searchString: input
      };
    }

    return searchOpportunities(search).then(opportunities => {
      let options = opportunities.map(c => ({
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

    if (name === "opportunity") {
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
    const saveFunc = model instanceof Company ? saveCompany : saveContact;
    let opportunities = model.opportunities;

    if (formState.id) {
      // unset primary on the rest
      if (formState.pivot.primary) {
        opportunities = opportunities.map(c =>
          _.set(c, "pivot.primary", false)
        );
      }

      opportunities.push(formState);

      model.opportunities = opportunities;
    }

    dispatch(saveFunc(model));

    toggle && this._toggleAdd();
  };

  _delete = id => {
    const { dispatch } = this.props;
    const { model } = this.state;

    _.remove(model.opportunities, o => o.id === id);

    this.setState({
      model
    });

    this._submit(false);
  };

  _getSecondaryDetail(type) {
    switch (type) {
      case "App\\Contact":
        return "pivot.position";
      default:
        return "company.name";
    }
  }

  render() {
    const { inEdit } = this.props;
    const { formState, adding, model } = this.state;
    const { opportunities } = model;
    const entityType =
      this.props.model instanceof Company ? "App\\Company" : "App\\Contact";

    const secondaryDetail = this._getSecondaryDetail(entityType);

    return (
      <div className="card">
        <div className="card-header" id="headingOpportunities">
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
            data-target="#collapseOpportunities"
            aria-expanded="true"
            aria-controls="collapseOpportunities"
          >
            <MDIcons.MdKeyboardArrowDown /> Opportunities{" "}
            <span className="text-muted font-weight-normal">
              ({opportunities.length})
            </span>
          </h6>
        </div>

        {this.state.adding ? (
          <div id="addOpportunity" className="py-2 px-3 border-bottom">
            <div className="form-group-sm">
              <Select.Async
                value={
                  formState.id
                    ? { id: formState.id, name: formState.name }
                    : null
                }
                loadOptions={this._searchOpportunities}
                labelKey="name"
                valueKey="id"
                onChange={value => {
                  const event = {
                    target: {
                      type: "select",
                      name: "opportunity",
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
                      id="role"
                      name="pivot.position"
                      placeholder="Role"
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
        ) : (
          ""
        )}

        <div
          id="collapseOpportunities"
          className="collapse show mh-200"
          aria-labelledby="headingOpportunities"
        >
          <div className="list-group">
            {opportunities.map(opportunity => (
              <div
                key={opportunity.id}
                onClick={() => {
                  !inEdit &&
                    this.context.router.history.push(
                      `/opportunities/${opportunity.id}`
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

                      this._delete(opportunity.id);
                    }}
                  >
                    Delete
                  </a>
                ) : (
                  <p className="mini-text text-muted float-right">
                    <b>{opportunity.stage ? opportunity.stage.name : null}</b>
                  </p>
                )}

                <p>
                  {opportunity.pivot.primary ? (
                    <span className="dot bg-primary mini" />
                  ) : null}
                  <strong>{opportunity.name}</strong>
                  <br />
                  {opportunity.pivot.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Opportunities.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.oneOfType([
    PropTypes.instanceOf(Company),
    PropTypes.instanceOf(Contact)
  ])
};

Opportunities.contextTypes = {
  router: PropTypes.object
};

export default connect()(Opportunities);

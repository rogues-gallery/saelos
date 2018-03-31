import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import Select from 'react-select'
import _ from 'lodash'
import { searchCompanies } from "../service";
import { saveContact } from "../../contacts/service";
import { saveOpportunity } from "../../opportunities/service";

class Companies extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._toggleAdd = this._toggleAdd.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._getSecondaryDetail = this._getSecondaryDetail.bind(this)
    this._searchCompanies = this._searchCompanies.bind(this)

    this.state = {
      formState: {
        id: props.entityId,
        company: {
          id: null,
          name: null,
          pivot: {
            primary: null,
            position: null
          }
        }
      },
      adding: false
    }
  }

  _toggleAdd(e) {
    this.setState({adding: !this.state.adding})
  }

  _searchCompanies(input) {
    let search = '';

    if (input && input.length > 0) {
      search = {
        searchString: input
      }
    }

    return searchCompanies(search)
      .then(companies => {
        let options = companies.map(c => ({
            id: c.id,
            name: c.name
          })
        )

        return {options}
      })
  }

  _handleInputChange(e) {
    const { target } = e
    const { name } = target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { formState } = this.state

    _.set(formState, name, value)

    this.setState({
      formState
    })
  }

  _submit() {
    const { dispatch } = this.props
    let companies = this.props.companies.map(c => c.originalProps)
    const { company } = this.state.formState

    if (company.pivot.primary) {
      companies = companies.map(c => _.set(c, 'pivot.primary', false))
    }

    companies.push(company)

    const submitProps = {
      id: this.state.formState.id,
      companies
    }

    switch (this.props.entityType) {
      case 'App\\Contact':
        dispatch(saveContact(submitProps))
        break
      case 'App\\Opportunity':
        dispatch(saveOpportunity(submitProps))
        break
    }

    this._toggleAdd()
  }

  _getSecondaryDetail(type) {
    switch (type) {
      default:
        return 'position'
    }
  }

  render() {
    const { companies, entityType, entityId } = this.props;
    const secondaryDetail = this._getSecondaryDetail(entityType)

    return (
      <div className="card">
        <div className="card-header" id="headingCompanies">
          <a href="javascript:void(0);" className="float-right" onClick={this._toggleAdd}>
            <strong>+ Add</strong>
          </a>
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseCompanies" aria-expanded="true" aria-controls="collapseCompanies">
            <MDIcons.MdKeyboardArrowDown /> Companies <span className="text-muted font-weight-normal">({companies.length})</span>
          </h6>
        </div>
        {this.state.adding ?
          <div id="addCompany" className="py-2 px-3 border-bottom">
            <div className="form-group-sm">
              <Select.Async
                value={this.state.formState.company && this.state.formState.company.id ? this.state.formState.company : null}
                multi={false}
                loadOptions={this._searchCompanies}
                labelKey='name'
                valueKey='id'
                onChange={(value) => {
                  const event = {
                    target: {
                      type: 'select',
                      name: 'company',
                      value: value
                    }
                  }

                  this._handleInputChange(event);
                }}
              />
              <div className="row pt-2 no-gutters">
                <div className="col-sm-10">
                  <div className="input-group pr-1">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                          <input type="checkbox" id="primary" name="company.pivot.primary" onChange={this._handleInputChange} data-toggle="tooltip" data-placement="top" title="Primary Company" />
                      </div>
                    </div>
                    <input type="text" id="position" name="company.pivot.position" placeholder="Position" className="form-control" onChange={this._handleInputChange} />
                  </div>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-primary" onClick={this._submit}>Add</button>
                </div>
              </div>
            </div>
          </div>
          : ''}

        <div id="collapseCompanies" className="collapse show mh-200" aria-labelledby="headingCompanies">
          <div className="list-group border-bottom">
            {companies.map(company => (
              <div key={`company-${company.id}-${entityId}`} onClick={() => this.context.router.history.push(`/companies/${company.id}`)} className="list-group-item list-group-item-action align-items-start">
                <p className="mini-text text-muted float-right" />
                <p>
                  { company.primary ? <span class="dot bg-primary mini" /> : '' }
                  <strong>{company.name}</strong>
                  <br />{company[secondaryDetail]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

Companies.propTypes = {
  dispatch: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired
}

Companies.contextTypes = {
  router: PropTypes.object
}

export default connect()(Companies)

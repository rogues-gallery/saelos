import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import Select from 'react-select'
import _ from 'lodash'

class Companies extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._toggleAdd = this._toggleAdd.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._getSecondaryDetail = this._getSecondaryDetail.bind(this)

    this.state = {
      formState: {
        id: props.entityId,
        companies: props.companies
      },
      adding: false
    }
  }

  _submit() {
    this._toggleAdd()
  }

  _toggleAdd() {
    this.setState({adding: !this.state.adding})
  }

  _handleInputChange(e) {
    const { name, value } = e.target
    const { formState } = this.state

    if (typeof value === 'object') {
      const company = _.find(formState.companies, c => c.id === parseInt(value.id))

      if (company) {
        return
      }
    }
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
          <h6 className="mb-0" data-target="#collapseCompanies" aria-expanded="true" aria-controls="collapseCompanies">
            <MDIcons.MdKeyboardArrowDown /> Companies <span className="text-muted font-weight-normal">({companies.length})</span>
            <span className="float-right" onClick={this._toggleAdd}>
              + Add
            </span>
          </h6>
        </div>
        {this.state.adding ?
          <div id="addCompany" className="py-2 px-3 border-bottom">
            <input type="text" name="position" className="form-control" onChange={this._handleInputChange} />
            <button className="btn btn-primary" onClick={this._submit}>Add</button>
          </div>
          : ''}

        <div id="collapseCompanies" className="collapse show mh-200" aria-labelledby="headingCompanies">
          <div className="list-group border-bottom">
            {companies.map(company => (
              <div key={`company-${company.id}-${entityId}`} onClick={() => this.context.router.history.push(`/companies/${company.id}`)} className="list-group-item list-group-item-action align-items-start">
                <p className="mini-text text-muted float-right" />
                <p><strong>{company.name}</strong>
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
  companies: PropTypes.array.isRequired
}

Companies.contextTypes = {
  router: PropTypes.object
}

export default Companies
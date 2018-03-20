import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCompany, getCustomFieldsForCompanies, isStateDirty, getFirstCompanyId, isInEdit } from '../../../store/selectors'
import {fetchCompany, saveCompany, deleteCompany} from '../../../service'
import {searchContacts} from "../../../../contacts/service"
import {searchOpportunities} from "../../../../opportunities/service"
import _ from 'lodash'
import * as MDIcons from 'react-icons/lib/md'
import Select from 'react-select'
import {editingCompany, editingCompanyFinished} from "../../../store/actions"
import Contact from "../../../../contacts/Contact"
import FieldLayout from "../../../../contacts/page/panels/record/components/FieldLayout";


class Record extends React.Component {
  constructor(props) {
    super(props)

    this._toggleEdit = this._toggleEdit.bind(this)
    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._archive = this._archive.bind(this)
    this._delete = this._delete.bind(this)
    this._searchContacts = this._searchContacts.bind(this)
    this._searchOpportunities = this._searchOpportunities.bind(this)

    this.state = {
      formState: props.company.originalProps
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchCompany(this.props.match.params.id))

    if (this.props.match.params.id === 'new') { 
      this.props.dispatch(editingCompany())
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({formState: nextProps.company.originalProps})
  }

  _archive() {

  }

  _delete () {
    const { dispatch, company} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteCompany(company.id))
    }
  }

  _toggleEdit() {
    this.props.dispatch(editingCompany())
  }

  _submit() {
    this.props.dispatch(saveCompany(this.state.formState))
    this.props.dispatch(editingCompanyFinished())
  }

  _searchContacts(input, callback) {
    let search = '';

    if (input && input.length > 0) {
      search = {
        searchString: input
      }
    }

    return searchContacts(search)
      .then(contacts => {
        let options = contacts.map(c => {
          c = new Contact(c)
          return {
            value: c.id,
            label: c.name
          }
        })

        this.state.formState.people.map(p => {
          if (typeof _.find(options, o => o.value === p.id) === 'undefined') {
            options.push({value: p.id, label:p.name})
          }
        })

        callback(null, {options: options})

        return {options: options}
      })
  }

  _searchOpportunities(input, callback) {
    let search = '';

    if (input && input.length > 0) {
      search = {
        searchString: input
      }
    }

    return searchOpportunities(search)
      .then(opportunities => {
        let options = opportunities.map(c => {
          return {
            value: c.id,
            label: c.name
          }
        })

        this.state.formState.deals.map(d => {
          if (typeof _.find(options, o => o.value === d.id) === 'undefined') {
            options.push({value: d.id, label: d.name})
          }
        })

        callback(null, {options: options})

        return {options: options}
      })
  }

  // @todo: Abstract this out ... Don - looking at you.
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let companyState = this.state.formState;

    // Special handling for custom field state
    if (this.state.formState.hasOwnProperty(name) === false) {
      let customField = this.props.customFields[name];
      let companyCustomFieldIndex = _.findIndex(companyState.custom_fields, (o) => o.custom_field_id === customField.field_id);

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
    })

    console.log(this.state.formState)
  }

  render() {
    const { inEdit, company } = this.props
    const groups = _.groupBy(this.props.customFields, 'group')
    const companyFields = ['core', 'personal', 'social', 'additional'].map(key => {
      const emptyGroup = inEdit || (groups.hasOwnProperty(key) && groups[key].length) ? '' : 'd-none'
      return (
        <div className={`list-group list-group-flush`} key={`group-${key}-${company.id}`}>
          {key === 'core' ?
            <ul className="list-group list-group-flush">
              <li key="address" className="list-group-item">
                <div className="mini-text text-muted">Address</div>
                <div className="py-2">
                  <p className="font-weight-bold">{company.address1} {company.address2}</p>
                  <p className="text-muted">{company.city} {company.state} {company.zip} {company.country}</p>
                </div>
              </li>
            </ul>
            :
            ''
          }
          <ul className={`list-group list-group-flush ${emptyGroup}`}>
            <li key={key} className="list-group-item">
              <div className="mini-text text-muted">{key}</div>
              {_.sortBy(groups[key], ['ordering']).map(f => {
                return (
                  <FieldLayout model={company} field={f} inEdit={inEdit} onChange={this._handleInputChange} key={`group-field-key-${f.field_id}`} />
                )
              })
              }
            </li>
          </ul>
          <span className="d-none" />
        </div>
      )})

    return (
      <main className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item"><span className="h5"><MDIcons.MdAllInclusive /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdPlaylistAdd /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h3"><MDIcons.MdInput /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdInsertChart /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._archive}><span className="h2"><MDIcons.MdCheck /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._delete}><span className="h2"><MDIcons.MdDelete /></span></button>

          <div className="float-right text-right pt-2">
            <div className="mini-text text-muted">Assigned To</div>
            <div className="text-dark mini-text"><b>{company.user.name}</b></div>
          </div>
        </div>
        {inEdit ?
          <span className="float-right py-3 mt-1">
            <a href="javascript:void(0);" onClick={this._toggleEdit}>Cancel</a>
            <span className="ml-2 btn btn-primary btn-sm" onClick={this._submit}>Save</span>
          </span>
          :
          <span className="float-right py-3 mt-1">
            <a href="javascript:void(0);" onClick={this._toggleEdit}>Edit</a>
          </span>
        }
        <h4 className="border-bottom py-3">
          {company.name} <small className="ml-3"><button type="button" className="btn btn-outline-secondary btn-sm">+ ADD TAG</button></small>
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
          {inEdit ?          
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="mini-text text-muted">Relationships</div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Opportunities</label>
                    <div className="col-sm-9">
                      <Select.Async
                        key={`opportunities-select-${this.state.formState.opportunities && this.state.formState.opportunities.length}`}
                        value={this.state.formState.opportunities && this.state.formState.opportunities.map(o => o.id)}
                        multi={true}
                        loadOptions={this._searchOpportunities}
                        onChange={(values) => {
                          const event = {
                            target: {
                              type: 'select',
                              name: 'opportunities',
                              value: values.map(v => ({id: v.value, name: v.label}))
                            }
                          }

                          this._handleInputChange(event);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Contacts</label>
                    <div className="col-sm-9">
                      <Select.Async
                        key={`contacts-select-${this.state.formState.people && this.state.formState.people.length}`}
                        value={this.state.formState.people && this.state.formState.people.map(o => o.id)}
                        multi={true}
                        loadOptions={this._searchContacts}
                        onChange={(values) => {
                          const event = {
                            target: {
                              type: 'select',
                              name: 'people',
                              value: values.map(v => ({id: v.value, name: v.label}))
                            }
                          }

                          this._handleInputChange(event);
                        }}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            : ''}

          {companyFields}
          </div>
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  company: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  company: getCompany(state, ownProps.match.params.id || getFirstCompanyId(state)),
  customFields: getCustomFieldsForCompanies(state),
  isDirty: isStateDirty(state),
  inEdit: isInEdit(state)
}))(Record))
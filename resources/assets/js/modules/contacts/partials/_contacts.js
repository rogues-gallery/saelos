import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContactList from '../page/panels/list/components/list'
import * as MDIcons from 'react-icons/lib/md'
import Select from 'react-select'
import {searchContacts} from "../service"
import {saveCompany} from "../../companies/service"
import {saveOpportunity} from "../../opportunities/service"

class Contacts extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._toggleAdd = this._toggleAdd.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._searchContacts = this._searchContacts.bind(this)

    this.state = {
      formState: {
        id: props.entityId,
        contact: {
          id: null,
          pivot: {
            primary: null,
            position: null
          }
        }
      },
      adding: false
    }
  }

  _toggleAdd() {
    this.setState({adding: !this.state.adding})
  }

  _searchContacts(input) {
    let search = '';

    if (input && input.length > 0) {
      search = {
        searchString: input
      }
    }

    return searchContacts(search)
      .then(contacts => {
        let options = contacts.map(c => ({
            id: c.id,
            name: `${c.first_name} ${c.last_name}`
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
    const contacts = this.props.contacts.map(c => c.originalProps)

    contacts.push(this.state.formState.contact)

    const submitProps = {
      id: this.state.formState.id,
      contacts: contacts
    }

    switch (this.props.entityType) {
      case 'App\\Company':
        dispatch(saveCompany(submitProps))
        break
      case 'App\\Opportunity':
        dispatch(saveOpportunity(submitProps))
        break
    }

    this._toggleAdd()
  }

  render() {
    const { contacts, entityType, entityId, dispatch } = this.props

    return (
      <div className="card">
        <div className="card-header" id="headingContacts">
          <a href="javscript:void(0);" className="float-right" onClick={this._toggleAdd}>
            <strong>+ Add</strong>
          </a>
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseContacts" aria-expanded="true" aria-controls="collapseContacts">
            <MDIcons.MdKeyboardArrowDown /> Contacts <span className="text-muted font-weight-normal">({contacts.length})</span>
          </h6>
        </div>

        {this.state.adding ?
          <div id="addContact" className="py-2 px-3 border-bottom">
            <div class="form-group-sm">
              <Select.Async
                value={this.state.formState.contact && this.state.formState.contact.id ? this.state.formState.contact : null}
                multi={false}
                loadOptions={this._searchContacts}
                labelKey='name'
                valueKey='id'
                onChange={(value) => {
                  const event = {
                    target: {
                      type: 'select',
                      name: 'contact',
                      value: value
                    }
                  }

                  this._handleInputChange(event);
                }}
              />
              <div className="row pt-2 no-gutters">
                <div class="col-sm-10">
                  <div className="input-group pr-1">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <input type="checkbox" id="primary" name="contact.pivot.primary" onChange={this._handleInputChange} data-toggle="tooltip" data-placement="top" title="Primary Contact"/>
                      </div>
                    </div>
                    <input type="text" id="position" name="contact.pivot.position" placeholder={entityType === 'App\\Opportunity' ? 'Role' : 'Position'} className="form-control" onChange={this._handleInputChange} />
                  </div>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-primary" onClick={this._submit}>Add</button>
                </div>
              </div>
            </div>
          </div>
          : ''}

        <div id="collapseContacts" className="collapse show mh-200" aria-labelledby="headingContacts">
          <div className="list-group border-bottom">
            <ContactList contacts={contacts} dispatch={dispatch} />
          </div>
        </div>
      </div>
    )
  }
}

Contacts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.number.isRequired
}

export default connect()(Contacts)
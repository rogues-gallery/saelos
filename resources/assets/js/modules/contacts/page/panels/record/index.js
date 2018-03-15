import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../../../user/store/selectors'
import {getContact, getCustomFieldsForContacts, isStateDirty, getFirstContactId} from '../../../store/selectors'
import {deleteContact, fetchContact, saveContact} from '../../../service'
import {editingContact, editingContactFinished} from '../../../store/actions'
import Conversations from '../../../../conversations/partials/_conversations'
import { ActionView } from './components'
import FieldLayout from './components/FieldLayout'
import { Link } from "react-router-dom"
import _ from 'lodash';
import * as MDIcons from 'react-icons/lib/md'


class Record extends React.Component {
  constructor(props) {
    super(props)

    this._toggleEdit = this._toggleEdit.bind(this)
    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._setActionView = this._setActionView.bind(this)
    this._archive = this._archive.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      inEdit: false,
      formState: props.contact.originalProps,
      actionView: "none"
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchContact(this.props.contact.id))
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({formState: nextProps.contact.originalProps})
  }

  _archive() {

  }

  _delete () {
    const { dispatch, contact} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteContact(contact.id))
    }
  }

  _setActionView(view) {
    view = view === this.state.actionView ? "none" : view

    this.setState({actionView: view})
  }

  _toggleEdit() {
    this.setState({inEdit: !this.state.inEdit})
    this.props.dispatch(editingContact())
  }

  _submit() {
    this.props.dispatch(saveContact(this.state.formState))
    this.setState({inEdit: false})
    this.props.dispatch(editingContactFinished())
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let contactState = this.state.formState;

    // Special handling for custom field state
    if (this.state.formState.hasOwnProperty(name) === false) {
      let customField = this.props.customFields[name];
      let contactCustomFieldIndex = _.findIndex(contactState.custom_fields, (o) => o.custom_field_id === customField.field_id);

      if (contactCustomFieldIndex >= 0) {
        contactState.custom_fields[contactCustomFieldIndex].value = value;
      } else {
        contactState.custom_fields.push({
          custom_field_id: customField.field_id,
          value: value
        });
      }
    } else {
      _.set(contactState, name, value);
    }

    this.setState({
      formState: contactState
    });
  }

  render() {
    const { contact, user } = this.props;
    const groups = _.groupBy(this.props.customFields, 'group');
    const inEdit = this.state.inEdit;
    const order = [
      'core',
      'personal',
      'social',
      'additional'
    ]

    const contactFields = order.map(key => {
      const emptyGroup = inEdit || (groups.hasOwnProperty(key) && groups[key].length) ? '' : 'd-none'
      return (
        <div key={`group-${key}-${contact.id}`}>
          <ul className={`list-group list-group-flush ${emptyGroup}`}>
            <li key={key} className="list-group-item">
              <div className="mini-text text-muted">{key}</div>
              {_.sortBy(groups[key], ['ordering']).map(f => {
                return (
                  <FieldLayout contact={contact} field={f} inEdit={inEdit} onChange={this._handleInputChange} />
                )
              })
              }
            </li>
          </ul>
          {key === 'core' ?
            <ul className="list-group list-group-flush">
              <li key="address" className="list-group-item">
                <div className="mini-text text-muted">Address</div>
                <div className="py-2">
                  <p className="font-weight-bold">{contact.address1} {contact.address2}</p>
                  <p className="text-muted">{contact.city} {contact.state} {contact.zip} {contact.country}</p>
                </div>
              </li>
            </ul>
            :
            ''
          }
          <span className="d-none" />
        </div>
      )})

    const companyDisplay = contact.company.id ? <Link className="hidden-link" to={`/companies/${contact.company.id}`}>{contact.company.name}</Link> : 'Unknown'

    const onAssignmentChange = (id) => {
      const event = {
        target: {
          type: 'text',
          name: 'user_id',
          value: id
        }
      }
      this._handleInputChange(event)
      this._submit()
    }

    return (
      <main className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item" onClick={() => this._setActionView('call')}><span className="h5"><MDIcons.MdLocalPhone /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={() => this._setActionView('email')}><span className="h2"><MDIcons.MdMailOutline /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={() => this._setActionView('sms')}><span className="h3"><MDIcons.MdPermPhoneMsg /></span></button>
          {/*<button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdCallMerge /></span></button>*/}
          {/*<button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h5"><MDIcons.MdAllInclusive /></span></button>*/}
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={() => this._setActionView('task')}><span className="h2"><MDIcons.MdPlaylistAdd /></span></button>
          {/*<button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h3"><MDIcons.MdInput /></span></button>*/}
          {/*<button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdInsertChart /></span></button>*/}
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._archive}><span className="h2"><MDIcons.MdCheck /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._delete}><span className="h2"><MDIcons.MdDelete /></span></button>

          <div className="float-right text-right pt-2">
            <div className="mini-text text-muted">Assigned To</div>
            <div className="dropdown show">
              <div className="text-dark mini-text cursor-pointer" id="assigneeDropdown" data-toggle="dropdown"><b>{contact.user.name ? contact.user.name : 'Unassigned'}</b></div>
              <div className="dropdown-menu" aria-labelledby="assigneeDropdown">
                {user.team.users.map(u => (
                  <a key={`team-${user.team.id}-member-${u.id}`} className="dropdown-item" href="javascript:void(0)" onClick={() => onAssignmentChange(u.id)}>{u.name}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {this.state.actionView !== "none" ?
          <div className="border-bottom">
            <div className="card actionView my-2">
              <ActionView view={this.state.actionView} contact={contact} />
            </div>
          </div>
          :
          ''
        }

        {inEdit ?
          <span className="float-right py-3 mt-1">
            <a href="javascript:void(0);" className="btn btn-link text-muted btn-sm" onClick={this._toggleEdit}>Cancel</a>
            <span className="ml-2 btn btn-primary btn-sm" onClick={this._submit}>Save</span>
          </span>
          :
          <span className="float-right py-3 mt-1">
            <a href="javascript:void(0);" className="btn btn-link btn-sm text-primary" onClick={this._toggleEdit}>Edit</a>
          </span>
        }
        <h4 className="border-bottom py-3">
          {contact.first_name} {contact.last_name} <small className="ml-3"><button type="button" className="btn btn-outline-secondary btn-sm">+ ADD TAG</button></small>
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            {!inEdit ?
              <ul className="list-group list-group-flush">
                <li key="company" className="list-group-item">
                  <div className="mini-text text-muted">Professional</div>
                  <div className="py-2">
                    <p className="h6">{contact.position ? contact.position : 'Works'} <span className="text-muted">at</span> {companyDisplay} </p>
                    <p className="text-muted">{contact.company.address1} {contact.company.city} {contact.company.state} {contact.company.zip} {contact.company.country}</p>
                  </div>
                </li>
              </ul>
              :
              ''
            }

            {contactFields}

          </div>

          <Conversations dispatch={this.props.dispatch} conversations={_.filter(contact.activities, a => a.details_type !== 'App\\FieldUpdateActivity')} />

        </div>
      </main>
    )
  }
}

Record.propTypes = {
  contact: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id || getFirstContactId(state)),
  customFields: getCustomFieldsForContacts(state),
  isDirty: isStateDirty(state),
  user: getUser(state)
}))(Record))
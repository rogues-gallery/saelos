import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../../../user/store/selectors'
import {getContact, getCustomFieldsForContacts, isStateDirty, getFirstContactId, isInEdit} from '../../../store/selectors'
import {deleteContact, fetchContact, saveContact} from '../../../service'
import {editingContact, editingContactFinished} from '../../../store/actions'
import Conversations from '../../../../conversations/partials/_conversations'
import { ActionView } from './components'
import _ from 'lodash';
import * as MDIcons from 'react-icons/lib/md'
import {renderGroupedFields} from "../../../../../utils/helpers/fields"
import TagsPartial from '../../../../tags/partials/tags'


class Record extends React.Component {
  constructor(props) {
    super(props)

    this._toggleEdit = this._toggleEdit.bind(this)
    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._setActionView = this._setActionView.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      formState: props.contact.originalProps,
      actionView: "none"
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    if (this.props.match.params.id === 'new') {
      dispatch(editingContact())
    } else {
      dispatch(fetchContact(this.props.match.params.id))
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({formState: nextProps.contact.originalProps})
  }

  _delete () {
    const { dispatch, contact} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteContact(contact.id))
      this.context.router.history.push('/contacts')
    }
  }

  _setActionView(view) {
    view = view === this.state.actionView ? "none" : view

    this.setState({actionView: view})
  }

  _toggleEdit() {
    this.props.dispatch(editingContact())
  }

  _submit() {
    this.props.dispatch(saveContact(this.state.formState))
    this.props.dispatch(editingContactFinished())
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let contactState = this.state.formState;

    // Special handling for custom field state
    if (this.state.formState.hasOwnProperty(name) === false && this.props.customFields[name]) {
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

    // Set the value on the contact prop as well
    _.set(this.props.contact, name, value)
  }

  render() {
    const { inEdit, contact, user } = this.props
    const groups = _.groupBy(this.props.customFields, 'group')

    const contactFields = renderGroupedFields(
      inEdit,
      ['core', 'personal', 'social', 'additional'],
      groups,
      contact,
      this._handleInputChange
    )

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
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={() => this._setActionView('task')}><span className="h2"><MDIcons.MdPlaylistAdd /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._delete}><span className="h2"><MDIcons.MdDelete /></span></button>

          <div className="float-right text-right pt-2">
            <div className="mini-text text-muted">Assigned To</div>
            { user.authorized(['admin', 'manager']) ? 
            <div className="dropdown show">
              <div className="text-dark mini-text cursor-pointer" id="assigneeDropdown" data-toggle="dropdown"><b>{contact.user.name ? contact.user.name : 'Unassigned'}</b></div>
              <div className="dropdown-menu" aria-labelledby="assigneeDropdown">
                {user.team.users.map(u => (
                  <a key={`team-${user.team.id}-member-${u.id}`} className="dropdown-item" href="javascript:void(0)" onClick={() => onAssignmentChange(u.id)}>{u.name}</a>
                ))}
              </div>
            </div>
            : <div className="text-dark mini-text"><b>{contact.user.name ? contact.user.name : 'Unassigned'}</b></div> }
          </div>
        </div>

        {this.state.actionView !== "none" ?
          <div className="border-bottom">
            <div className="card actionView my-2">
              <ActionView view={this.state.actionView} toggle={this._setActionView} contact={contact} user={user} />
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
          {contact.first_name} {contact.last_name}
          <TagsPartial tags={contact.tags} />
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            {!inEdit ?
              <ul className="list-group list-group-flush">
                <li key="address" className="list-group-item">
                  <div className="mini-text text-muted">Address</div>
                  <div className="py-2">
                    <p className="font-weight-bold">{contact.address1} {contact.address2}</p>
                    <p className="text-muted">{contact.city} {contact.state} {contact.zip} {contact.country}</p>
                  </div>
                </li>
              </ul>
              : ''}
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

Record.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id || getFirstContactId(state)),
  customFields: getCustomFieldsForContacts(state),
  isDirty: isStateDirty(state),
  user: getUser(state),
  inEdit: isInEdit(state)
}))(Record))
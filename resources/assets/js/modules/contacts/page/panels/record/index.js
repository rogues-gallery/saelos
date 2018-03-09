import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getContact, getCustomFieldsForContacts, isStateDirty} from '../../../store/selectors';
import { fetchContact, saveContact } from '../../../service';
import _ from 'lodash';
import * as MDIcons from 'react-icons/lib/md'
import ReactQuill from 'react-quill'

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
    if (this.props.match.params.id) {
      this.props.dispatch(fetchContact(this.props.match.params.id))
    }
  }

  componentWillReceiveProps(next) {
    this.setState({formState: next.contact.originalProps})
  }

  _archive() {

  }

  _delete () {

  }

  _setActionView(view) {
    view = view === this.state.actionView ? "none" : view

    this.setState({actionView: view})
  }

  _toggleEdit() {
    this.setState({inEdit: !this.state.inEdit})
  }

  _submit() {
    this.props.dispatch(saveContact(this.state.formState))

    this.setState({inEdit: false})
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let contactState = this.state.formState;

    // Special handling for custom field state
    if (this.state.formState.hasOwnProperty(name) === false) {
      let customField = this.props.customFields[_.split(name, '.')[1]];
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
    const { contact } = this.props;
    const groups = _.groupBy(this.props.customFields, 'group');
    const inEdit = this.state.inEdit;
    const contactFields = Object.keys(groups).map(key => (
      <div className="card mb-1" key={contact.id + key}>
        <ul className="list-group list-group-flush">
          <li key={key} className="list-group-item">
            <div className="mini-text text-muted">{key}</div>
            {groups[key].map(f => {
              let fieldValue = _.get(contact, f.alias);

              if (typeof fieldValue === 'object') {
                fieldValue = _.get(fieldValue, 'name');
              }

              const hidden = typeof fieldValue === 'undefined' || fieldValue.length === 0 ? 'd-none' : '';
              const readOnly = !inEdit ? {
                readOnly: true,
                className: 'form-control-plaintext'
              } : {
                readOnly: false,
                className: 'form-control'
              }

              return (
                <div className={`form-group row ${hidden}`} key={f.alias}>
                  <label htmlFor={f.alias} className="col-sm-3 col-form-label">{f.label}</label>
                  <div className="col-sm-9">
                    <input type="text" {...readOnly} id={f.alias} name={f.alias} onChange={this._handleInputChange} defaultValue={fieldValue} />
                  </div>
                </div>
              )
            })
          }
          </li>
        </ul>
      </div>
    ));

    return (
      <main className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item" onClick={() => this._setActionView('call')}><span className="h5"><MDIcons.MdLocalPhone /></span></button>
          <button className="btn btn-link text-muted mr-2 btn-sm list-inline-item" onClick={() => this._setActionView('email')}><span className="h2"><MDIcons.MdMailOutline /></span></button>
          <button className="btn btn-link text-muted mr-2 btn-sm list-inline-item" onClick={() => this._setActionView('sms')}><span className="h3"><MDIcons.MdPermPhoneMsg /></span></button>
          <button className="btn btn-link text-muted mr-2 btn-sm list-inline-item" onClick={this._archive}><span className="h2"><MDIcons.MdCheck /></span></button>
          <button className="btn btn-link text-muted mr-2 btn-sm list-inline-item" onClick={this._delete}><span className="h2"><MDIcons.MdDelete /></span></button>

          <div className="float-right text-right pt-2">
            <div className="mini-text text-muted">Assigned To</div>
            <div className="text-dark mini-text"><b>{contact.user.name}</b></div>
          </div>
        </div>

        {this.state.actionView != "none" ? 
          <div className="border-bottom">
            <div className="card actionView my-2">
              <ActionView view={this.state.actionView} />
            </div>
          </div>
        :
          ''
        }

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
          {contact.first_name} {contact.last_name} <small className="ml-3"><button type="button" className="btn btn-outline-secondary btn-sm">+ ADD TAG</button></small>
        </h4>

        <div className="h-scroll">
          {contactFields}
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  contact: PropTypes.object.isRequired
}

class ActionView extends React.Component {
  render() {
    switch (this.props.view) {
      case "email":
        return (
          <div className="card-body emailActionView">
            <div className="float-right">
              <span className="mini-text text-muted font-weight-bold">CC | BCC</span>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Subject</label>
              <input type="text" className="form-control" placeholder="Enter email subject" />
            </div>
            <div className="form-group">
              <ReactQuill value={this.props.view} />
            </div>
            <button className="btn btn-primary">Send</button><button className="btn btn-link text-muted" onClick={() => this._setActionView('none')} >Cancel</button>
          </div>
          )
      case "call":
        return (
          <div className="card-body callActionView">
            <div class="row">
              <div className="col fw-100 border-right">
                <button className="btn btn-primary btn-lg" onClick={() => this._setActionView('call')}><span className="h2"><MDIcons.MdLocalPhone /></span></button>
              </div>
              <div className="col">
                <p>
                  Click the button to the left to initiate a call to this user. Once the call is completed please enter your Rep Sentiment Score below.
                </p>
              </div>
            </div>
          </div>
        )
      case "sms":
        return (
          <div className="card-body smsActionView">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Message</label>
              <input type="text" className="form-control" placeholder="Enter SMS message" />
            </div>
            <button className="btn btn-primary">Send</button><button className="btn btn-link text-muted" onClick={() => this._setActionView('none')} >Cancel</button>
          </div>
        )
      default:
        return ''
    }

    
  }
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id),
  customFields: getCustomFieldsForContacts(state),
  isDirty: isStateDirty(state)
}))(Record))
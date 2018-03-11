import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getContact, getCustomFieldsForContacts, isStateDirty, getFirstContactId} from '../../../../contacts/store/selectors';
import { fetchContact, saveContact } from '../../../../contacts/service';
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
    let groups = _.groupBy(this.props.customFields, 'group');
    const inEdit = this.state.inEdit;

    groups = {
      core: groups.core,
      personal: groups.personal,
      social: groups.social,
      additional: groups.additional_info
    }
    
    const contactFields = Object.keys(groups).map(key => (
        <ul key={`group-${key}`} className="list-group list-group-flush">
          <li key={key} className="list-group-item">
            <div className="mini-text text-muted">{key}</div>
            {_.sortBy(groups[key], ['ordering']).map(f => {
              let fieldValue = _.get(contact, f.alias);

              if (typeof fieldValue === 'object') {
                fieldValue = _.get(fieldValue, 'name');
              }
              console.log(f.summary)
              const hidden = typeof fieldValue === 'undefined' || f.hidden || fieldValue.length === 0 || !f.summary ? 'd-none' : '';
              const readOnly = !inEdit ? {
                readOnly: true,
                className: 'form-control-plaintext'
              } : {
                readOnly: false,
                className: 'form-control'
              }

              return (
                <div className={`form-group mb-2 row ${hidden}`} key={f.alias}>
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
    ));

    return (
      <main className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item"><span className="h5"><MDIcons.MdPlaylistAdd /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._archive}><span className="h2"><MDIcons.MdCheck /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._delete}><span className="h2"><MDIcons.MdDelete /></span></button>

        </div>

        {this.state.actionView !== "none" ?
          <div className="border-bottom">
            <div className="card actionView my-2">
              <ActionView view={this.state.actionView} />
            </div>
          </div>
        :
          ''
        }

        <h4 className="border-bottom py-3">
          Title for this view
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <div className="card-body">Task information will go here.</div>
          </div>
          <div className="card mb-1">
            <ul className="list-group list-group-flush">
              <li key="company" className="list-group-item">
                <div className="mini-text text-muted">Contact Information</div>
                <div className="py-2">
                  <p className="font-weight-bold"><Link className="hidden-link" to={`/contacts/${contact.id}`}>{contact.first_name} {contact.last_name}</Link></p>
                  <p className=""><Link className="hidden-link" to={`/companies/${contact.company.id}`}>{contact.company.name}</Link></p>
                  <p className="text-muted">{contact.company.address1} {contact.company.city} {contact.company.state} {contact.company.zip}</p>
                </div>
              </li>
            </ul>
            {contactFields}

          </div>
        <div className="card mb-3">
          <div className="card-body">Conversations will go here.</div>
        </div>
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
  isDirty: isStateDirty(state)
}))(Record))
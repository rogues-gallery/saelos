import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAccount, getCustomFieldsForAccounts, isStateDirty } from '../../../store/selectors'
import { fetchAccount, saveAccount } from '../../../service'
import _ from 'lodash'
import * as MDIcons from 'react-icons/lib/md'

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._toggleEdit = this._toggleEdit.bind(this)
    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)

    this.state = {
      inEdit: false,
      formState: props.account.originalProps
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.dispatch(fetchAccount(this.props.match.params.id))
    }
  }

  componentWillReceiveProps(next) {
    this.setState({formState: next.account.originalProps})
  }

  _toggleEdit() {
    this.setState({inEdit: !this.state.inEdit})
  }

  _submit() {
    this.props.dispatch(saveAccount(this.state.formState))

    this.setState({inEdit: false})
  }

  // @todo: Abstract this out ... Don - looking at you.
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let accountState = this.state.formState;

    // Special handling for custom field state
    if (this.state.formState.hasOwnProperty(name) === false) {
      let customField = this.props.customFields[_.split(name, '.')[1]];
      let accountCustomFieldIndex = _.findIndex(accountState.custom_fields, (o) => o.custom_field_id === customField.field_id);

      if (accountCustomFieldIndex >= 0) {
        accounntState.custom_fields[accountCustomFieldIndex].value = value;
      } else {
        accountState.custom_fields.push({
          custom_field_id: customField.field_id,
          value: value
        });
      }
    } else {
      _.set(accountState, name, value);
    }

    this.setState({
      formState: accountState
    });
  }

  render() {
    const { account } = this.props
    const groups = _.groupBy(this.props.customFields, 'group')
    const inEdit = this.state.inEdit
    const accountFields = Object.keys(groups).map(key => (
      <div className="card mb-1" key={account.id + key}>
        <ul className="list-group list-group-flush">
          <li key={key} className="list-group-item">
            <div className="mini-text text-muted">{key}</div>
            {groups[key].map(f => {
              let fieldValue = _.get(account, f.alias);

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
          <button className="btn btn-primary mr-3 btn-sm list-inline-item"><span className="h5"><MDIcons.MdLocalPhone /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2 text-muted"><MDIcons.MdMailOutline /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h3 text-muted"><MDIcons.MdPermPhoneMsg /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2 text-muted"><MDIcons.MdCheck /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2 text-muted"><MDIcons.MdDelete /></span></button>

          <div className="float-right text-right pt-2">
            <div className="mini-text text-muted">Assigned To</div>
            <div className="text-dark mini-text"><b>{account.user.name}</b></div>
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
          {account.name} <small className="ml-3"><button type="button" className="btn btn-outline-secondary btn-sm">+ ADD TAG</button></small>
        </h4>

        <div className="h-scroll">
          {accountFields}
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  account: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  account: getAccount(state, ownProps.match.params.id),
  customFields: getCustomFieldsForAccounts(state),
  isDirty: isStateDirty(state)
}))(Record))
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCompany, getCustomFieldsForCompanies, isStateDirty, getFirstCompanyId, isInEdit } from '../../../store/selectors'
import {fetchCompany, saveCompany, deleteCompany} from '../../../service'
import _ from 'lodash'
import * as MDIcons from 'react-icons/lib/md'
import {editingCompany, editingCompanyFinished} from "../../../store/actions"
import {renderGroupedFields} from "../../../../../utils/helpers/fields"
import Conversations from "../../../../conversations/partials/_conversations"
import TagsPartial from '../../../../tags/partials/tags'


class Record extends React.Component {
  constructor(props) {
    super(props)

    this._toggleEdit = this._toggleEdit.bind(this)
    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      formState: props.company.originalProps
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    if (this.props.match.params.id === 'new') { 
      dispatch(editingCompany())
    } else {
      dispatch(fetchCompany(this.props.match.params.id))
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({formState: nextProps.company.originalProps})
  }

  _delete () {
    const { dispatch, company} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteCompany(company.id))
      this.context.router.history.push('/companies')
    }
  }

  _toggleEdit() {
    this.props.dispatch(editingCompany())
  }

  _submit() {
    this.props.dispatch(saveCompany(this.state.formState))
    this.props.dispatch(editingCompanyFinished())
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
    const companyFields = renderGroupedFields(
      inEdit,
      ['core', 'personal', 'social', 'additional'],
      groups,
      company,
      this._handleInputChange
    )

    if (company.id == 0) {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">Select a company on the left to view.</h2>
        </main>
        )
    }

    return (
      <main className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item"><span className="h5"><MDIcons.MdAllInclusive /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdPlaylistAdd /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h3"><MDIcons.MdInput /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdInsertChart /></span></button>
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
          {company.name}
          <TagsPartial tags={company.tags} entityId={company.id} entityType="App\Company" />
      </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            {!inEdit ?
              <ul className="list-group list-group-flush">
                <li key="address" className="list-group-item">
                  <div className="mini-text text-muted">Address</div>
                  <div className="py-2">
                    <p className="font-weight-bold">{company.address1} {company.address2}</p>
                    <p className="text-muted">{company.city} {company.state} {company.zip} {company.country}</p>
                  </div>
                </li>
              </ul>
              : ''}
            {companyFields}
          </div>
          <Conversations dispatch={this.props.dispatch} conversations={_.filter(company.activities, a => a.details_type !== 'App\\FieldUpdateActivity')} />
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  company: PropTypes.object.isRequired
}

Record.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  company: getCompany(state, ownProps.match.params.id || getFirstCompanyId(state)),
  customFields: getCustomFieldsForCompanies(state),
  isDirty: isStateDirty(state),
  inEdit: isInEdit(state)
}))(Record))
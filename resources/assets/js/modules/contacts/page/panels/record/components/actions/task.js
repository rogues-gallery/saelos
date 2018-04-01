import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import { getUser } from '../../../../../../user/store/selectors'
import {saveActivity} from "../../../../../../activities/service"
import Select from 'react-select'
import DatePicker from '../../../../../../../common/ui/datepicker'

class TaskAction extends Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._submit = this._submit.bind(this)
    this._cancel = this._cancel.bind(this)

    this.state = {
      formState: {
        user_id: this.props.user.id,
        contact_id: typeof this.props.contact !== 'undefined' ? this.props.contact.id : null,
        opportunity_id: typeof this.props.opportunity !== 'undefined' ? this.props.opportunity.id : null,
        company_id: typeof this.props.company !== 'undefined' ? this.props.company.id : null
      }
    }
  }

  _handleInputChange(event) {
    const { target } = event
    const { name, value } = target
    const { formState } = this.state

    formState[name] = value

    this.setState({
      formState
    });
  }

  _handleContentChange(value) {
    const { formState } = this.state

    formState.description = value

    this.setState({
      formState
    })
  }

  _submit() {
    const { formState } = this.state

    if (typeof formState.details_type === 'undefined') {
      alert('Please select a task type')
    } else {
      this.props.dispatch(saveActivity(formState))
        .then(() => {
          this.setState({
            formState: {
              user_id: this.props.user.id,
              contact_id: typeof this.props.contact !== 'undefined' ? this.props.contact.id : null,
              opportunity_id: typeof this.props.opportunity !== 'undefined' ? this.props.opportunity.id : null,
              company_id: typeof this.props.company !== 'undefined' ? this.props.company.id : null
            }
          })

          this.props.toggle('task')
        })
    }
  }

  _cancel() {
    this.setState({
      formState: {
        user_id: this.props.user.id,
        contact_id: typeof this.props.contact !== 'undefined' ? this.props.contact.id : null,
        opportunity_id: typeof this.props.opportunity !== 'undefined' ? this.props.opportunity.id : null,
        company_id: typeof this.props.company !== 'undefined' ? this.props.company.id : null
      }
    })

    this.props.toggle('task')
  }

  render() {
    const { contact, company, opportunity, user } = this.props
    const { formState } = this.state

    const contactOptions = typeof company !== 'undefined' ?
      company.contacts.map(c => ({value: c.id, label: c.name}))
      : typeof opportunity !== 'undefined' ?
        opportunity.contacts.map(c => ({value: c.id, label: c.name}))
        : []
    const companyOptions = typeof contact !== 'undefined' ?
      contact.companies.map(c => ({value: c.id, label: c.name}))
      : typeof opportunity !== 'undefined' ?
        opportunity.companies.map(c => ({value: c.id, label: c.name}))
        : []
    const opportunityOptions = typeof contact !== 'undefined' ?
      contact.opportunities.map(o => ({value: o.id, label: o.name}))
      : typeof company !== 'undefined' ?
          company.opportunities.map(o => ({value: o.id, label: o.name}))
        : []


    return(
      <div className="card-body taskActionView">
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="assignee_name">Assignee</label>
            { user.authorized(['admin', 'manager']) ?
              <select className="form-control" defaultValue={user.id}>
                {user.team.users.map(u => (
                  <option key={`team-${user.team.id}-member-${u.id}`} value={u.id}>{u.name}</option>
                ))}
              </select>
            : <input type="text" readOnly className="form-control" value={u.id}>{u.name}</input> }
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="due_date">Type</label>
            <select className="form-control" name="details_type" onChange={this._handleInputChange}>
              <option value="">Select...</option>
              <option value="App\CallActivity">Call</option>
              <option value="App\EmailActivity">Email</option>
              <option value="App\SmsActivity">Sms</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="due_date">Due Date</label>
            <DatePicker className="form-control" name="due_date" placeholder="Enter due date" onChange={this._handleInputChange} value={formState.due_date} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="task_name">Name</label>
            <input type="text" className="form-control" name="name" placeholder="Enter task name" onChange={this._handleInputChange} value={formState.name} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <ReactQuill onChange={this._handleContentChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="col pt-4">
            <button className="btn btn-primary" onClick={this._submit}>Create</button>
            <button className="btn btn-link text-muted" onClick={this._cancel}>Cancel</button>
          </div>

          {opportunityOptions.length ?
            <div className="col">
              <label htmlFor="emailOpportunity">Opportunity</label>
              <Select
                multi={false}
                value={this.state.formState.opportunity_id}
                onChange={(value) => {
                  const event = {
                    target: {
                      name: 'opportunity_id',
                      value: value ? value.value : null
                    }
                  }

                  this._handleInputChange(event)
                }}
                options={opportunityOptions} />
            </div>
            : ''}

            {contactOptions.length ?
              <div className="col">
                <label htmlFor="emailOpportunity">Contact</label>
                <Select
                  multi={false}
                  value={this.state.formState.contact_id}
                  onChange={(value) => {
                    const event = {
                      target: {
                        name: 'contact_id',
                        value: value ? value.value : null
                      }
                    }

                    this._handleInputChange(event)
                  }}
                  options={contactOptions} />
              </div>
              : ''}

          {companyOptions.length ?
            <div className="col">
              <label htmlFor="emailCompany">Company</label>
              <Select
                multi={false}
                value={this.state.formState.company_id}
                onChange={(value) => {
                  const event = {
                    target: {
                      name: 'company_id',
                      value: value ? value.value : null
                    }
                  }

                  this._handleInputChange(event)
                }}
                options={companyOptions} />
            </div>
            : ''}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: getUser(state)
}))(TaskAction)

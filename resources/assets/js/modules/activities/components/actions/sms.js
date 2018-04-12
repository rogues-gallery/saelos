import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select'
import {smsContact} from "../../../contacts/service"
import Opportunity from "../../../opportunities/Opportunity";
import Company from "../../../companies/Company";
import Contact from "../../../contacts/Contact";

class SmsAction extends React.Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._cancel = this._cancel.bind(this)
    this._submit = this._submit.bind(this)

    this.state = {
      formState: {
        id: props.model.id,
        opportunity_id: null,
        company_id: null,
        message: ''
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

  _submit() {
    const { formState } = this.state

    if (formState.message === null) {
      alert('Please enter a message.')
    } else {
      this.props.dispatch(smsContact(formState))
        .then(() => {
          this.setState({
            formState: {
              id: this.props.model.id,
              opportunity_id: null,
              company_id: null,
              message: ''
            }
          })
        })
    }
  }

  _cancel() {
    this.setState({
      formState: {
        id: this.props.contact.id,
        opportunity_id: null,
        company_id: null,
        message: ''
      }
    })

    this.props.toggle('sms')
  }

  render() {
    const { model } = this.props
    const { formState } = this.state

    let opportunityOptions = null
    let companyOptions = null
    let contactOptions = null

    if (model instanceof Opportunity) {
      companyOptions = model.companies.map(c => ({value: c.id, label: c.name}))
      contactOptions = model.contacts.map(c => ({value: c.id, label: c.name}))
    }

    if (model instanceof Company) {
      opportunityOptions = model.opportunities.map(o => ({value: o.id, label: o.name}))
      contactOptions = model.contacts.map(c => ({value: c.id, label: c.name}))
    }

    if (model instanceof Contact) {
      opportunityOptions = model.opportunities.map(o => ({value: o.id, label: o.name}))
      companyOptions = model.companies.map(c => ({value: c.id, label: c.name}))
    }

    return (
      <React.Fragment>
        <div className="card-body smsActionView">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Message</label>
            <input type="text" className="form-control" name="message" onChange={this._handleInputChange} value={formState.message} placeholder="Enter SMS message"/>
          </div>
          <div className="form-row">
            {opportunityOptions ?
              <div className="col">
                <label htmlFor="emailOpportunity">Opportunity</label>
                <Select
                  multi={false}
                  value={formState.opportunity_id}
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

            {companyOptions ?
              <div className="col">
                <label htmlFor="emailCompany">Company</label>
                <Select
                  multi={false}
                  value={formState.company_id}
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
          <div className="mt-3">
            <button className="btn btn-primary mr-2" onClick={this._submit}>Send</button>
            <button className="btn btn-link text-muted" onClick={this._cancel}>Cancel</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

SmsAction.propTypes = {
  user: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
}

export default connect()(SmsAction)

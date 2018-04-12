import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import { emailContact } from '../../../contacts/service'
import Contact from '../../../contacts/Contact'
import Select from 'react-select'
import Opportunity from "../../../opportunities/Opportunity";
import Company from "../../../companies/Company";

class EmailAction extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formState: {
        id: props.model.id,
        email_subject: '',
        email_content: '',
        opportunity_id: null,
        company_id: null
      }
    }
  }

  _handleInputChange = (event) => {
    const { target } = event
    const { name, value } = target
    const { formState } = this.state

    formState[name] = value

    this.setState({
      formState
    });
  }

  _handleContentChange = (value) => {
    const { formState } = this.state

    formState.email_content = value

    this.setState({
      formState
    })
  }

  _submit = () => {
    this.props.dispatch(emailContact(this.state.formState))
  }

  _cancel = () => {
    this.setState({
      formState: {
        id: this.props.contact.id,
        email_subject: '',
        email_content: '',
        opportunity_id: null,
        company_id: null
      }
    })

    this.props.toggle()
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
        <div className="card-body emailActionView">
          <div className="float-right">
            <span className="mini-text text-muted font-weight-bold">CC | BCC</span>
          </div>
          <div className="form-group">
            <label htmlFor="email_subject">Subject</label>
            <input type="text" onChange={this._handleInputChange} value={formState.email_subject} name="email_subject" className="form-control" placeholder="Enter email subject" />
          </div>
          <div className="form-group">
            <ReactQuill name="email_content" onChange={this._handleContentChange} />
          </div>
          <div className="row">
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
                          value: value.value
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
                          value: value.value
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

EmailAction.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.instanceOf(Contact).isRequired
}

export default connect()(EmailAction)

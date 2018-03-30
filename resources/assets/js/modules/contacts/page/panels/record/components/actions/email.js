import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import {emailContact} from "../../../../../service"
import Contact from "../../../../../Contact"
import Select from 'react-select'

class EmailAction extends Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._submit = this._submit.bind(this)
    this._cancel = this._cancel.bind(this)

    this.state = {
      formState: {
        id: props.contact.id,
        email_subject: '',
        email_content: '',
        opportunity_id: null,
        company_id: null
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

    formState.email_content = value

    this.setState({
      formState
    })
  }

  _submit() {
    this.props.dispatch(emailContact(this.state.formState))
  }

  _cancel() {
    this.setState({
      formState: {
        id: this.props.contact.id,
        email_subject: '',
        email_content: '',
        opportunity_id: null,
        company_id: null
      }
    })

    this.props.toggle('email')
  }

  render() {
    const { contact } = this.props
    const { formState } = this.state

    const opportunityOptions = contact.opportunities.map(o => ({value: o.id, label: o.name}))
    const companyOptions = contact.companies.map(c => ({value: c.id, label: c.name}))

    return (
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
          <div className="col col-sm-4 pt-4">
            <button className="btn btn-primary" onClick={this._submit}>Send</button>
            <button className="btn btn-link text-muted" onClick={this._cancel}>Cancel</button>
          </div>

            {opportunityOptions.length ?
              <div className="col col-sm-4">
                <label htmlFor="emailOpportunity">Opportunity</label>
                <Select
                  multi={false}
                  value={this.state.formState.opportunity_id}
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

            {companyOptions.length ?
              <div className="col col-sm-4">
                <label htmlFor="emailCompany">Company</label>
                <Select
                  multi={false}
                  value={this.state.formState.company_id}
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
      </div>
    )
  }
}

EmailAction.propTypes = {
  dispatch: PropTypes.func.isRequired,
  contact: PropTypes.instanceOf(Contact).isRequired
}

export default connect()(EmailAction)
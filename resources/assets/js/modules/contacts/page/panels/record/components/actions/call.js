import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {callContact} from "../../../../../service"
import Contact from "../../../../../Contact"
import User from "../../../../../../user/User"
import * as MDIcons from 'react-icons/lib/md'
import Select from 'react-select'

class CallAction extends Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._submit = this._submit.bind(this)

    this.state = {
      formState: {
        id: props.contact.id,
        sentiment: null,
        deal_id: null,
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

  _submit() {
    this.props.dispatch(callContact(this.state.formState))
  }

  render() {
    const { contact } = this.props

    const opportunityOptions = contact.opportunities.map(o => ({value: o.id, label: o.name}))
    const companyOptions = contact.companies.map(c => ({value: c.id, label: c.name}))

    return (
      <div className="card-body callActionView">
        <div className="row">
          <div className="col fw-100 border-right">
            <button className="btn btn-primary btn-lg"><span className="h2"><MDIcons.MdLocalPhone /></span></button>
          </div>
          <div className="col">
            <p>
              Click the button to the left to initiate a call to this user. Once the call is completed please enter your Rep Sentiment Score below.
            </p>

            <div className="row">
              <div className="col col-sm-6">
                <input type="range" min="1" max="10" className="slider"/>
              </div>
              <div className="col col-sm-3">
                {opportunityOptions.length ?
                <Select
                  multi={false}
                  value={this.state.formState.deal_id}
                  onChange={(value) => {
                    const event = {
                      target: {
                        name: 'deal_id',
                        value: value
                      }
                    }

                    this._handleInputChange(event)
                  }}
                  options={opportunityOptions} />
                  : ''}
              </div>
              <div className="col col-sm-3">
                {companyOptions.length ?
                <Select
                  multi={false}
                  value={this.state.formState.company_id}
                  onChange={(value) => {
                    const event = {
                      target: {
                        name: 'company_id',
                        value: value
                      }
                    }

                    this._handleInputChange(event)
                  }}
                  options={companyOptions} />
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CallAction.propTypes = {
  dispatch: PropTypes.func.isRequired,
  contact: PropTypes.instanceOf(Contact).isRequired,
}

export default connect()(CallAction)
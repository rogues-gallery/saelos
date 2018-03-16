import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {emailContact} from "../../../../../service"
import Contact from "../../../../../Contact"
import User from "../../../../../../user/User"
import * as MDIcons from 'react-icons/lib/md'

class CallAction extends Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._submit = this._submit.bind(this)

    this.state = {
      formState: {
        id: props.contact.id,
        emailSubject: '',
        emailContent: '',
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

  _handleContentChange(value) {
    const { formState } = this.state

    formState.emailContent = value

    this.setState({
      formState
    })
  }

  _submit() {
    this.props.dispatch(emailContact(this.state.formState))
  }

  render() {
    const { contact } = this.props

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
                <ul>
                  {contact.companies.map(c => (
                    <li key={`contact-${contact.id}-company-${c.id}`} onClick={() => console.log(c)}>{c.name}</li>
                  ))}
                </ul>
              </div>
              <div className="col col-sm-3">
                <ul>
                  {contact.opportunities.map(o => (
                    <li key={`contact-${contact.id}-opportunity-${o.id}`} onClick={() => console.log(o)}>{o.name}</li>
                  ))}
                </ul>
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
  user: PropTypes.instanceOf(User).isRequired
}

export default connect()(CallAction)
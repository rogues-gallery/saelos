import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import {emailContact} from "../../../../../service";
import Contact from "../../../../../Contact";

class EmailAction extends Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._submit = this._submit.bind(this)

    this.state = {
      formState: {
        id: props.contact.id,
        emailSubject: '',
        emailContent: ''
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
    return (
      <div className="card-body emailActionView">
        <div className="float-right">
          <span className="mini-text text-muted font-weight-bold">CC | BCC</span>
        </div>
        <div className="form-group">
          <label htmlFor="emailSubject">Subject</label>
          <input type="text" onChange={this._handleInputChange} name="emailSubject" className="form-control" placeholder="Enter email subject" />
        </div>
        <div className="form-group">
          <ReactQuill name="emailContent" onChange={this._handleContentChange} />
        </div>
        <button className="btn btn-primary" onClick={this._submit}>Send</button><button className="btn btn-link text-muted">Cancel</button>
      </div>
    )
  }
}

EmailAction.propTypes = {
  dispatch: PropTypes.func.isRequired,
  contact: PropTypes.instanceOf(Contact).isRequired
}

export default connect()(EmailAction)
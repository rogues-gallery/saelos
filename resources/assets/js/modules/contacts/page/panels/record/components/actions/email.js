import React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'

const EmailAction = () => (
  <div className="card-body emailActionView">
    <div className="float-right">
      <span className="mini-text text-muted font-weight-bold">CC | BCC</span>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Subject</label>
      <input type="text" className="form-control" placeholder="Enter email subject" />
    </div>
    <div className="form-group">
      <ReactQuill />
    </div>
    <button className="btn btn-primary">Send</button><button className="btn btn-link text-muted">Cancel</button>
  </div>
)

export default EmailAction
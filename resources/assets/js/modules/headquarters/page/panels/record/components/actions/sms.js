import React from 'react'
import PropTypes from 'prop-types'

const SmsAction = () => (
  <div className="card-body smsActionView">
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Message</label>
      <input type="text" className="form-control" placeholder="Enter SMS message" />
    </div>
    <button className="btn btn-primary">Send</button><button className="btn btn-link text-muted">Cancel</button>
  </div>
)

export default SmsAction
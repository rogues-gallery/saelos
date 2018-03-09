import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'

const CallAction = () => (
  <div className="card-body callActionView">
    <div className="row">
      <div className="col fw-100 border-right">
        <button className="btn btn-primary btn-lg"><span className="h2"><MDIcons.MdLocalPhone /></span></button>
      </div>
      <div className="col">
        <p>
          Click the button to the left to initiate a call to this user. Once the call is completed please enter your Rep Sentiment Score below.
        </p>
        <input type="range" min="1" max="10" className="slider"/>
      </div>
    </div>
  </div>
)

export default CallAction
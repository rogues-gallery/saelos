import React from 'react'
import PropTypes from 'prop-types'
import EmailAction from './actions/email'
import CallAction from './actions/call'
import SmsAction from './actions/sms'
import MergeAction from './actions/merge'

class ActionView extends React.Component {
  render() {

    switch (this.props.view) {
      case "email":
        return <EmailAction />
      case "call":
        return <CallAction />
      case "sms":
        return <SmsAction />
      case "merge":
      default:
        return ''
    }
  }
}

ActionView.propTypes = {
  view: PropTypes.string.isRequired
}

export default ActionView
import React from 'react'
import PropTypes from 'prop-types'
import EmailAction from './actions/email'
import CallAction from './actions/call'
import SmsAction from './actions/sms'
import MergeAction from './actions/merge'
import Contact from "../../../../Contact";

class ActionView extends React.Component {
  render() {
    const { contact, view } = this.props

    switch (view) {
      case "email":
        return <EmailAction contact={contact} />
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
  view: PropTypes.string.isRequired,
  contact: PropTypes.instanceOf(Contact).isRequired
}

export default ActionView
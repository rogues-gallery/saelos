import React from 'react'
import PropTypes from 'prop-types'
import EmailAction from './actions/email'
import CallAction from './actions/call'
import SmsAction from './actions/sms'
import TaskAction from './actions/task'
import MergeAction from './actions/merge'
import Contact from "../../../../Contact";
import User from "../../../../../user/User";

class ActionView extends React.Component {
  render() {
    const { contact, user, view } = this.props

    switch (view) {
      case "email":
        return <EmailAction contact={contact} user={user} />
      case "call":
        return <CallAction contact={contact} user={user} />
      case "sms":
        return <SmsAction contact={contact} user={user} />
      case "task":
        return <TaskAction contact={contact} user={user} />
      case "merge":
      default:
        return ''
    }
  }
}

ActionView.propTypes = {
  view: PropTypes.string.isRequired,
  contact: PropTypes.instanceOf(Contact).isRequired,
  user: PropTypes.instanceOf(User)
}

export default ActionView
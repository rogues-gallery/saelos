import React from 'react'
import PropTypes from 'prop-types'
import EmailAction from './actions/email'
import CallAction from './actions/call'
import SmsAction from './actions/sms'
import TaskAction from './actions/task'
import Company from '../../../../../companies/Company'
import Contact from '../../../../Contact'
import User from '../../../../../users/User'

class ActionView extends React.Component {
  render() {
    const { view, ...rest} = this.props

    switch (view) {
      case "email":
        return <EmailAction {...rest} />
      case "call":
        return <CallAction {...rest} />
      case "sms":
        return <SmsAction {...rest} />
      case "task":
        return <TaskAction {...rest} />
      case "merge":
      default:
        return ''
    }
  }
}

ActionView.propTypes = {
  view: PropTypes.string.isRequired,
  company: PropTypes.instanceOf(Company),
  contact: PropTypes.instanceOf(Contact),
  user: PropTypes.instanceOf(User)
}

export default ActionView

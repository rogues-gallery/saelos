import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmailAction from './actions/email'
import NoteAction from './actions/note'
import CallAction from './actions/call'
import SmsAction from './actions/sms'
import TaskAction from './actions/task'
import Company from '../../companies/Company'
import Contact from '../../contacts/Contact'
import Opportunity from '../../opportunities/Opportunity'
import User from '../../users/User'
import { getActiveUser } from '../../users/store/selectors'

class ActionView extends React.Component {
  render() {
    const { view, ...rest} = this.props

    switch (view) {
      case "email":
        return <EmailAction {...rest} />
      case "note":
        return <NoteAction {...rest} />
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
  model: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Company),
    PropTypes.instanceOf(Contact),
    PropTypes.instanceOf(Opportunity)
  ]),
  user: PropTypes.instanceOf(User)
}

export default connect(state => ({
  user: getActiveUser(state)
}))(ActionView)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../modules/auth/service'
import { getActiveUser } from '../modules/users/store/selectors'
import PrivateLayout from './Private'
import ConfigLayout from './Config'
import PublicLayout from './Public'

class Layout extends Component {
  componentWillMount() {
    const { isAuthenticated, user } = this.props

    if (isAuthenticated && !user.id) {
      this.props.dispatch(fetchUser())
    }
  }

  render() {
    const { children, location, ...props } = this.props

    if (location.pathname.startsWith('/login')) {
      return <PublicLayout {...props}>{children}</PublicLayout>
    }

    if (location.pathname.startsWith('/config')) {
      return <ConfigLayout {...props}>{children}</ConfigLayout>
    }

    return <PrivateLayout {...props}>{children}</PrivateLayout>
  }
}

Layout.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(connect(state => ({
  user: getActiveUser(state),
}))(Layout))

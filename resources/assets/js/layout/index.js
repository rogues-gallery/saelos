//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// import services actions
import { fetchUser } from '../modules/auth/service'
import { getAuth } from '../modules/auth/store/selectors';

// import components
import PrivateLayout from './Private'
import PublicLayout from './Public'

class Layout extends Component {
  componentWillMount() {
    const { isAuthenticated, user } = this.props

    if (isAuthenticated && !user.id) {
      this.props.dispatch(fetchUser())
    }

  }

  render() {
    const { children, ...props } = this.props
    if (this.props.isAuthenticated) {
      return <PrivateLayout {...props}>{children}</PrivateLayout>
    }
    return <PublicLayout {...props}>{children}</PublicLayout>
  }
}

Layout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default withRouter(connect(state => ({
  isAuthenticated: getAuth(state),
  user: state.user,
}))(Layout))

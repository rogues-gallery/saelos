import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const ConfigRoute = ({ component: Component, user, ...rest, router }) => {
  if (true) {
    console.log(router)
  }

  return <Route {...rest} render={props => (<Component {...props}/>)}/>
}

ConfigRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  user: PropTypes.object.isRequired
}

ConfigRoute.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect(state => ({
  user: state.user
}))(ConfigRoute))

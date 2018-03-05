import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAuth } from '../modules/auth/store/selectors';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return <Route {...rest} render={props => (
    isAuthenticated
      ? <Component {...props}/>
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
  )}/>

}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default connect(state => ({
  isAuthenticated: getAuth(state)
}))(PrivateRoute)

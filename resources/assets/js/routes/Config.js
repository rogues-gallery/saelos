import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const ConfigRoutes = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => (<Component {...props}/>)}/>
}

ConfigRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default ConfigRoutes

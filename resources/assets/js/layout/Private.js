//import libs
import React from 'react'
import PropTypes from 'prop-types'
import { NotificationContainer } from 'react-notifications'

// import components
import Main from '../Main'
import Navigation from '../common/navigation'

const PrivateLayout = ({ children }) => (
  <Main>
    <div className="row no-gutters">
      <Navigation/>
      { children }
      <NotificationContainer />
    </div>
  </Main>
)

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateLayout

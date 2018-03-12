//import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import Main from '../Main'
import Navigation from '../common/navigation'

const PrivateLayout = ({ children }) => (
  <Main>
    <div className="row no-gutters">
      <Navigation/>
      { children }
    </div>
  </Main>
)

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateLayout

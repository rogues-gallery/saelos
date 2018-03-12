//import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import Navigation from '../common/navigation'

const containerStyle = {
  paddingTop: '3.5rem',
}

const ConfigLayout = ({ children }) => (
  <div style={containerStyle}>
    <main style={{ minHeight: '100vh'}}>
      <Navigation />
      { children }
    </main>
  </div>
)

ConfigLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ConfigLayout

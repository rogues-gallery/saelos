import React from 'react'
import PropTypes from 'prop-types'

const containerStyle = {
  paddingTop: '3.5rem',
}

const PublicLayout = ({ children }) => (
  <div style={containerStyle}>
    <main style={{ minHeight: '100vh'}}>
      { children }
    </main>
  </div>
)

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PublicLayout

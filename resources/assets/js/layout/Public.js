//import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import Navigation from '../common/navigation'
import Footer from '../common/footer'

const containerStyle = {
  paddingTop: '3.5rem',
}

const PublicLayout = ({ children }) => (
  <div style={containerStyle}>
    <Navigation/>
    <main style={{ minHeight: '100vh'}}>
      { children }
    </main>
    <Footer/>
  </div>
)

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PublicLayout

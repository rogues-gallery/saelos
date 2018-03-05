//import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import Navigation from '../common/navigation'
import Footer from '../common/footer'

const PrivateLayout = ({ children }) => (
  <div className="app-body">
      <div className="sidebar">
          <Navigation/>
      </div>
        <main className="main-content">
          { children }
        </main>
    <Footer/>
  </div>
)

PrivateLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateLayout

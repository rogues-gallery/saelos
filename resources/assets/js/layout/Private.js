//import libs
import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col
} from 'reactstrap';

// import components
import Navigation from '../common/navigation'
import Footer from '../common/footer'

const PrivateLayout = ({ children }) => (
  <Container fluid={true}>
    <div className="row">
      <Navigation/>
      { children }
    </div>
  </Container>
)

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateLayout

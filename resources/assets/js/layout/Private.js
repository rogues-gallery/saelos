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

      <div className="col-sm-3 col-md-2 detail-panel">
        <h5>Contact Details</h5>
        <div className="h-scroll">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">Second <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Reports</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Analytics</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Export</a>
            </li>
          </ul>

          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>

          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Nav item again</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">One more nav</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Container>
)

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateLayout

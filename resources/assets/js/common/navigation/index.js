// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth/service'

// import components
import { Link } from 'react-router-dom'
import { Navbar, NavbarToggler } from 'reactstrap';
import PrivateHeader from './PrivateHeader'
import PublicHeader from './PublicHeader'
import { getAuth } from "../../modules/auth/store/selectors";

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showNavigation: false,
      showDropdown: false,
    }

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleNavbar() {
    this.setState({
      showNavigation: !this.state.showNavigation,
    });
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown,
    })
  }

  logout(e) {
    e.preventDefault()

    this.props.dispatch(logout())
  }

  render() {
    return (
      <Navbar className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <Link to="/" className="navbar-brand">Saelos</Link>
        <NavbarToggler className="navbar-toggler d-lg-none" onClick={this.toggleNavbar} />
        {
          this.props.isAuthenticated
            ? <PrivateHeader user={this.props.user}
                             showNavigation={this.state.showNavigation}
                             toggleDropdown={this.toggleDropdown}
                             showDropdown={this.state.showDropdown}
                             logout={this.logout} />
            : <PublicHeader showNavigation={this.state.showNavigation} />
        }
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  isAuthenticated: getAuth(state),
  user: state.user
}))(Navigation)

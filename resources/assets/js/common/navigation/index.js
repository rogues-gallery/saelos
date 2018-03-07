// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth/service'

// import components
import PrivateNav from './PrivateNav';
import PublicNav from './PublicNav';
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
      <div className="col nav-panel bg-dark-grey">
        <div className="mx-4 mb-4 py-2 border-bottom heading">
          <a href="#" className="btn btn-primary float-right"><b>+</b></a>
        </div>

        {
          this.props.isAuthenticated
            ? <PrivateNav user={this.props.user}
                          showNavigation={this.state.showNavigation}
                          toggleDropdown={this.toggleDropdown}
                          showDropdown={this.state.showDropdown}
                          logout={this.logout} />
            : <PublicNav showNavigation={this.state.showNavigation} />
        }
      </div>
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

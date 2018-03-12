// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth/service'

// import components
import { Link } from 'react-router-dom'
import PrivateNav from './PrivateNav';
import ConfigNav from './ConfigNav';
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
          <div className="dropdown show float-right">
            <Link to={'/'} className="btn btn-primary dropdown-toggle" role="button" id="quickCreateMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+</Link>
            <div className="dropdown-menu" aria-labelledby="quickCreateMenu">
              <Link to={'/contacts/new'} className="dropdown-item">Create Contact</Link>
              <Link to={'/companies/new'} className="dropdown-item">Create Company</Link>
              <Link to={'/opportunities/new'} className="dropdown-item">Create Opportunity</Link>
              <Link to={'/tasks/new'} className="dropdown-item">Create Task</Link>
            </div>
          </div>
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

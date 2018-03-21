// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../../modules/auth/service'

// import components
import { Link } from 'react-router-dom'
import PrivateNav from './PrivateNav'
import ConfigNav from './ConfigNav'
import { getAuth } from '../../modules/auth/store/selectors'
import { isInEdit as isContactInEdit } from '../../modules/contacts/store/selectors'
import { isInEdit as isCompanyInEdit } from '../../modules/companies/store/selectors'
import { isInEdit as isOpportunityInEdit } from '../../modules/opportunities/store/selectors'

import * as MDIcons from 'react-icons/lib/md'
import _ from 'lodash';

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
      <div className={`col nav-panel bg-dark-grey ${this.props.inEdit ? 'inEdit' : ''}`}>
        <div className="mx-2 mb-4 py-2 border-bottom heading">
          <div className="dropdown show float-left">
            <Link to={'/'} className="btn btn-dark dropdown-toggle" role="button" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Profile</Link>
            <div className="dropdown-menu" aria-labelledby="userMenu">
              <Link to={'/user/profile'} className="dropdown-item">My Profile</Link>
              <Link to={'/notifications'} className="dropdown-item">Notifications</Link>
              <Link to={'/config'} className="dropdown-item">Config</Link>
            </div>
          </div>
          <div className="dropdown show float-right">
            <Link to={'/'} className="btn btn-primary dropdown-toggle" role="button" id="quickCreateMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><MDIcons.MdAdd /></Link>
            <div className="dropdown-menu" aria-labelledby="quickCreateMenu">
              <Link to={'/contacts/new'} className="dropdown-item">Create Contact</Link>
              <Link to={'/companies/new'} className="dropdown-item">Create Company</Link>
              <Link to={'/opportunities/new'} className="dropdown-item">Create Opportunity</Link>
            </div>
          </div>
        </div>

        {
          this.props.isAuthenticated
            ? this.props.location.pathname.startsWith('/config/')
            ? <ConfigNav showNavigation={this.state.showNavigation} />
            : <PrivateNav user={this.props.user}
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

const isInEdit = (state) => isContactInEdit(state) || isCompanyInEdit(state) || isOpportunityInEdit(state)

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  inEdit: PropTypes.bool.isRequired
}

Navigation.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect(state => ({
  isAuthenticated: getAuth(state),
  user: state.user,
  inEdit: isInEdit(state)
}))(Navigation))

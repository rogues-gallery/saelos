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
import CreateNav from './CreateNav'
import CreateConfigNav from './CreateConfigNav'

import { getAuth } from '../../modules/auth/store/selectors'
import { isInEdit as isContactInEdit } from '../../modules/contacts/store/selectors'
import { isInEdit as isCompanyInEdit } from '../../modules/companies/store/selectors'
import { isInEdit as isOpportunityInEdit } from '../../modules/opportunities/store/selectors'

import * as MDIcons from 'react-icons/lib/md'
import _ from 'lodash';
import {getUser} from "../../modules/user/store/selectors";

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
            <Link to={'/'} className="btn btn-dark dropdown-toggle" role="button" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.user.name.match(/\b(\w)/g).join('')}</Link>
            <div className="dropdown-menu" aria-labelledby="userMenu">
              <Link to={'/user/profile'} className="dropdown-item">My Profile</Link>
              <Link to={'/notifications'} className="dropdown-item">Notifications</Link>
              <Link to={'/config/settings'} className="dropdown-item">Config</Link>
              <Link to={'/logout'} className="dropdown-item">Logout</Link>
            </div>
          </div>
          
          { this.props.location.pathname.startsWith('/config')
            ?
          <CreateConfigNav user={this.props.user} />
          :
          <CreateNav user={this.props.user} />
          }
          
        </div>
        <div className="h-scroll">
          {
            this.props.isAuthenticated
              ? this.props.location.pathname.startsWith('/config')
              ? <ConfigNav user={this.props.user} />
              : <PrivateNav user={this.props.user} />
              : <PublicNav showNavigation={this.state.showNavigation} />
          }
        </div>
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
  user: getUser(state),
  inEdit: isInEdit(state)
}))(Navigation))

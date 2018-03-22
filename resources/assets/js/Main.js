//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuth } from "./modules/auth/store/selectors";
import {fetchContacts} from './modules/contacts/service'
import {fetchCompanies} from './modules/companies/service'
import {fetchOpportunities} from './modules/opportunities/service'
import {fetchReports} from './modules/reports/service'
import {fetchActivities} from "./modules/activities/service";

// import services actions
import { fetchUser } from './modules/auth/service'

class Main extends Component {
  componentWillMount() {
    const { isAuthenticated, user, dispatch } = this.props;

    if (isAuthenticated && !user.id) {
      dispatch(fetchUser())
    }

    dispatch(fetchContacts({page: 1}))
    dispatch(fetchCompanies({page: 1}))
    dispatch(fetchOpportunities({page: 1}))
    dispatch(fetchReports({page: 1}))
    dispatch(fetchActivities({page: 1}))
  }

  render() {
    if (this.props.user.id) {
      return this.props.children
    }

    return ''
  }
}

Main.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  isAuthenticated: getAuth(state),
  user: state.user,
}))(Main)

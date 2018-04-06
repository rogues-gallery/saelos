import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAuth } from './modules/auth/store/selectors'
import { fetchContactFields } from './modules/contacts/service'
import { fetchCompanyFields } from './modules/companies/service'
import { fetchOpportunityFields } from './modules/opportunities/service'
import { fetchUser } from './modules/auth/service'
import { fetchTags } from './modules/tags/service'
import { fetchRoles } from './modules/roles/service'
import { fetchTeams } from './modules/teams/service'
import { fetchFields } from './modules/fields/service'
import { fetchStatuses} from './modules/statuses/service'
import { getActiveUser } from './modules/users/store/selectors'
import ErrorBoundary from "./utils/ErrorBoundry";

class Main extends Component {
  componentWillMount() {
    const { isAuthenticated, user, dispatch } = this.props

    if (!isAuthenticated) {
      this.context.router.history.push('/login')
      return
    }

    if (typeof user.id === 'undefined' || !user.id) {
      dispatch(fetchUser())
      dispatch(fetchContactFields())
      dispatch(fetchCompanyFields())
      dispatch(fetchOpportunityFields())
      dispatch(fetchFields())
      dispatch(fetchTags())
      dispatch(fetchRoles())
      dispatch(fetchTeams())
      dispatch(fetchStatuses())
    }
  }

  render() {
    if (this.props.user.id) {
      return (
        <ErrorBoundary>
          {this.props.children}
        </ErrorBoundary>
      )
    }

    return ''
  }
}

Main.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
}

Main.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect(state => ({
  isAuthenticated: getAuth(state),
  user: getActiveUser(state),
}))(Main))

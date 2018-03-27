//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuth } from "./modules/auth/store/selectors";
import { fetchContactFields } from './modules/contacts/service'
import { fetchCompanyFields } from './modules/companies/service'
import { fetchOpportunityFields } from './modules/opportunities/service'

// import services actions
import { fetchUser } from './modules/auth/service'

class Main extends Component {
  componentWillMount() {
    const { isAuthenticated, user, dispatch } = this.props;

    if (isAuthenticated && !user.id) {
      dispatch(fetchUser())
      dispatch(fetchContactFields())
      dispatch(fetchCompanyFields())
      dispatch(fetchOpportunityFields())
    }
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

//import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuth } from "./modules/auth/store/selectors";

// import services actions
import { fetchUser } from './modules/auth/service'

class Main extends Component {
  componentWillMount() {
    const { isAuthenticated, user } = this.props;

    if (isAuthenticated && !user.id) {
      this.props.dispatch(fetchUser())
    }
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
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

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Login from "./pages/login"
import {deleteState} from "../../store/localStorage"
import * as actions from './store/actions'

const Logout = ({dispatch}) => {
  dispatch(actions.authLogout())
  deleteState()

  return <Redirect to="/login" />
}

const LogoutComponent = connect()(Logout)

export default [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/logout',
    exact: true,
    component: LogoutComponent
  }
]
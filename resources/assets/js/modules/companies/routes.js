import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Page from './page'
import {getFirstCompanyId} from "./store/selectors"
import Main from '../../Main'

let MyRedirect = ({firstId}) =>
  <Main><Redirect to={`/companies/${firstId}`} /></Main>

const RedirectToFirst = connect(state => ({
  firstId: getFirstCompanyId(state)
}))(MyRedirect)

export default [
  {
    path: '/companies',
    exact: true,
    auth: true,
    component: RedirectToFirst
  },
  {
    path: '/companies/:id',
    exact: true,
    auth: true,
    component: Page
  }
];
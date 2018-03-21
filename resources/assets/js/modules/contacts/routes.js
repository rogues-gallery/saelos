import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Page from './page'
import {getFirstContactId} from "./store/selectors"
import Main from '../../Main'

let MyRedirect = ({firstContactId}) =>
  <Main><Redirect to={`/contacts/${firstContactId}`} /></Main>

const RedirectToFirstContact = connect(state => ({
  firstContactId: getFirstContactId(state)
}))(MyRedirect)

export default [
  {
    path: '/',
    exact: true,
    auth: true,
    component: RedirectToFirstContact
  },
  {
    path: '/contacts',
    exact: true,
    auth: true,
    component: RedirectToFirstContact
  },
  {
    path: '/contacts/:id',
    exact: true,
    auth: true,
    component: Page
  }
];
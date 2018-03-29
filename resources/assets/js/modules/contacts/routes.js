import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Page from './page'
import {getFirstContactId} from "./store/selectors"
import Main from '../../Main'
import * as MDIcons from "react-icons/lib/md/index";

let MyRedirect = ({firstId}) =>
  <Main><Redirect to={`/contacts/${firstId}`} /></Main>

const RedirectToFirst = connect(state => ({
  firstId: getFirstContactId(state)
}))(MyRedirect)

export default [
  {
    path: '/',
    exact: true,
    auth: true,
    component: RedirectToFirst
  },
  {
    path: '/contacts',
    exact: true,
    auth: true,
    component: RedirectToFirst,
    menu: {
      icon: MDIcons.MdPersonOutline,
      location: 'main',
      linkText: 'Contacts',
      subLinks: false,
      roles: false
    }
  },
  {
    path: '/contacts/:id',
    exact: true,
    auth: true,
    component: Page
  }
];
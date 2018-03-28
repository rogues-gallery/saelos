import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Page from './page'
import {getFirstCompanyId} from "./store/selectors"
import Main from '../../Main'
import * as MDIcons from "react-icons/lib/md/index";

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
    component: RedirectToFirst,
    menu: {
      icon: MDIcons.MdBusiness,
      location: 'main',
      linkText: 'Companies',
      subLinks: false,
      roles: false
    }
  },
  {
    path: '/companies/:id',
    exact: true,
    auth: true,
    component: Page
  }
];
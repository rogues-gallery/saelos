import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Page from './page'
import {getFirstOpportunityId} from "./store/selectors"
import Main from '../../Main'
import * as MDIcons from "react-icons/lib/md/index";

let MyRedirect = ({firstId}) =>
  <Main><Redirect to={`/opportunities/${firstId}`} /></Main>

const RedirectToFirst = connect(state => ({
  firstId: getFirstOpportunityId(state)
}))(MyRedirect)

export default [
  {
    path: '/opportunities',
    exact: true,
    auth: true,
    component: RedirectToFirst,
    menu: {
      icon: MDIcons.MdAttachMoney,
      location: 'main',
      linkText: 'Opportunities',
      subLinks: false,
      roles: false
    }
  },
  {
    path: '/opportunities/:id',
    exact: true,
    auth: true,
    component: Page
  }
];
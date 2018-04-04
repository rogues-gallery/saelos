import React from 'react'
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Page from './page'
import {getFirstOpportunityId, getSearchStringForOpportunities} from "./store/selectors"
import Main from '../../Main'
import * as MDIcons from "react-icons/lib/md/index"
import { getViews } from '../user/store/selectors'
import {fetchOpportunities} from "./service"

let MyRedirect = ({firstId}) => {
  // update search state to === ''

  return <Main>
    <Redirect to={`/opportunities/${firstId}`} />
  </Main>
}

const RedirectToFirst = connect(state => ({
  firstId: getFirstOpportunityId(state)
}))(MyRedirect)

const navToSearch = ({ searchString }, dispatch, router) => {
  dispatch(fetchOpportunities({page: 1, searchString}))

  return router.history.push(`/opportunities`)
}

const ViewsList = ({views, dispatch, searchString, location}, { router }) => {
  if (views.length === 0) {
    return ''
  }

  return (
    <li className="nav-item">
      <ul className="nav">
        {views.map((v, i) =>
          <li className="nav-item" key={i}>
            <a
              className={`nav-link pl-3 ml-1 small ${v.searchString === searchString && /opportunities/.test(location.pathname) ? 'active' : ''}`}
              href="javascript:void(0)" onClick={() => navToSearch(v, dispatch, router)}>
              <span className="dot mr-2" style={{backgroundColor: v.color}} />
              {v.linkText}
            </a>
          </li>
        )}
      </ul>
    </li>
  )
}

ViewsList.propTypes = {
  views: PropTypes.array.isRequired
}

ViewsList.contextTypes = {
  router: PropTypes.object.isRequired
}

const ViewsMenu = withRouter(connect(state => ({
  views: getViews(state, 'opportunities'),
  searchString: getSearchStringForOpportunities(state)
}))(ViewsList))

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
      subLinks: ViewsMenu,
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

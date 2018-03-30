import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavItem from '../../common/navigation/NavItem'

import Page from './page'
import * as MDIcons from 'react-icons/lib/md/index'
import { getTags } from './store/selectors'

const TagList = ({tags}) => {
  return (
    <li className="nav-item">
      <ul className="nav">
        {tags.map(t =>
          <NavItem key={`tag-nav-item-${t.id}`} path={`/tags/${t.id}`} className="pl-4 small">
            <span className="dot mr-2" style={{backgroundColor: t.color}} />
            {t.name}
          </NavItem>
        )}
      </ul>
    </li>
  )
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired
}

const TagMenu = connect(state => ({
  tags: getTags(state)
}))(TagList)

export default [
  {
    path: '/tags',
    exact: true,
    auth: true,
    config: true,
    component: Page,
    menu: {
      icon: MDIcons.MdLocalOffer,
      location: 'main',
      linkText: 'Tags',
      subLinks: TagMenu,
      roles: false
    }
  },
  {
    path: '/tags/:id',
    exact: true,
    auth: true,
    config: true,
    component: Page
  }
];
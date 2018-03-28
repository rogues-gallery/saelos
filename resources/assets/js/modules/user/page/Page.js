import React from 'react'
import PropTypes from 'prop-types'
import Profile from './panels/profile'

const Page = (props) => ([
    <Profile {...props} />
])

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default Page
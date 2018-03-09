import React from 'react'
import PropTypes from 'prop-types'
import Settings from './panels/settings'

const Page = (props) => ([
    <Settings key={1} dispatch={props.dispatch} />
])

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default Page
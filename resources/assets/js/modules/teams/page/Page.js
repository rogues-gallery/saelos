import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'

const Page = (props) => ([
  <List key={0} {...props} />,
  <Record key={1} dispatch={props.dispatch} />
])

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
}

export default Page
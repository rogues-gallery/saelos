import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'

const Page = (props) => (
  <React.Fragment>
    <Record dispatch={props.dispatch} />
  </React.Fragment>
)

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
}

export default Page
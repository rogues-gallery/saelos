import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'

const Page = (props) => (
  <React.Fragment>
    <List {...props} />
    <Record {...props} />
  </React.Fragment>
)

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
}

export default Page
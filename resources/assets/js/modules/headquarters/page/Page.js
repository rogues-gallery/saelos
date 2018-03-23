import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'
import Detail from './panels/detail'

const Page = (props) => (
  <React.Fragment>
    <List {...props} />
    <Record {...props} />
    <Detail {...props} />
  </React.Fragment>
)

Page.propTypes = {
  activities: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
}

export default Page
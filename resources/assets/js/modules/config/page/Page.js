import React from 'react'
import PropTypes from 'prop-types'
import Settings from './panels/settings'

const Page = (props) => (
  <React.Fragment>
    <Settings {...props} />
  </React.Fragment>
)

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default Page
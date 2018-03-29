import React from 'react'
import PropTypes from 'prop-types'
import Record from './panels/record'

const Page = (props) => ([
    <Record key={1} dispatch={props.dispatch} />
])

Page.propTypes = {
  analytics: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Page;
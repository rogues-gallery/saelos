import React from 'react'
import PropTypes from 'prop-types'
import Record from './panels/record'
import Detail from './panels/detail'

const Page = ({ dispatch }) => ([
    <Record key={0} dispatch={dispatch} />,
    <Detail key={1} dispatch={dispatch} />
])

Page.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default Page;
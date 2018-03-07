import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'
import Detail from './panels/detail'

const Page = ({ opportunities, dispatch }) => ([
    <List opportunities={opportunities} dispatch={dispatch} key={0} />,
    <Record key={1} dispatch={dispatch} />,
    <Detail key={2} dispatch={dispatch} />
])

Page.propTypes = {
  opportunities: PropTypes.array.isRequired
};

export default Page;
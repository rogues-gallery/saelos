import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'
import Detail from './panels/detail'

const Page = ({ accounts, dispatch, isPosting }) => ([
    <List key={0} accounts={accounts} dispatch={dispatch} isPosting={isPosting} />,
    <Record key={1} dispatch={dispatch} />,
    <Detail key={2} dispatch={dispatch} />
])

Page.propTypes = {
  accounts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool
}

export default Page
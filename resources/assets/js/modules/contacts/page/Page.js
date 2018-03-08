import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'
import Detail from './panels/detail'

const Page = ({ contacts, dispatch, isPosting, pagination }) => ([
    <List contacts={contacts} dispatch={dispatch} key={0} isPosting={isPosting} pagination={pagination} />,
    <Record key={1} dispatch={dispatch} />,
    <Detail key={2} dispatch={dispatch} />
])

Page.propTypes = {
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired
};

export default Page;
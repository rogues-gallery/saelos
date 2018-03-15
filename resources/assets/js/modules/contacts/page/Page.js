import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'
import Detail from './panels/detail'

const Page = (props) => ([
    <List key={0} {...props} />,
    <Record key={1} {...props} />,
    <Detail key={2} {...props} />
])

Page.propTypes = {
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  firstContactId: PropTypes.number.isRequired,
  inEdit: PropTypes.bool.isRequired
};

export default Page;
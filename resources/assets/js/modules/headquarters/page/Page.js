import React from 'react'
import PropTypes from 'prop-types'
import List from './panels/list'
import Record from './panels/record'
import Detail from './panels/detail'

const Page = (props) => ([
    <List key={0} {...props} />,
    <Record key={1} dispatch={props.dispatch} />,
    <Detail key={2} dispatch={props.dispatch} />
])

Page.propTypes = {
  activities: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default Page;
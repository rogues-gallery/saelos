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
  opportunities: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  firstOpportunityId: PropTypes.number.isRequired,
  inEdit: PropTypes.bool.isRequired
};

export default Page;
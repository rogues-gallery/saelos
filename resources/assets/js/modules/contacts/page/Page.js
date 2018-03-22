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
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  firstContactId: PropTypes.number.isRequired,
  inEdit: PropTypes.bool.isRequired,
  searchString: PropTypes.string
};

export default Page;
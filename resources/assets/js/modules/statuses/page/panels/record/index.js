import React from 'react'
import {getStatus} from "../../../store/selectors"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

const Record = ({status}) => (
  <div>{status.name}</div>
)

export default withRouter(connect((state, ownProps) => ({
  status: getStatus(state, ownProps.match.params.id),
}))(Record))
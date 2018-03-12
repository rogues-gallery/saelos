import React from 'react'
import {getStage} from "../../../store/selectors";``
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Record = ({stage}) => (
  <div>{stage.title}</div>
)

export default withRouter(connect((state, ownProps) => ({
  stage: getStage(state, ownProps.match.params.id),
}))(Record))
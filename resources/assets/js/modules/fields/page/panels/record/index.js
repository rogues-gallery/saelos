import React from 'react'
import {getField} from "../../../store/selectors";``
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Record = ({field}) => (
  <main className="col main-panel px-3">
    <pre>{JSON.stringify(field)}</pre>
  </main>
)

export default withRouter(connect((state, ownProps) => ({
  field: getField(state, ownProps.match.params.id),
}))(Record))
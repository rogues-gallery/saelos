import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "./panels/list";
import Record from "./panels/record";
import Detail from "./panels/detail";
import { getOpportunity } from "../store/selectors";

const Page = props => (
  <React.Fragment>
    <List {...props} />
    <Record {...props} />
    <Detail {...props} />
  </React.Fragment>
);

export default withRouter(
  connect((state, ownProps) => ({
    opportunity: getOpportunity(state, ownProps.match.params.id)
  }))(Page)
);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "./panels/list";
import Record from "./panels/record";
import Detail from "./panels/detail";
import Contact from "../Contact";
import { getContact } from "../store/selectors";

const Page = props => (
  <React.Fragment>
    <List {...props} />
    <Record {...props} />
    <Detail {...props} />
  </React.Fragment>
);

Page.propTypes = {
  contact: PropTypes.instanceOf(Contact).isRequired
};

export default withRouter(
  connect((state, ownProps) => ({
    contact: getContact(state, ownProps.match.params.id)
  }))(Page)
);

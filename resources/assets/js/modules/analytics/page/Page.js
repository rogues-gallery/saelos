import React from "react";
import PropTypes from "prop-types";
import Record from "./panels/record";

const Page = props => (
  <React.Fragment>
    <Record {...props} />
  </React.Fragment>
);

Page.propTypes = {
  analytics: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Page;

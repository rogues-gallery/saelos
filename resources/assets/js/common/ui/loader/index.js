import React from "react";
import PropTypes from "prop-types";

const LoadingComponent = ({ isLoading, error }, { i18n }) => {
  if (isLoading) {
    return <div>{i18n.t("messages.loading")}</div>;
  } else if (error) {
    return <div>{i18n.t("messages.error.loading.page")}</div>;
  } else {
    return null;
  }
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object
};

LoadingComponent.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default LoadingComponent;

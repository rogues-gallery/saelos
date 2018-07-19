import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });

    // @TODO: Log the error
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="col main-panel px-3 align-self-center full-panel">
          <h3 className="text-center text-muted">
            {this.context.i18n.t("messages.error.whoops")}
          </h3>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default ErrorBoundary;

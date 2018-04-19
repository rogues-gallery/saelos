import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import _ from "lodash";
import moment from "moment";

class ConversationEmail extends React.Component {
  render() {
    const { dispatch, conversations, ...props } = this.props;

    return (
      <div className="card mb-3">
        <ul className="list-group list-group-flush" />
      </div>
    );
  }
}

export default ConversationEmail;

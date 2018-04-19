import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";

class ConversationCall extends React.Component {
  render() {
    const { conversation } = this.props;

    return (
      <div className="col pt-3 pb-1 px-0">
        <audio controls className="w-100">
          <source src={conversation.recording} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default ConversationCall;

import React from "react";
import PropTypes from "prop-types";

class ConversationCall extends React.Component {
  render() {
    const { conversation } = this.props;

    return (
      <div className="col pt-3 pb-1 px-0">
        <audio controls className="w-100">
          <source src={conversation.details.recording} type="audio/mpeg" />
          {this.context.i18n.t("messages.browser.audio.not.supported")}
        </audio>
      </div>
    );
  }
}

ConversationCall.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default ConversationCall;

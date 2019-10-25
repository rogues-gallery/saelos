import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import TextTruncate from "react-text-truncate";
import moment from "moment";
import _ from "lodash";
import { ConversationCall, ConversationEmail, ConversationSms } from "./types";

class Conversations extends React.Component {
  render() {
    const { dispatch, conversations, ...props } = this.props;
    const filtered = _.filter(conversations, c => c.completed);

    if (filtered.length) {
      return (
        <div className="card mb-3" key="conversations-key-1">
          <ul className="list-group list-group-flush">
            {filtered.map(conversation => {
              let thisType;

              switch (conversation.details_type) {
                case "App\\EmailActivity":
                  thisType = ConversationEmail;
                  break;
                case "App\\CallActivity":
                  thisType = ConversationCall;
                  break;
                case "App\\SmsActivity":
                  thisType = ConversationSms;
                  break;
              }

              return (
                <Conversation
                  key={`conversation-${conversation.id}`}
                  conversation={conversation}
                  type={thisType}
                  dispatch={dispatch}
                />
              );
            })}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

Conversations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  conversations: PropTypes.array.isRequired
};

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this._toggleOpenState = this._toggleOpenState.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);

    this.state = {
      open: false,
      formState: props.conversation.originalProps
    };
  }

  _toggleOpenState() {
    this.setState({
      open: !this.state.open
    });
  }

  _handleInputChange(event) {
    const { target } = event;
    this.state.formState.conversation = target.value;
  }

  render() {
    const { conversation, type: Type, ...rest } = this.props;

    return (
      <li className="list-group-item" key={`conversation-${conversation.id}`}>
        <div className={`conversations-partial`}>
          <div>
            <span className="mini-text text-muted float-right pt-1">
              {moment(conversation.created_at).fromNow()}
            </span>
            <span className="text-muted pr-2 h5">
              <MDIcons.MdArrowBack />
            </span>
            <span className="font-weight-bold" onClick={this._toggleOpenState}>{conversation.name}</span>
            <span className="message-body pr-2">
              <TextTruncate
                line={1}
                truncateText="..."
                text={conversation.description}
              />
            </span>
            {this.state.open ? (
              <div className="conversation">
                <div className="conversation-content nl2br">
                  <div className="list-group-item-view">
                    <Type conversation={conversation} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </li>
    );
  }
}

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Conversations;

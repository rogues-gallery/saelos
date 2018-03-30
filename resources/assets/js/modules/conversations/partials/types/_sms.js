import React from 'react'

class ConversationSms extends React.Component {
  render() {
    const { conversation } = this.props;

    return (
      <div className="col pt-3 pb-1 px-0">
        {conversation.details.message}
      </div>
    )
  }
}

export default ConversationSms
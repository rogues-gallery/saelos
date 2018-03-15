import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import _ from 'lodash'
import TextTruncate from 'react-text-truncate'
import moment from 'moment'
import { ConversationCall, ConversationEmail } from './types'

class Conversations extends React.Component {
  render() {
  	const { dispatch, conversations, ...props } = this.props;

  	if (conversations.length != 0) {

	    return (
				<div className="card mb-3" key="conversations-key-1">
					<ul className="list-group list-group-flush">
						{conversations.map(conversation => <Conversation conversation={conversation} type={conversation.type == 'App\\EmailActivity' ? ConversationEmail : ConversationCall} dispatch={dispatch} />)}
					</ul>
				</div>
			) 
  	} else {
			return null
		}

  }
}

Conversations.propTypes = {
	dispatch: PropTypes.func.isRequired,
	conversations: PropTypes.array.isRequired
}

class Conversation extends React.Component {
  constructor(props) {
    super(props)
		this._toggleOpenState = this._toggleOpenState.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)

    this.state = {
      open: false,
      formState: props.conversation.originalProps
    }
  }

  _toggleOpenState() {
    this.setState({
      open: !this.state.open
    })
  }

   _handleInputChange(event) {
    const { target } = event
    this.state.formState.conversation = target.value
  }

  render() {
    const { conversation, type: Type, ...rest } = this.props

    return (
    	<li className="list-group-item" key={`conversation-${conversation.id}`}>
	      <div className={`conversations-partial`}>
	        <div onClick={this._toggleOpenState}>
	          <span className="mini-text text-muted float-right pt-1">{moment(conversation.created_at).fromNow()}</span>
	          <span className="text-muted pr-2 h5"><MDIcons.MdArrowBack /></span>
	          <span className="font-weight-bold">{conversation.title}</span><span className="message-body pr-2"><TextTruncate line={1} truncateText="..." text={conversation.description}/></span>
	            {this.state.open ?
			          <div className="conversation">
		              <div className="conversation-content nl2br">
		                <div className="list-group-item-view">
		                  <Type conversation={conversation} />
		                </div>
		              </div>
		            </div>
							: ''
						}
	        </div>
	      </div>
	    </li>
    )
  }
}

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Conversations
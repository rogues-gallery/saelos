import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'

class Conversations extends React.Component {
  render() {
  	const { dispatch, activities, ...props } = this.props;

    return (
			<div className="card mb-3">
			  <ul className="list-group list-group-flush">
			    <li className="list-group-item">
			      <div className="conversation">
			        <span className="mini-text text-muted float-right pt-1">10 hours ago</span>
			        <span className="text-muted pr-2 h5"><MDIcons.MdArrowBack /></span><span>Welcome to your new CRM</span> <span className="message-body">This is the beginning of the body for this conver... </span>
			      </div>
			    </li>
			    <li className="list-group-item">
			      <div className="conversation">
			        <span className="mini-text text-muted float-right pt-1">5 hours ago</span>
			        <span className="text-muted pr-2 h5"><MDIcons.MdArrowBack /></span><span>Just checking in as a follow-up</span> <span className="message-body">This is the beginning of the body for this con...</span>
			      </div>
			    </li>
			    <li className="list-group-item">
			      <div className="conversation">
			        <span className="mini-text text-muted float-right pt-1">2 hours ago</span>
			        <span className="text-muted pr-2 h5"><MDIcons.MdArrowForward /></span><span>This is your first message coming in</span> <span className="message-body">This is the beginning of the body for this...</span>
			      </div>
			    </li>
			    <li className="list-group-item">
			      <div className="conversation">
			        <span className="mini-text text-muted float-right pt-1">2 min ago</span>
			        <span className="text-muted pr-2 h5"><MDIcons.MdArrowBack /></span><span>Here is my response to your message</span> <span className="message-body">This is the beginning of the body for thi...</span>
			      </div>
			    </li>
			    <li className="list-group-item">
			      <div className="conversation">
			        <span className="mini-text text-muted float-right pt-1">Now</span>
			        <span className="text-primary pl-1 pr-2-5 mini-text align-text-top"><MDIcons.MdRadioButtonChecked /></span><span className="font-weight-bold">Re: And you replied to me again</span> <span className="message-body">This is the beginning of the body for this co...</span>
			      </div>
			    </li>
			  </ul>
			</div>
		)
  }
}

Conversations.propTypes = {
	dispatch: PropTypes.func.isRequired,
	activities: PropTypes.array.isRequired
}

export default Conversations
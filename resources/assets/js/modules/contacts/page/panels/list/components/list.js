import React from 'react'
import PropTypes from 'prop-types'
import { fetchContact } from "../../../../service"

class ListContacts extends React.Component {
  render() {
    const { contacts, dispatch } = this.props;
		const view = this.props.view ? this.props.view : 'contacts'
    return (
			<div>
				{contacts.map(contact => <Contact key={contact.id} contact={contact} view={view} dispatch={dispatch} router={this.context.router} />)}
			</div>
		)
	}
}

const Contact = ({ contact, dispatch, router, view }) => {
  const openContactRecord = (id, view) => {
    dispatch(fetchContact(contact.id))
    router.history.push(`/${view}/${id}`)
  }

  return (
    <div onClick={() => openContactRecord(contact.id, view)} className="list-group-item list-group-item-action align-items-start">
      <p className="mini-text text-muted float-right"><b>{contact.status.name}</b></p>
      <p>
        { contact.pivot.primary ? <span className="dot bg-primary mini" /> : '' }
        <strong>{contact.first_name} {contact.last_name}</strong>
        <br />{contact.company.name}
      </p>
    </div>
  );
}

ListContacts.contextTypes = {
  router: PropTypes.object
}

export default ListContacts

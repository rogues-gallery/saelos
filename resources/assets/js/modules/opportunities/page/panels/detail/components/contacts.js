import React from 'react'
import PropTypes from 'prop-types'
import { fetchContact } from "../../../../../contacts/service"
import * as MDIcons from 'react-icons/lib/md'


class Contacts extends React.Component {
  render() {
    const { contacts, dispatch } = this.props;
    return (
  <div className="card">
    <div className="card-header" id="headingContacts">
      <h6 className="mb-0" data-toggle="collapse" data-target="#collapseContacts" aria-expanded="true" aria-controls="collapseContacts">
        <MDIcons.MdArrowDropDownCircle /> Contacts
      </h6>
    </div>

    <div id="collapseContacts" className="collapse show mh-200" aria-labelledby="headingContacts">
      <div className="list-group border-bottom">
        {contacts.map(contact => <Contact key={contact.id} contact={contact} router={this.context.router} dispatch={dispatch} />)}
      </div>
    </div>
  </div>
)}
}

const Contact = ({ contact, dispatch, router }) => {
  const openContactRecord = (id) => {
    dispatch(fetchContact(contact.id))
    router.history.push(`/contacts/${id}`)
  }

  return (
    <div onClick={() => openContactRecord(contact.id)} className="list-group-item list-group-item-action align-items-start">
      <p className="mini-text text-muted float-right"><b>Stage</b></p>
      <p><strong>{contact.firstName} {contact.lastName}</strong>
      <br />Company Name</p>
      
    </div>
  );
}


Contacts.propTypes = {
  contacts: PropTypes.array.isRequired
}

Contacts.contextTypes = {
  router: PropTypes.object
}

export default Contacts
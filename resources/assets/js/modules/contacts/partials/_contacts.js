import React from 'react'
import PropTypes from 'prop-types'
import ContactList from '../page/panels/list/components/list'
import * as MDIcons from 'react-icons/lib/md'

class Contacts extends React.Component {
  render() {
    const { contacts, dispatch, ...props } = this.props;

    return (
      <div className="card">
        <div className="card-header" id="headingContacts">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseContacts" aria-expanded="true" aria-controls="collapseContacts">
            <MDIcons.MdKeyboardArrowDown /> Contacts <span className="text-muted font-weight-normal">({contacts.length})</span>
          </h6>
        </div>

        <div id="collapseContacts" className="collapse show mh-200" aria-labelledby="headingContacts">
          <div className="list-group border-bottom">
            <ContactList contacts={contacts} dispatch={dispatch} />
          </div>
        </div>
      </div>
    )
  }
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default Contacts
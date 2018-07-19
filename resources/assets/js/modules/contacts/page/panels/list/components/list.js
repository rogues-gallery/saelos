import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchContact } from "../../../../service";

class ListContacts extends Component {
  openContactRecord = id => {
    this.props.dispatch(fetchContact(id));
    this.context.router.history.push(`/contacts/${id}`);
  };

  render() {
    const { contacts, entityType, entityId } = this.props;

    return (
      <div>
        {contacts.map(contact => {
          let tertiaryText;

          switch (entityType) {
            case "App\\Company":
              const thisCompany = _.find(
                contact.companies,
                c => c.id === entityId
              );

              tertiaryText = thisCompany ? thisCompany.position : "";
              break;
            case "App\\Opportunity":
              const thisOpportunity = _.find(
                contact.opportunities,
                o => o.id === entityId
              );

              tertiaryText = thisOpportunity ? thisOpportunity.role : "";
              break;
            default:
              tertiaryText = contact.company.name;
          }

          return (
            <div
              key={contact.id}
              onClick={() => this.openContactRecord(contact.id)}
              className="list-group-item list-group-item-action align-items-start"
            >
              <p className="mini-text text-muted float-right">
                <b>{contact.status.name}</b>
              </p>
              <p>
                {contact.pivot.primary ? (
                  <span className="dot bg-primary mini" />
                ) : (
                  ""
                )}
                <strong>
                  {contact.first_name} {contact.last_name}
                </strong>
                <br />
                {tertiaryText}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

ListContacts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.number
};

ListContacts.contextTypes = {
  router: PropTypes.object
};

export default ListContacts;

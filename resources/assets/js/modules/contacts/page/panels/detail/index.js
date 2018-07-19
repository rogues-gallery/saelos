import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Contact from "../../../Contact";
import { saveContact } from "../../../service";
import { isStateDirty } from "../../../store/selectors";
import { isInEdit } from "../../../../contacts/store/selectors";
import { getStatuses } from "../../../../statuses/store/selectors";
import { getActiveUser } from "../../../../users/store/selectors";
import User from "../../../../users/User";
import { handleInputChange } from "../../../../../utils/helpers/fields";
import ContactDetails from "./ContactDetails";
import ContactHistory from "./ContactHistory";

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: props.contact.originalProps,
      view: "default"
    };
  }

  _submit = () => {
    this.props.dispatch(saveContact(this.state.formState));
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ formState: nextProps.contact.originalProps });
  }

  _toggleView = view => {
    this.setState({ view });
  };

  _handleInputChange = event => {
    this.setState({
      formState: handleInputChange(event, this.state.formState, {})
    });
  };

  _statusChange = id => {
    const event = {
      target: {
        type: "text",
        name: "status_id",
        value: id
      }
    };

    this._handleInputChange(event);
    this._submit();
  };

  render() {
    const { contact, dispatch, user, inEdit, statuses } = this.props;

    if (contact.id === null) {
      return "";
    }

    switch (this.state.view) {
      case "default":
        return (
          <ContactDetails
            contact={contact}
            dispatch={dispatch}
            toggle={this._toggleView}
            user={user}
            inEdit={inEdit}
            statuses={statuses}
            statusChange={this._statusChange}
          />
        );
      case "history":
        return (
          <ContactHistory
            activities={contact.activities}
            dispatch={dispatch}
            toggle={this._toggleView}
            inEdit={inEdit}
          />
        );
    }
  }
}

Detail.propTypes = {
  contact: PropTypes.instanceOf(Contact).isRequired,
  user: PropTypes.instanceOf(User).isRequired
};

export default connect(state => ({
  user: getActiveUser(state),
  isFetching: isStateDirty(state),
  inEdit: isInEdit(state),
  statuses: getStatuses(state)
}))(Detail);

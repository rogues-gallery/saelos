import React from 'react';
import PropTypes from 'prop-types';
import { fetchAccounts, fetchAccount } from "../../service";

class Page extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchAccounts())
  }

  render() {
    return (
      <div className="container">
        {this.props.accounts.map(account => <Account key={account.id} account={account} dispatch={this.props.dispatch} />)}
      </div>
    )
  }
}

Page.propTypes = {
  accounts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const Account = ({ account, dispatch }) => {
  return (
    <div className="account" onClick={() => dispatch(fetchAccount(account.id))}>
      {account.name}
    </div>
  );
}

Account.propTypes = {
  account: PropTypes.object.isRequired
};

export default Page;
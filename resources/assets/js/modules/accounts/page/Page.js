import React from 'react';
import PropTypes from 'prop-types';
import { fetchAccounts, fetchAccount } from "../service";
import Record from './panels/record';

const Page = ({ accounts, dispatch }) => ([
    <List key={1} accounts={accounts} dispatch={dispatch} />,
    <Record key={2} />
])

class List extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchAccounts())
  }

  render() {
    return (
      <div className="container col-sm-2 col-md-3 list-panel offset-md-2">
        <div className="position-fixed">
          <form>
            <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{position:"relative", verticalAlign:"top"}} />
          </form>
        </div>
        <div className="list-group">
          {this.props.accounts.map(account => <Account key={account.id} account={account} dispatch={this.props.dispatch} router={this.context.router} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  accounts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

List.contextTypes = {
  router: PropTypes.object
}

const Account = ({ account, dispatch, router }) => {
  const openAccountRecord = (id) => {
    dispatch(fetchAccount(account.id))
    router.history.push(`/accounts/${id}`)
  }

  return (
    <div onClick={() => openAccountRecord(account.id)} className={`list-group-item list-group-item-action flex-column align-items-start ${account.id === parseInt(router.route.match.params.id) ? ' active' : ''}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{account.name}</h5>
        <small className="text-muted">3 days ago</small>
      </div>
      <p className="mb-1">{account.position}</p>
      <small className="text-muted">Some Text</small>
    </div>
  );
}

Account.propTypes = {
  account: PropTypes.object.isRequired
};

export default Page;
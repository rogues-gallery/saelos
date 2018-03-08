import React from 'react'
import PropTypes from 'prop-types'
import { fetchAccounts, fetchAccount } from '../../../service'
import moment from 'moment'

class List extends React.Component {
  componentWillMount() {
    if (this.props.accounts.length === 0) {
      this.props.dispatch(fetchAccounts()) 
    }
  }

  render() {
    return (
      <div className="col list-panel border-right">
          <div className="px-4 pt-4 bg-white border-bottom">
            <form>
              <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{position:"relative", verticalAlign:"top"}} />
            </form>
            <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Active</b></div> <div className="text-muted col"><b>All</b></div></div>
          </div>
        <div className="list-group h-scroll">
          {this.props.accounts.map(account => <Account key={account.id} account={account} dispatch={this.props.dispatch} router={this.context.router} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  accounts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool
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
    <div onClick={() => openAccountRecord(account.id)} className={`list-group-item list-group-item-action align-items-start ${account.id === parseInt(router.route.match.params.id) ? ' active' : ''}`}>
      <span className="text-muted mini-text float-right">{moment(account.updated_at).fromNow()}</span>
      <h6>{account.name}</h6>
      <p>Secondary Detail</p>
      <p className="text-muted">Tertiary Information</p>
    </div>
  );
}

Account.propTypes = {
  account: PropTypes.object.isRequired
};

export default List
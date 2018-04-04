import React from 'react'
import PropTypes from 'prop-types'
import { fetchUsers, fetchUser } from '../../../service'

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentWillMount() {
    const { users, dispatch, searchString } = this.props

    if (users.length === 0) {
      dispatch(fetchUsers({page: 1, searchString}))
    }
  }

  _onKeyPress(event) {
    const { target, charCode } = event

    if (charCode !== 13) {
      return
    }

    event.preventDefault()

    this._submit(target)
  }

  _submit(input) {
    const { value } = input
    const { dispatch } = this.props

    if (value.length >= 3) {
      dispatch(fetchUsers({page: 1, searchString: value}))
    } else if (value.length === 0) {
      dispatch(fetchUsers({page: 1, searchString: ''}))
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchUsers({page: pagination.current_page + 1, searchString}))
    }
  }

  render() {
    const { users, dispatch, searchString, firstUserId } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || firstUserId

    return (
      <div className="col list-panel border-right">
        <div className="px-4 pt-4 bg-white border-bottom">
          <form>
            <input
              type="search"
              className="form-control ds-input"
              id="search-input"
              placeholder="Search..."
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0"
              dir="auto"
              style={{position:"relative", verticalAlign:"top"}}
              onKeyPress={this._onKeyPress}
              defaultValue={searchString}
            />
          </form>
          <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>All</b></div> <div className="text-muted col"><b>Active</b></div> <div className="text-muted col"><b>Inactive</b></div></div>
        </div>
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {users.map(user => <User key={user.id} user={user} dispatch={dispatch} router={this.context.router} activeID={activeIndex} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  users: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string
};

List.contextTypes = {
  router: PropTypes.object
}

const User = ({ user, dispatch, router, activeID }) => {
  const openUserRecord = (id) => {
    dispatch(fetchUser(user.id))
    router.history.push(`/config/users/${id}`)
  }

  return (
    <div
      onClick={() => openUserRecord(user.id)}
      className={`list-group-item list-group-item-action align-items-start ${user.id === parseInt(activeID) ? ' active' : ''}`}
    >
      <h6>{user.name}</h6>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  activeID: PropTypes.number.isRequired
};

export default List
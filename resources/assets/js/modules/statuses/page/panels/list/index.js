import React from 'react'
import PropTypes from 'prop-types'
import { fetchStatuses, fetchStatus } from '../../../service'

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentWillMount() {
    const { statuses, dispatch, searchString } = this.props

    if (statuses.length === 0) {
      dispatch(fetchStatuses({page: 1, searchString}))
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
      dispatch(fetchStatuses({page: 1, searchString: value}))
    } else if (value.length === 0) {
      dispatch(fetchStatuses({page: 1, searchString: ''}))
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchStatuses({page: pagination.current_page + 1, searchString}))
    }
  }

  render() {
    const { statuses, dispatch, searchString, firstStageId } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || firstStageId

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
          <div className="micro-text row text-center pt-3 pb-2">
            <div className="text-dark col cursor-pointer"><b>All</b></div>
            <div className="text-muted col cursor-pointer"><b>Unpublished</b></div>
          </div>
        </div>
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {statuses.map(status => <Status key={status.id} status={status} dispatch={dispatch} router={this.context.router} activeID={activeIndex} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  statuses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string
};

List.contextTypes = {
  router: PropTypes.object
}

const Status = ({ status, dispatch, router, activeID }) => {
  const openStatusRecord = (id) => {
    dispatch(fetchStatus(status.id))
    router.history.push(`/config/statuses/${id}`)
  }

  return (
    <div
      onClick={() => openStatusRecord(status.id)}
      className={`list-group-item list-group-item-action align-items-start ${status.id === parseInt(activeID) ? ' active' : ''}`}
    >
      <h6>{status.name}</h6>
    </div>
  );
}

Status.propTypes = {
  status: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  activeID: PropTypes.number.isRequired
};

export default List

import React from 'react'
import PropTypes from 'prop-types'
import ListActivities from '../../../../activities/partials/_list'
import { fetchActivities, fetchActivity } from "../../../../activities/service";

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentWillMount() {
    const { activities, dispatch, searchString } = this.props

    if (activities.length === 0) {
      dispatch(fetchActivities({page: 1, searchString}))
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
      dispatch(fetchActivities({page: 1, searchString: value}))
    } else if (value.length === 0) {
      dispatch(fetchActivities({page: 1, searchString: ''}))
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchActivities({page: pagination.current_page + 1, searchString}))
    }
  }

  render() {
    const { activities, dispatch, searchString } = this.props

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
          <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Current</b></div><div className="text-muted col"><b>Late</b></div><div className="text-muted col"><b>All</b></div></div>
        </div>
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          <ListActivities activities={activities} dispatch={dispatch} view={'headquarters'} />
        </div>
      </div>
    )
  }
}


List.propTypes = {
  activities: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};

List.contextTypes = {
  router: PropTypes.object
}


export default List
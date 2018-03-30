import React from 'react'
import PropTypes from 'prop-types'
import { fetchTags, fetchTag } from '../../../service'

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentWillMount() {
    const { tags, dispatch, searchString } = this.props

    if (tags.length === 0) {
      dispatch(fetchTags({page: 1, searchString}))
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
      dispatch(fetchTags({page: 1, searchString: value}))
    } else if (value.length === 0) {
      dispatch(fetchTags({page: 1, searchString: ''}))
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchTags({page: pagination.current_page + 1, searchString}))
    }
  }

  render() {
    const { tags, dispatch, searchString, firstTagId } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || firstTagId

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
            <div className="text-muted col"><b>Active</b></div>
            <div className="text-dark col"><b>All</b></div>
          </div>
        </div>
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {tags.map(tag => <Tag key={tag.id} tag={tag} dispatch={dispatch} router={this.context.router} activeID={activeIndex} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  tags: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string
};

List.contextTypes = {
  router: PropTypes.object
}

const Tag = ({ tag, dispatch, router, activeID }) => {
  const openTagRecord = (id) => {
    dispatch(fetchTag(tag.id))
    router.history.push(`/tags/${id}`)
  }

  return (
    <div
      onClick={() => openTagRecord(tag.id)}
      className={`list-group-item list-group-item-action align-items-start ${tag.id === parseInt(activeID) ? ' active' : ''}`}
    >
      <h6>{tag.name}</h6>
    </div>
  );
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  activeID: PropTypes.number.isRequired
}

export default List
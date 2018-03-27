import React from 'react'
import PropTypes from 'prop-types'
import { fetchFields, fetchField } from '../../../service'
import _ from 'lodash'

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentWillMount() {
    const { fields, dispatch, searchString } = this.props

    if (fields.length === 0) {
      dispatch(fetchFields({page: 1, searchString}))
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
      dispatch(fetchFields({page: 1, searchString: value}))
    } else if (value.length === 0) {
      dispatch(fetchFields({page: 1, searchString: ''}))
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchFields({page: pagination.current_page + 1, searchString}))
    }
  }

  render() {
    const { fields, searchString, firstFieldId } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || firstFieldId

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
          <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Company</b></div> <div className="text-muted col"><b>Contact</b></div> <div className="text-muted col"><b>Opportunity</b></div></div>
        </div>
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {fields.map(field => (
            <div
              key={`field-${field.id}`}
              onClick={() => this.context.router.history.push(`/config/fields/${field.id}`)}
              className={`list-group-item list-group-item-action align-items-start ${field.id === activeIndex ? ' active' : ''}`}
            >
              <span class="float-right text-muted mini-text">{field.type}</span>
              <h6>{field.label}</h6>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  fields: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string
}

List.contextTypes = {
  router: PropTypes.object
}

export default List
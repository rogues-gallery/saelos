import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { parseSearchString } from '../../utils/helpers'
import * as MDIcons from 'react-icons/lib/md'
import {getActiveUser, getViews} from '../../modules/users/store/selectors'
import { CirclePicker } from 'react-color'
import {createView, removeView} from "../../modules/users/service";

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this._updateSearchString = this._updateSearchString.bind(this)
    this._handleOnChange = this._handleOnChange.bind(this)
    this._buildHtmlFromSearchString = this._buildHtmlFromSearchString.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
    this._submit = this._submit.bind(this)
    this._removeView = this._removeView.bind(this)
    this._toggleAdd = this._toggleAdd.bind(this)
    this._createView = this._createView.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._clearSearch = this._clearSearch.bind(this)

    this.state = {
      searchString: props.searchString,
      addingView: false,
      formState: {
        linkText: '',
        color: '',
        parentItem: props.parentItem
      }
    }
  }

  _updateSearchString(string) {
    this.setState({
      searchString: `${this.state.searchString}${string}`
    })
  }

  _handleOnChange(e) {
    this.setState({
      searchString: e.target.value
    })
  }

  _handleInputChange(event) {
    const { target } = event
    const { value, name } = target
    const { formState } = this.state

    _.set(formState, name, value)

    this.setState({
      formState
    })
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
    const { dispatch, searchFunc } = this.props

    if (value.length >= 3 || (/([\uD800-\uDBFF][\uDC00-\uDFFF])/).test(value)) {
      dispatch(searchFunc({page: 1, searchString: value}))
    } else if (value.length === 0) {
      dispatch(searchFunc({page: 1, searchString: ''}))
    }
  }

  _buildHtmlFromSearchString(value) {
    const parsed = parseSearchString(value, this.props.searchFields)

    return typeof parsed === 'object' && parsed.offsets.map((v, k) => {
      const field = this.props.searchFields[v.keyword]

      return (
        <span className="tag-container" key={`search-tag-${k}`}>
          {typeof field !== 'undefined'
            ? <span className="tag">{field.alias}:</span>
            : ''
          }{v.value}
        </span>
      )
    }) || value
  }

  _toggleAdd() {
    this.setState({
      addingView: !this.state.addingView
    })
  }

  _createView() {
    const { dispatch, parentItem } = this.props
    const { formState, searchString } = this.state

    _.set(formState, 'searchString', searchString)

    dispatch(createView(formState))

    this.setState({
      formState: {
        name: '',
        color: '',
        parentItem
      },
      addingView: false
    })
  }

  _removeView() {
    const { dispatch, parentItem } = this.props
    const { searchString } = this.state

    dispatch(removeView({
      searchString,
      parentItem
    }))
  }

  _clearSearch() {
    const { dispatch, searchFunc } = this.props

    this.setState({
      searchString: ''
    })

    dispatch(searchFunc({page: 1, searchString: ''}))
  }

  render() {
    const { searchString, addingView, formState } = this.state
    const { views } = this.props
    const viewSearchStrings = views.map(v => v.searchString)


    return (
      <div className="position-relative px-3 pt-4 bg-white border-bottom">
        <div id="advanced-search-container" className={searchString ? 'input-group' : ''}>
            <input
              type="search"
              className="form-control ds-input"
              id="search-input"
              placeholder="Search..."
              dir="auto"
              style={{position:"relative", verticalAlign:"top"}}
              onKeyPress={this._onKeyPress}
              onChange={this._handleOnChange}
              value={searchString}
            />
            <div className="input-group-append">
              {searchString ?
                <button className="btn btn-outline border">
                  <span className="text-muted" onClick={this._clearSearch}><MDIcons.MdClearAll /></span>
                </button>
              : '' }
              {viewSearchStrings.includes(searchString) ?
              <button className="btn btn-outline border">
                <span className="text-danger" onClick={this._removeView}><MDIcons.MdDelete /></span>
              </button>
              : searchString ?
              <button className="btn btn-outline border">
                <span className="text-muted" onClick={this._toggleAdd}><MDIcons.MdAdd /></span>
              </button>
                : '' }
              {addingView ?
                <div className="add-tag-container">
                  <div className="add-tag-menu dropdown-menu show mt-1 pt-2">
                    <div className="px-2 py-2">
                      <div className="form-group">
                        <label htmlFor="linkText">Create New View</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="linkText"
                          name="linkText"
                          placeholder="View Name"
                          value={formState.linkText}
                          onChange={this._handleInputChange} />
                      </div>
                      <div className="form-group">
                        <CirclePicker
                          color={formState.color}
                          name="tagColor"
                          circleSize={20}
                          circleSpacing={10}
                          onChangeComplete={(color) => {
                            const event = {
                              target: {
                                name: 'color',
                                value: color.hex
                              }
                            }

                            this._handleInputChange(event)
                          }}
                          placeholder={formState.color} />
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm" onClick={this._createView}>Create</button>
                    </div>
                  </div>
                </div>
                : ''}
            </div>
        </div>
        <div className="micro-text row text-center pt-3 pb-2">
          <div className="cursor-pointer text-dark col" onClick={() => this._updateSearchString(' active:true')}><b>Active</b></div>
          <div className="cursor-pointer text-muted col" onClick={() => this._updateSearchString(' active:false')}><b>All</b></div>
        </div>
      </div>
    )
  }
}

AdvancedSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  searchFunc: PropTypes.func.isRequired,
  searchFields: PropTypes.object.isRequired,
  views: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  parentItem: PropTypes.string.isRequired
}

export default connect((state, ownProps) => ({
  views: getViews(state, ownProps.parentItem),
  user: getActiveUser(state)
}))(AdvancedSearch)

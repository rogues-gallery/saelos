import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as MDIcons from 'react-icons/lib/md'
import { CirclePicker } from 'react-color'
import { parseSearchString, parsedToString } from '../../utils/helpers'
import { getActiveUser, getViews} from '../../modules/users/store/selectors'
import { createView, removeView} from '../../modules/users/service'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchString: props.searchString,
      addingView: false,
      formState: {
        linkText: '',
        color: '',
        parentItem: props.parentItem
      },
      expandSearch: false,
      advancedSearchCursor: false
    }

    this.searchInputRef = null
  }

  _updateSearchString = (string) => {
    this.setState({
      searchString: `${this.state.searchString}${string}`,
      expandSearch: false
    })

    this._focusSearchInput()
  }

  _focusSearchInput = () => {
    this.setState({
      advancedSearchCursor: true
    })
    this.searchInputRef.focus()
    this.searchInputRef.selectionStart = this.searchInputRef.value.length
    this.searchInputRef.selectionEnd = this.searchInputRef.value.length
  }

  _handleOnChange = (e) => {
    this.setState({
      searchString: e.target.value
    })
  }

  _handleInputChange = (event) => {
    const { target } = event
    const { value, name } = target
    const { formState } = this.state

    _.set(formState, name, value)

    this.setState({
      formState
    })
  }

  _onKeyPress = (event) => {
    const { target, charCode } = event

    if (charCode !== 13) {
      return
    }

    event.preventDefault()

    this._submit(target)
  }

  _submit = (input) => {
    const { value } = input
    const { dispatch, searchFunc } = this.props

    if (value.length >= 3 || (/([\uD800-\uDBFF][\uDC00-\uDFFF])/).test(value)) {
      dispatch(searchFunc({page: 1, searchString: value}))
    } else if (value.length === 0) {
      dispatch(searchFunc({page: 1, searchString: ''}))
    }
  }

  _buildHtmlFromSearchString = (value) => {
    if (!value.trim()) {
      return 'Search...'
    }

    const { searchFields } = this.props
    const parsed = parseSearchString(value, searchFields)

    const toReturn = typeof parsed !== 'object' ? value : parsed.offsets.map((v, k) => {
      const field = searchFields[v.keyword]
      const hasTag = typeof field !== 'undefined' || [
        'assignee',
        'stage',
        'status',
        'opportunity',
        'company',
        'contact',
        'tag'
      ].includes(v.keyword)

      if (v.keyword === 'freetext') {
        return ''
      }

      if (!hasTag) {
        return v.value
      }

      const excluded = parsed.exclude.hasOwnProperty(v.keyword)

      return (
        <div className="btn-group mr-2" key={k}>
          <button className="btn btn-outline-secondary btn-sm">{excluded ? '-' : ''}{v.keyword}:{v.value}</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={(e) => this._onSearchTagClick(e, v.keyword)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )
    })

    if(toReturn instanceof Array) {
      toReturn.push(parsed.text)
    }

    return toReturn
  }

  _onSearchTagClick = (event, alias) => {
    event.stopPropagation()

    const { searchString } = this.state
    const { searchFields } = this.props
    const parsed = parseSearchString(searchString, searchFields)
    const toString = parsedToString(parsed, searchFields, new Array(alias))

    this.setState({
      searchString: toString.trim()
    })
  }

  _toggleAdd = () => {
    this.setState({
      addingView: !this.state.addingView
    })
  }

  _createView = () => {
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

  _removeView = () => {
    const { dispatch, parentItem } = this.props
    const { searchString } = this.state

    dispatch(removeView({
      searchString,
      parentItem
    }))
  }

  _clearSearch = () => {
    const { dispatch, searchFunc } = this.props

    this.setState({
      searchString: ''
    })

    dispatch(searchFunc({page: 1, searchString: ''}))
  }

  render() {
    const { searchString, addingView, formState, expandSearch, advancedSearchCursor } = this.state
    const { views, searchFields } = this.props
    const viewSearchStrings = views.map(v => v.searchString)


    return (
      <div className="position-relative px-3 pt-4 bg-white border-bottom">
        <div className={`select-search-tags ${expandSearch ? '' : 'd-none'}`}>
          <div className="search-relationships">
            <h5>Relationships</h5>
            {['assignee', 'status', 'stage', 'tag', 'opportunity', 'contact', 'company'].map((a, i) => {
              return (
                <span
                  key={i}
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    this._updateSearchString(` ${a}:`)
                  }}>
                  {a}
                </span>
              )
            })}
          </div>
          <hr />
          <h5>Fields</h5>
          <div className="search-fields">
            {Object.keys(searchFields).map(a => {
              const f = searchFields[a]

              return !f.searchable ? '' : (
                <span
                  key={f.id}
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    this._updateSearchString(` ${f.alias}:`)
                  }}>
                  {f.alias}
                </span>
              )
            })}
          </div>
        </div>
        <div id="advanced-search-container" className={searchString ? 'input-group' : ''}>
          <div className="input-container">
            <div className="advanced-search-tags" onClick={() => {
              this.setState({expandSearch: true})
              this._focusSearchInput()
              this.searchInputRef.value = this.searchInputRef.value + ' '
            }}>
              {this._buildHtmlFromSearchString(searchString)}
              {advancedSearchCursor ? <span className="blink">|</span> : ''}
            </div>
            <input
              ref={searchInput => { this.searchInputRef = searchInput }}
              type="search"
              className="form-control ds-input"
              id="search-input"
              placeholder="Search..."
              dir="auto"
              autocomplete="false"
              onBlur={() => this.setState({advancedSearchCursor: false, expandSearch: false})}
              onKeyPress={this._onKeyPress}
              onChange={this._handleOnChange}
              value={searchString}
            />
          </div>
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

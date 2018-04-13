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
      searchDivScrollLeft: 0
    }

    this.searchInputRef = null
    this.searchDivRef = null
  }

  _updateSearchString = (string) => {
    const { searchString } = this.state
    const lastChar = searchString.substring(searchString.length - 1);
    const trimmed = lastChar === '+' ? searchString.substring(0, searchString.length - 1) : searchString

    this.setState({
      searchString: `${trimmed}${string}`,
      expandSearch: false
    })

    this._focusSearchInput()
  }

  _focusSearchInput = () => {
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

    if (charCode === 43) { // +
      this.setState({
        expandSearch: true,
        searchDivScrollLeft: document.getElementById('search-input').scollLeft
      })
    }

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
    const { originalText, offsets, exclude } = parseSearchString(value, searchFields)

    return typeof offsets === 'undefined' ? value : offsets.map((v, k) => {
      const field = searchFields[v.keyword]
      const excluded = exclude.hasOwnProperty(v.keyword)
      const isField = typeof field !== 'undefined'
      const isRelation = [
        'assignee',
        'stage',
        'status',
        'opportunity',
        'company',
        'contact',
        'tag'
      ].includes(v.keyword)
      const hasTag = isRelation || isField

      if (!hasTag || v.keyword === 'freetext') {
        return v.value
      }

      return (
        <React.Fragment>
          <span key={k} className={`highlight-${isRelation ? 'relation' : 'field'}`}>
            {excluded ? '-' : ''}{v.keyword}:{v.exact ? `"${v.value}"` : v.value}
          </span>
          &nbsp;
        </React.Fragment>
      )
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
    const { searchString, addingView, formState, expandSearch } = this.state
    const { views, searchFields } = this.props
    const viewSearchStrings = views.map(v => v.searchString)

    return (
      <div className="position-relative px-3 pt-4 bg-white border-bottom">
        <div className={`select-search-tags position-absolute card p-2 fw-200 ${expandSearch ? '' : 'd-none'}`}>
          <div className="search-relationships">
            <h5>Has</h5>
            {['assignee', 'status', 'stage', 'tag', 'opportunity', 'contact', 'company'].map((a, i) => {
              return (
                <span
                  key={i}
                  className="cursor-pointer highlight-relation p-1 m-1 d-inline-block"
                  onClick={() => {
                    this._updateSearchString(`${a}:`)
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
                    className="cursor-pointer highlight-field p-1 m-1 d-inline-block"
                    onClick={() => {
                      this._updateSearchString(`${f.alias}:`)
                    }}>
                    {f.alias}
                  </span>
              )
            })}
          </div>
        </div>
        <div id="advanced-search-container" className={searchString ? 'input-group' : ''}>
          <div className="input-container form-control">
            <div className="advanced-search-tags" id="search-div" ref={divInput => { this.searchDivRef = divInput }}>
              {this._buildHtmlFromSearchString(searchString)}
            </div>
            <input
              ref={searchInput => { this.searchInputRef = searchInput }}
              type="search"
              className="form-control"
              autoComplete="off"
              id="search-input"
              placeholder="Search..."
              dir="auto"
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

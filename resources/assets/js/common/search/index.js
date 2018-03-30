import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { parseSearchString } from '../../utils/helpers'
import ContentEditable from 'react-contenteditable'
import * as MDIcons from 'react-icons/lib/md'
import {getViews} from "../../modules/user/store/selectors";

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this._updateSearchString = this._updateSearchString.bind(this)
    this._handleOnChange = this._handleOnChange.bind(this)
    this._buildHtmlFromSearchString = this._buildHtmlFromSearchString.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
    this._submit = this._submit.bind(this)
    this._removeView = this._removeView.bind(this)
    this._addView = this._addView.bind(this)

    this.state = {
      searchString: props.searchString
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

    if (value.length >= 3) {
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

  _removeView() {
    // @TODO
  }

  _addView() {
    // @TODO
  }

  render() {
    const { searchString } = this.state
    const { views } = this.props
    const viewSearchStrings = views.map(v => v.searchString)


    return (
      <div className="position-relative px-3 pt-4 bg-white border-bottom">
        <div id="advanced-search-container" className="input-group">
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
              <button className="btn btn-outline border">
                {viewSearchStrings.includes(searchString)
                ? <span className="text-danger" onClick={this._removeView}><MDIcons.MdDoNotDisturb /></span>
                : <span className="text-muted" onClick={this._addView}><MDIcons.MdRestore /></span>
                }

              </button>
            </div>
        </div>
        <div className="micro-text row text-center pt-3 pb-2">
          <div className="text-dark col" onClick={() => this._updateSearchString(' active:true')}><b>Active</b></div>
          <div className="text-muted col" onClick={() => this._updateSearchString(' active:false')}><b>All</b></div>
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
  views: PropTypes.array.isRequired
}

export default connect(state => ({
  views: getViews(state)
}))(AdvancedSearch)
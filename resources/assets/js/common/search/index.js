import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getCustomField, parseSearchString} from '../../utils/helpers'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this._updateSearchString = this._updateSearchString.bind(this)
    this._handleOnChange = this._handleOnChange.bind(this)
    this._buildHtmlFromSearchString = this._buildHtmlFromSearchString.bind(this)

    this.state = {
      searchOpen: false,
      searchString: props.searchString,
      parsedSearchString: {}
    }
  }

  _updateSearchString(string) {
    this.setState({
      searchString: `${this.state.searchString}${string}`.trim(),
      advancedSearch: false
    })

    document.getElementById('search-input-real').val = this.state.searchString
  }

  _handleOnChange(e) {
    this.setState({

      searchString: e.target.value
    })
  }

  _buildHtmlFromSearchString(value) {
    const parsed = parseSearchString(value, this.props.searchFields)

    return typeof parsed === 'object' && parsed.offsets.map((v, k) => {
      const field = this.props.searchFields[v.keyword]

      return (
        <span className="tag-container" key={`search-tag-${k}`}>
          {typeof field !== 'undefined'
            ? <span className="tag">{field.label}:</span>
            : ''
          }
          {v.value}
        </span>
      )
    }) || value
  }

  render() {
    const { searchFields } = this.props
    const { searchOpen, searchString } = this.state

    return (
      <div className="position-relative px-4 pt-4 bg-white border-bottom">
        <div id="advanced-search" onClick={() => document.getElementById('search-input-real').focus()}>
          {this._buildHtmlFromSearchString(searchString)}
        </div>
        <input id="search-input-real" type="text" onChange={this._handleOnChange} />
        {searchOpen ?
          <div className="px-4 py-4">
            {_.filter(searchFields, f => f.searchable).map(f =>
              <span key={`contacts-search-${f.alias}`} className="tag" onClick={() => this._updateSearchString(` ${f.alias}:`)}>{f.label}: </span>
            )}
          </div>
          :
          <div className="micro-text row text-center pt-3 pb-2">
            <div className="text-dark col"><b>Active</b></div>
            <div className="text-muted col"><b>All</b></div>
          </div>
        }
      </div>
    )
  }
}

AdvancedSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  searchFunc: PropTypes.func.isRequired,
  searchFields: PropTypes.object.isRequired
}

export default connect(state => ({

}))(AdvancedSearch)
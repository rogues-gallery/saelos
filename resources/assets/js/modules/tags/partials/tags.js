import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class TagsPartial extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._navToSearch = this._navToSearch.bind(this)

    this.state = {
      entityId: null,
      entityType: null,
      formState: {},
      addingNew: false,
    }
  }

  _submit() {

  }

  _navToSearch() {

  }

  render() {
    const { tags, entityId, entityType } = this.props
    const { addingNew } = this.state

    return (
      <React.Fragment>
        <div className="tags-container">
          <small className="ml-3">
          {tags.map(t =>
            <button
              onClick={this._navToSearch}
              key={`entity-${entityId}-tag-${t.id}`}
              style={{backgroundColor: t.color}}
              className="btn btn-outline-secondary btn-sm">
              {t.name}
            </button>
          )}
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.setState({addingNew: true})}>
              + ADD TAG
            </button>
          </small>
        </div>
      </React.Fragment>
    )
  }
}

export default connect()(TagsPartial)
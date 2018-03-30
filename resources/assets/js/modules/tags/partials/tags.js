import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { convertHex } from '../../../utils/helpers/graphics'

class TagsPartial extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._navToSearch = this._navToSearch.bind(this)
    this._addTag = this._addTag.bind(this)

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

  _addTag() {
    this.setState({addingNew: true})
  }

  render() {
    const { tags, entityId, entityType } = this.props
    const { addingNew } = this.state

    return (
      <React.Fragment>        
          <small className="ml-3">
          {tags.map(t =>
            <button
              onClick={this._navToSearch}
              key={`entity-${entityId}-tag-${t.id} - ${t.color}`}
              style={{backgroundColor: convertHex(t.color, 10), borderColor: t.color, color: t.color}}
              className="btn btn-outline-secondary btn-sm mr-2">
              {t.name}
            </button>
          )}
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={this._addTag}
              data-toggle="dropdown">
              + ADD TAG
            </button>
            <div className="dropdown-menu mt-1 pt-1">
              <a className="dropdown-item px-2" href="#"><span className="dot mr-2" />Tag 1</a>
              <a className="dropdown-item px-2" href="#"><span className="dot mr-2" />Tag 2</a>
              <div className="dropdown-divider"></div>
              <form className="px-2 py-2">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control form-control-sm" id="name" placeholder="Tag Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input type="text" className="form-control form-control-sm" id="color" placeholder="#000000" />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Create</button>
              </form>
            </div>
          </small>
      </React.Fragment>
    )
  }
}

export default connect()(TagsPartial)
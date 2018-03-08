import React from 'react'
import moment from 'moment'
import _ from 'lodash'

class Model {
  constructor(props) {
    this.initialize(props)
  }

  initialize(props) {
    this.originalProps = props;

    this.id = props.id && Number(props.id) || null
    this.created_at = props.created_at && moment(props.created_at) || null
    this.updated_at = props.updated_at && moment(props.updated_at) || null
    this.deleted_at = props.deleted_at && moment(props.deleted_at) || null
  }

  toJson() {
    const props = Object.assign({}, this)

    _.forOwn(props, (value, key) => {
      if (value instanceof moment) {
        props[key] = value.format('YYYY-MM-DD HH:mm:ss')
      }
    })

    return props
  }

  nl2br(text) {
    return text.split('\n').map(function(item, key) {
      return (
        <span key={key}>
          {item}
          <br/>
        </span>
      )
    })
  }
}

export default Model
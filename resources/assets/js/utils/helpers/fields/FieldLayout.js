import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Select from 'react-select'
import * as MDIcons from 'react-icons/lib/md'
import DatePicker from '../../../common/ui/datepicker'

import 'react-day-picker/lib/style.css'

class FieldLayout extends React.Component {
  constructor(props) {
    super(props)

    this._buildHtml = this._buildHtml.bind(this)
  }

  _buildHtml() {
    const { model, field, inEdit, onChange } = this.props

    let fieldValue = _.get(model, field.alias);

    if (typeof fieldValue === 'object') {
      fieldValue = _.get(fieldValue, 'name')
    }

    const readOnly = !inEdit ? {
      readOnly: true,
      className: 'form-control-plaintext',
      required: field.required ? 'required' : false
    } : {
      readOnly: false,
      className: 'form-control',
      required: field.required ? 'required' : false
    }

    if (inEdit) {
      switch (field.type) {
        case 'textarea':
          return <textarea
            {...readOnly}
            id={field.alias}
            name={field.alias}
            onChange={onChange}
            defaultValue={fieldValue}
          />
        case 'checkbox':
          return (
            <label className="switch float-left mr-2">
              <input
                type="checkbox"
                name={field.alias}
                id={field.alias}
                onChange={onChange}
                defaultChecked={fieldValue}
              />
              <span className="toggle-slider round" />
            </label>
          )
        case 'number':
          return <input
            type="number"
            {...readOnly}
            id={field.alias}
            name={field.alias}
            onChange={onChange}
            defaultValue={fieldValue}
          />
        case 'email':
          return <input
            type="email"
            {...readOnly}
            id={field.alias}
            name={field.alias}
            onChange={onChange}
            defaultValue={fieldValue}
          />
        case 'multiselect':
          return <Select
            options={Object.keys(field.options).map(v => ({value: v, label: v}))}
            valueKey="value"
            labelKey="label"
            multi={true}
            value={fieldValue}
            className="form-control"
            onChange={(value) => {
              const e = {
                target: {
                  name: field.alias,
                  value: value.value
                }
              }

              onChange(e)
            }}
          />
        case 'lookup':
        case 'select':
          return <Select
            options={Object.keys(field.options).map(v => ({value: v, label: v}))}
            valueKey="value"
            labelKey="label"
            value={fieldValue}
            className="form-control"
            onChange={(value) => {
              const e = {
                target: {
                  name: field.alias,
                  value: value.value
                }
              }

              onChange(e)
            }}
          />
        case 'date':
          return <DatePicker
            className="form-control"
            name={field.alias}
            value={new Date(model.toJson()[field.alias])}
            onChange={onChange}
          />
        default:
          return <input
            type="text"
            {...readOnly}
            id={field.alias}
            name={field.alias}
            onChange={onChange}
            defaultValue={fieldValue}
          />
      }
    } else {
      switch (field.type) {
        case 'url':
          return (
            <a className="hidden-link" href={fieldValue} target="_blank">
              {fieldValue} <span className="text-muted"><MDIcons.MdExitToApp /></span>
            </a>
          )
        case 'checkbox':
          return fieldValue ? 'Yes' : 'No'
        default:
          return <div dangerouslySetInnerHTML={{__html: fieldValue}} />
      }
    }
  }

  render() {
    const { model, field, inEdit, isAdmin } = this.props

    let fieldValue = _.get(model, field.alias);

    if (typeof fieldValue === 'object') {
      fieldValue = _.get(fieldValue, 'name')
    }

    const hidden = inEdit ? '' : typeof fieldValue === 'undefined' || field.hidden || fieldValue.length === 0 ? 'd-none' : '';

    if (isAdmin) {
      return (
        <div className={`form-group mb-2`}>
          <label htmlFor={field.alias}>{field.label}</label>
          <div>
            {this._buildHtml()}
          </div>
        </div>
      )
    } else {
      return (
        <div className={`form-group mb-2 row ${hidden}`}>
          <label htmlFor={field.alias} className="col-sm-3 col-form-label">{field.label}</label>
          <div className="col-sm-9">
            {this._buildHtml()}
          </div>
        </div>
      )
    }
  }
}

FieldLayout.propTypes = {
  model: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  inEdit: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
}

export default FieldLayout
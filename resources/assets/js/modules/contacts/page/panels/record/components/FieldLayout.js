import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as MDIcons from 'react-icons/lib/md'

class FieldLayout extends React.Component {
  render() {
    const { model, field, inEdit, onChange, ...props } = this.props;

    let fieldValue = _.get(model, field.alias);

    if (typeof fieldValue === 'object') {
      fieldValue = _.get(fieldValue, 'name')
    }

    const hidden = inEdit ? '' : typeof fieldValue === 'undefined' || field.hidden || fieldValue.length === 0 ? 'd-none' : '';
    const readOnly = !inEdit ? {
      readOnly: true,
      className: 'form-control-plaintext'
    } : {
      readOnly: false,
      className: 'form-control'
    }

    if (inEdit) {
    	return (
				<div className={`form-group mb-2 row ${hidden}`} key={`${field.alias}-${field.field_id}`}>
					<label htmlFor={field.alias} className="col-sm-3 col-form-label">{field.label}</label>
          <div className="col-sm-9">
            <input type="text" {...readOnly} id={field.alias} name={field.alias} onChange={onChange} defaultValue={fieldValue} />
          </div>
        </div>
    	)
    } else {
			switch (field.type) {
				case 'url':
					return (
						<div className={`form-group mb-2 row ${hidden}`} key={`${field.alias}-${field.field_id}`}>
							<label htmlFor={field.alias} className="col-sm-3 col-form-label">{field.label}</label>
							<div className="col-sm-9">
								<a className="hidden-link form-control-plaintext" href={fieldValue} target="_blank">{fieldValue} <span className="text-muted"><MDIcons.MdExitToApp /></span></a>
							</div>
						</div>
						)
				default:
					return (
						<div className={`form-group mb-2 row ${hidden}`} key={`${field.alias}-${field.field_id}`}>
							<label htmlFor={field.alias} className="col-sm-3 col-form-label">{field.label}</label>
							<div className="col-sm-9">
				      	<input type="text" {...readOnly} id={field.alias} name={field.alias} onChange={onChange} defaultValue={fieldValue} />
				    	</div>
				    </div>
			    )
    		}
    	}
  }
}

FieldLayout.propTypes = {
	model: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  inEdit: PropTypes.bool.isRequired
}

export default FieldLayout
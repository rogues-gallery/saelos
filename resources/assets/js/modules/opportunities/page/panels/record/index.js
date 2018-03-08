import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOpportunity, getCustomFieldsForOpportunities, isStateDirty} from '../../../store/selectors';
import { fetchOpportunity, saveOpportunity } from '../../../service';
import _ from 'lodash';
import * as MDIcons from 'react-icons/lib/md'
import ReactQuill from 'react-quill'

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._toggleEdit = this._toggleEdit.bind(this)
    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._archive = this._archive.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      inEdit: false,
      formState: props.opportunity.originalProps
    }    
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.dispatch(fetchOpportunity(this.props.match.params.id))
    }
  }

  _archive() {

  }

  _delete () {

  }


  _toggleEdit() {
    this.setState({inEdit: !this.state.inEdit})
  }

  _submit() {
    this.props.dispatch(saveOpportunity(this.state.formState))

    this.setState({inEdit: false})
  }

  // @todo: Extract this crap. Mercy, this is embarrassing 
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let opportunityState = this.state.formState;

    // Special handling for custom field state
    if (this.state.formState.hasOwnProperty(name) === false) {
      let customField = this.props.customFields[_.split(name, '.')[1]];
      let opportunityCustomFieldIndex = _.findIndex(opportunityState.custom_fields, (o) => o.custom_field_id === customField.field_id);

      if (opportunityCustomFieldIndex >= 0) {
        opportunityState.custom_fields[contactCustomFieldIndex].value = value;
      } else {
        opportunityState.custom_fields.push({
          custom_field_id: customField.field_id,
          value: value
        });
      }
    } else {
      _.set(opportunityState, name, value);
    }

    this.setState({
      formState: opportunityState
    });
  }


  render() {
    const { opportunity } = this.props;

    const groups = _.groupBy(this.props.customFields, 'group');
    const inEdit = this.state.inEdit;
    const opportunityFields = Object.keys(groups).map(key => (
      <div className="card mb-1" key={opportunity.id + key}>
        <ul className="list-group list-group-flush">
          <li key={key} className="list-group-item">
            <div className="mini-text text-muted">{key}</div>
            {groups[key].map(f => {
              let fieldValue = _.get(opportunity, f.alias);

              if (typeof fieldValue === 'object') {
                fieldValue = _.get(fieldValue, 'name');
              }

              const hidden = typeof fieldValue === 'undefined' || fieldValue.length === 0 ? 'd-none' : '';
              const readOnly = !inEdit ? {
                readOnly: true,
                className: 'form-control-plaintext'
              } : {
                readOnly: false,
                className: 'form-control'
              }

              return (
                <div className={`form-group row ${hidden}`} key={f.alias}>
                  <label htmlFor={f.alias} className="col-sm-3 col-form-label">{f.label}</label>
                  <div className="col-sm-9">
                    <input type="text" {...readOnly} id={f.alias} name={f.alias} onChange={this._handleInputChange} defaultValue={fieldValue} />
                  </div>
                </div>
              )
            })
          }
          </li>
        </ul>
      </div>
    ));

    return (
      <main key={0} className="col main-panel px-3">
          <div className="toolbar border-bottom py-2">
            <button className="btn btn-primary mr-3 btn-sm list-inline-item"><span className="h5"><MDIcons.MdAllInclusive /></span></button>
            <button className="btn btn-link text-muted mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdPlaylistAdd /></span></button>
            <button className="btn btn-link text-muted mr-2 btn-sm list-inline-item"><span className="h3"><MDIcons.MdInput /></span></button>
            <button className="btn btn-link text-muted mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdInsertChart /></span></button>
            <button className="btn btn-link text-muted mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdDelete /></span></button>
            
            <div className="float-right text-right pt-2">
              <div className="mini-text text-muted">Assigned To</div>
              <div className="text-dark mini-text"><b>{opportunity.user.name}</b></div>
            </div>

          </div>
          
          {inEdit ?
            <span className="float-right py-3 mt-1">
              <a href="javascript:void(0);" onClick={this._toggleEdit}>Cancel</a>
              <span className="ml-2 btn btn-primary btn-sm" onClick={this._submit}>Save</span>
            </span>
            :
            <span className="float-right py-3 mt-1">
              <a href="javascript:void(0);" onClick={this._toggleEdit}>Edit</a>
            </span>
          }
        <h4 className="border-bottom py-3">
          {opportunity.name} <small className="ml-3"><button type="button" className="btn btn-outline-secondary btn-sm">+ ADD TAG</button></small>
        </h4>
        <div className="h-scroll">
          {opportunityFields}
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  opportunity: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  opportunity: getOpportunity(state, ownProps.match.params.id),
  customFields: getCustomFieldsForOpportunities(state),
  isDirty: isStateDirty(state)
}))(Record))
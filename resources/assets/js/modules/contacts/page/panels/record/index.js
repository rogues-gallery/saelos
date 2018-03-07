import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContact, getCustomFieldsForContacts } from '../../../store/selectors';
import { fetchContact } from '../../../service';
import _ from 'lodash';
import * as MDIcons from 'react-icons/lib/md'

class Record extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.dispatch(fetchContact(this.props.match.params.id))
    }
  }

  render() {
    const { contact } = this.props;
    const groups = _.groupBy(this.props.customFields, 'group');
    const contactFields = Object.keys(groups).map(key => (
      <li key={key} className="list-group-item">
        <div className="micro-text text-muted">{key}</div>
        {groups[key].map(f => {
          let fieldValue = _.get(this.props.contact, f.alias);

          if (typeof fieldValue === 'object') {
            fieldValue = _.get(fieldValue, 'name');
          }

          const hidden = typeof fieldValue === 'undefined' || fieldValue.length === 0 ? 'd-none' : '';

          return (
            <div className={`form-group row ${hidden}`} key={f.fieldId}>
              <label htmlFor={f.alias} className="col-sm-3 col-form-label">{f.label}</label>
              <div className="col-sm-9">
                <input type="text" readOnly className="form-control-plaintext" id={f.alias} name={f.alias} value={fieldValue} />
              </div>
            </div>
          )
        })
      }
      </li>
    ));

    return ([
      <main key={0} className="col-sm-3 col-md-5 offset-md-5">
          <div className="toolbar border-bottom py-1">
            <button type="button" className="btn btn-default mr-2">1</button>
            <button type="button" className="btn btn-default mr-2">2</button>
            <button type="button" className="btn btn-default mr-2">3</button>
            <button type="button" className="btn btn-default mr-2">4</button>
            <button type="button" className="btn btn-default mr-2">5</button>
            <div className="float-right text-right">
              <div className="micro-text text-muted">Assigned To</div>
              <div className="text-dark micro-text"><b>{contact.user.name}</b></div>
            </div>
          </div>
          <h3 className="border-bottom py-1">{contact.firstName} {contact.lastName}</h3>
        <div className="card h-scroll">
          <ul className="list-group list-group-flush">
              {contactFields}
          </ul>
        </div>
      </main>,
      <div key={1} className="col-sm-3 col-md-2 detail-panel border-left">
        <h5 className="border-bottom text-center mb-0 py-2">Contact Details</h5>
        <div className="h-scroll">
          <div className="card">
            <div className="card-header" id="headingSRI">
              <h6 className="mb-0" data-toggle="collapse" data-target="#collapseSRI" aria-expanded="true" aria-controls="collapseSRI">
                <MDIcons.MdArrowDropDownCircle /> Readiness Indicator
              </h6>
            </div>

            <div id="collapseSRI" className="collapse show" aria-labelledby="headingSRI">
              <div className="card-body border-bottom">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header" id="headingOpportunities">
              <h6 className="mb-0" data-toggle="collapse" data-target="#collapseOpportunities" aria-expanded="true" aria-controls="collapseOpportunities">
                <MDIcons.MdArrowDropDownCircle /> Opportunities
              </h6>
            </div>

            <div id="collapseOpportunities" className="collapse show" aria-labelledby="headingOpportunities">
              <div className="card-body border-bottom">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header" id="headingNotes">
              <h6 className="mb-0" data-toggle="collapse" data-target="#collapseNotes" aria-expanded="true" aria-controls="collapseNotes">
                <MDIcons.MdArrowDropDownCircle /> Notes
              </h6>
            </div>

            <div id="collapseNotes" className="collapse show" aria-labelledby="headingNotes">
              <div className="card-body border-bottom">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>
        </div>
      </div>
    ])
  }
}

Record.propTypes = {
  contact: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id),
  customFields: getCustomFieldsForContacts(state)
}))(Record))
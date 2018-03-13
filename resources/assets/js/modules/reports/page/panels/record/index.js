import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getReport, isStateDirty, getFirstReportId} from '../../../store/selectors';
import { fetchReport, saveReport } from '../../../service';
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
      formState: props.report.originalProps
    }    
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.dispatch(fetchReport(this.props.match.params.id))
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
    this.props.dispatch(saveReport(this.state.formState))

    this.setState({inEdit: false})
  }

  // @todo: Extract this crap. Mercy, this is embarrassing 
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let reportState = this.state.formState;

    // Special handling for custom field state
    if (this.state.formState.hasOwnProperty(name) === false) {
      let customField = this.props.customFields[_.split(name, '.')[1]];
      let reportCustomFieldIndex = _.findIndex(reportState.custom_fields, (o) => o.custom_field_id === customField.field_id);

      if (reportCustomFieldIndex >= 0) {
        reportState.custom_fields[contactCustomFieldIndex].value = value;
      } else {
        reportState.custom_fields.push({
          custom_field_id: customField.field_id,
          value: value
        });
      }
    } else {
      _.set(reportState, name, value);
    }

    this.setState({
      formState: reportState
    });
  }


  render() {
    const { report, isDirty } = this.props

    if (isDirty) {
      return <div>Loading</div>
    }

    let results = report.data ? report.data.data.map((row) => {
      return <ReportItem key={row.id} item={row} columns={report.columns} dataSource={report.data_source} />
    }) : [];

    let headerRow = report.columns.map((header, index) => {
        return <th key={index}>{header}</th>
    });

    return (
      <main key={0} className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item"><span className="h5"><MDIcons.MdAllInclusive /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdPlaylistAdd /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._initReportDownload}><span className="h3"><MDIcons.MdInput /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdInsertChart /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._archive}><span className="h2"><MDIcons.MdCheck /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdDelete /></span></button>
        </div>

        <h4 className="border-bottom py-3">
          {report.name} <small className="ml-3"><button type="button" className="btn btn-outline-secondary btn-sm">+ ADD TAG</button></small>
        </h4>
        <div className="h-scroll">
          <div className="card mb-1">
          <h6 className="card-title border-bottom p-4">
                {report.description}
              </h6>
            <div className="card-body">
              <table>
                  <thead>
                  <tr>
                      {headerRow}
                  </tr>
                  </thead>
                  <tbody>{results}</tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  report: PropTypes.object.isRequired
}


class ReportItem extends React.Component {

    render() {
        let cells = this.props.columns.map((column, index) => {
            if (/custom_fields/.test(column)) {
                let customFieldIndex = _.findIndex(this.props.item.custom_fields, (f) => 'custom_fields.' + f.custom_field_alias === column);
                column = 'custom_fields.' + customFieldIndex + '.value';
            }

            let cellValue = _.get(this.props.item, column);

            return <td key={index}>{cellValue}</td>
        });

        return (
            <tr>
                {cells}
            </tr>
        )
    }
}

ReportItem.propTypes = {
    item: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.string.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  report: getReport(state, ownProps.match.params.id || getFirstReportId(state)),
  isDirty: isStateDirty(state)
}))(Record))
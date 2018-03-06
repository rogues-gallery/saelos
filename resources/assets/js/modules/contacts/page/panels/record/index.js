import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContact } from '../../../store/selectors';
import { fetchContact } from '../../../service';

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

    return (
      <main className="col-sm-3 col-md-5 offset-md-5">
          <div className="toolbar border-bottom pt-1 pb-1">
            <button type="button" className="btn btn-default mr-2">1</button>
            <button type="button" className="btn btn-default mr-2">2</button>
            <button type="button" className="btn btn-default mr-2">3</button>
            <button type="button" className="btn btn-default mr-2">4</button>
            <button type="button" className="btn btn-default mr-2">5</button>
          </div>
          <h3 className="border-bottom pt-1 pb-1">{contact.firstName} {contact.lastName}</h3>
        <div className="card h-scroll">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="text-muted small pb-2">PROFESSIONAL</div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Company</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={contact.company.name} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Position</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={contact.position} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Work Phone</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Work Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="text-muted small pb-2">PERSONAL</div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="text-muted small pb-2">SOCIAL</div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="text-muted small pb-2">ADDITIONAL INFO</div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  contact: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id)
}))(Record))
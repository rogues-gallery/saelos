import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContact } from '../../../store/selectors';

class Record extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { contact } = this.props;

    return (
      <main className="col-sm-4 col-md-5 offset-md-5">
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
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
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
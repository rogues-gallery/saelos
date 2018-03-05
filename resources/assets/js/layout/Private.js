//import libs
import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col
} from 'reactstrap';

// import components
import Navigation from '../common/navigation'
import Footer from '../common/footer'

const PrivateLayout = ({ children }) => (
  <Container fluid={true}>
    <div className="row">
      <div className="col-sm-2 col-md-2 sidebar left pt-5 bg-inverse">
        <div className="fixed-top">
          <h3>User Stuff</h3>
        </div>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">Overview <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Reports</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Analytics</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Export</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>
      </div>

      <div className="col-sm-2 col-md-3 sidebar offset-md-2 pt-5">
        <div className="fixed-top">
          <form>
            <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{position:"relative", verticalAlign:"top"}} />
          </form>
        </div>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small>Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small>Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small>Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small>Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>
      </div>
      <main className="col-sm-4 col-md-5 offset-md-5 pt-5 h-scroll">
        <div className="fixed-top">
          <h1>Dashboard</h1>
          <h3>User Stuff</h3>
        </div>
        <section className="row text-center placeholders mt-5">
          <div className="col-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs=" width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
              <h4>Label</h4>
              <div className="text-muted">Something else</div>
          </div>
          <div className="col-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs=" width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
              <h4>Label</h4>
              <span className="text-muted">Something else</span>
          </div>
          <div className="col-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs=" width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
              <h4>Label</h4>
              <span className="text-muted">Something else</span>
          </div>
          <div className="col-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs=" width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
              <h4>Label</h4>
              <span className="text-muted">Something else</span>
          </div>
        </section>

        <h2>Section title</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
            <tr>
              <th>#</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1,001</td>
              <td>Lorem</td>
              <td>ipsum</td>
              <td>dolor</td>
              <td>sit</td>
            </tr>
            <tr>
              <td>1,002</td>
              <td>amet</td>
              <td>consectetur</td>
              <td>adipiscing</td>
              <td>elit</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>Integer</td>
              <td>nec</td>
              <td>odio</td>
              <td>Praesent</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>libero</td>
              <td>Sed</td>
              <td>cursus</td>
              <td>ante</td>
            </tr>
            <tr>
              <td>1,004</td>
              <td>dapibus</td>
              <td>diam</td>
              <td>Sed</td>
              <td>nisi</td>
            </tr>
            <tr>
              <td>1,005</td>
              <td>Nulla</td>
              <td>quis</td>
              <td>sem</td>
              <td>at</td>
            </tr>
            <tr>
              <td>1,006</td>
              <td>nibh</td>
              <td>elementum</td>
              <td>imperdiet</td>
              <td>Duis</td>
            </tr>
            <tr>
              <td>1,007</td>
              <td>sagittis</td>
              <td>ipsum</td>
              <td>Praesent</td>
              <td>mauris</td>
            </tr>
            <tr>
              <td>1,008</td>
              <td>Fusce</td>
              <td>nec</td>
              <td>tellus</td>
              <td>sed</td>
            </tr>
            <tr>
              <td>1,009</td>
              <td>augue</td>
              <td>semper</td>
              <td>porta</td>
              <td>Mauris</td>
            </tr>
            <tr>
              <td>1,010</td>
              <td>massa</td>
              <td>Vestibulum</td>
              <td>lacinia</td>
              <td>arcu</td>
            </tr>
            <tr>
              <td>1,011</td>
              <td>eget</td>
              <td>nulla</td>
              <td>Class</td>
              <td>aptent</td>
            </tr>
            <tr>
              <td>1,012</td>
              <td>taciti</td>
              <td>sociosqu</td>
              <td>ad</td>
              <td>litora</td>
            </tr>
            <tr>
              <td>1,013</td>
              <td>torquent</td>
              <td>per</td>
              <td>conubia</td>
              <td>nostra</td>
            </tr>
            <tr>
              <td>1,014</td>
              <td>per</td>
              <td>inceptos</td>
              <td>himenaeos</td>
              <td>Curabitur</td>
            </tr>
            <tr>
              <td>1,015</td>
              <td>sodales</td>
              <td>ligula</td>
              <td>in</td>
              <td>libero</td>
            </tr>
            </tbody>
          </table>
        </div>
      </main>
      <div className="col-sm-3 col-md-2 sidebar right pt-5">
        <div className="fixed-top">
          <h5>Contact Details</h5>
        </div>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">Second <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Reports</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Analytics</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Export</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">Nav item again</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">One more nav</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Another nav item</a>
          </li>
        </ul>
      </div>
    </div>
  </Container>
)

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateLayout

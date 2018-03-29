// import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import NavItem from './NavItem'
import { Link } from 'react-router-dom'
import routes from '../../routes/routes'
import * as MDIcons from 'react-icons/lib/md'

const CreateNav = ({ user }) => (
    <div className="dropdown show float-right">
      <Link to={'/'} className="btn btn-primary dropdown-toggle" role="button" id="quickCreateMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><MDIcons.MdAdd /></Link>
      <div className="dropdown-menu" aria-labelledby="quickCreateMenu">
        <Link to={'/contacts/new'} className="dropdown-item">Create Contact</Link>
        <Link to={'/companies/new'} className="dropdown-item">Create Company</Link>
        <Link to={'/opportunities/new'} className="dropdown-item">Create Opportunity</Link>
      </div>
    </div>
)

CreateNav.propTypes = {
  user: PropTypes.object.isRequired
}

export default CreateNav


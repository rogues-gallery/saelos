// import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import NavItem from './NavItem'
import { Link } from 'react-router-dom'
import routes from "../../routes/routes"
import * as MDIcons from 'react-icons/lib/md'

const CreateConfigNav = ({ user }) => (
    <div className="dropdown show float-right">
      <Link to={'/'} className="btn btn-primary dropdown-toggle" role="button" id="quickCreateConfigMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><MDIcons.MdAdd /></Link>
      <div className="dropdown-menu" aria-labelledby="quickCreateConfigMenu">
        <Link to={'/config/fields/new'} className="dropdown-item">Create Field</Link>
        <Link to={'/config/stages/new'} className="dropdown-item">Create Stage</Link>
        <Link to={'/config/statuses/new'} className="dropdown-item">Create Status</Link>
        <Link to={'/config/team/new'} className="dropdown-item">Create Team</Link>
        <Link to={'/config/users/new'} className="dropdown-item">Create User</Link>
      </div>
    </div>
)

CreateConfigNav.propTypes = {
  user: PropTypes.object.isRequired
}

export default CreateConfigNav


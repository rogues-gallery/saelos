import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Button = ({to, classes, children}) => (
    <NavLink to={to ? to : ''} className={classes ? classes + ' button' : 'button'}>
        {children}
    </NavLink>
);

Button.propTypes = {
    to: PropTypes.string,
    classes: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default Button;
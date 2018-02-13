import React from 'react';
import PropTypes from 'prop-types';

const Box = ({classes, title, children}) => (
    <div className={classes ? classes + ' box' : 'box'}>
        {title ? <h3>{title}</h3> : ''}

        {children}
    </div>
);

Box.propTypes = {
    classes: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default Box;
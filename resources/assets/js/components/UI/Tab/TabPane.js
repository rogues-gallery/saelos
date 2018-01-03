import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TabPane extends Component {
    render() {
        let  active = this.props.active || false;

        if (active) {
            return this.props.children;
        } else {
            return null;
        }
    }
}

TabPane.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}
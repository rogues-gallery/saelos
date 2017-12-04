import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Progress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAvatar: props.showAvatar || false,
            size: props.size,
            description: props.description
        }
    }

    render() {
        return (
            <div className="progress-wrapper">
                {this.state.showAvatar ? <div className="avatar">&nbsp;</div> : '' }

                <div className="progress-content">
                    <div className="progress">
                        <div className="progress-inner" style={{width: this.state.size + '%'}} />
                    </div>

                    {this.state.description ?
                        <a className="progress-description">
                            {this.state.description}
                        </a> : ''}
                </div>
            </div>
        );
    }
}

Progress.propTypes = {
    size: PropTypes.number.isRequired,
    showStatus: PropTypes.bool,
    description: PropTypes.string,
    showAvatar: PropTypes.bool
}

export class ProgressWrapper extends Component {
    render() {
        return (
            <div className="progress-grid">
                {this.props.children}
            </div>
        )
    }
}

ProgressWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

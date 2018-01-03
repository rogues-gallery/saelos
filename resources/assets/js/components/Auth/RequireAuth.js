import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                window.location.href = '/login';
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                window.location.href = '/login';
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect((store) => {
        return {
            authenticated: store.authState.authenticated
        };
    })(Authentication);
}
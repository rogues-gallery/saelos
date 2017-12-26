import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from "./Filter";

export default class Loading extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: props.type || 'default'
        }
    }

    render() {
        let loadingContent = '';

        switch(this.state.type) {
            case 'contacts':

                let avatars = [
                    '/img/tmp/user-1.jpg',
                    '/img/tmp/user-2.jpg',
                    '/img/tmp/user-3.jpg',
                    '/img/tmp/user-4.jpg',
                    '/img/tmp/user-5.jpg',
                    '/img/tmp/user-6.jpg',
                    '/img/tmp/user-7.jpg',
                    '/img/tmp/user-8.jpg',
                    '/img/tmp/user-9.jpg',
                    '/img/tmp/user-10.jpg',
                ];

                let results = avatars.map(function(avatar, index) {
                    return <div key={index} className="loading-item">
                        <div className="loading-animated-background">
                            <div className="loading-masker header-top" />
                            <div className="loading-masker header-left" />
                            <div className="loading-masker header-right" />
                            <div className="loading-masker header-bottom" />
                            <div className="loading-masker subheader-left" />
                            <div className="loading-masker subheader-right" />
                            <div className="loading-masker subheader-bottom" />
                            <div className="loading-masker content-top" />
                        </div>
                    </div>;
                });


                loadingContent = 

                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Stage</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="loading-wrapper">
                            {results}
                        </div>
                    </div>

                break;
            default:
                loadingContent = <div>Loading</div>;
                break;
        }

        return (
            <div className="content-inner">
                {loadingContent}
            </div>
        );
    }
}

Loading.propTypes = {
    type: PropTypes.string
}

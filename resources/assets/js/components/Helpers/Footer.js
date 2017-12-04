import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        let date = new Date();

        return (
            <div className="footer">
                <div className="footer-left">
                    &copy; {date.getFullYear()} Mautic, Inc.
                </div>

                <div className="footer-right">
                    <ul>
                        <li><a>FAQ</a></li>
                        <li><a>Support</a></li>
                        <li><a>Knowledge Base</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

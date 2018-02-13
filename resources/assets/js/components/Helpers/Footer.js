import React from 'react';

const Footer = () => (
    <div className="footer">
        <div className="footer-left">
            &copy; {(new Date()).getFullYear()} dbhurley.
        </div>

        <div className="footer-right">
            <ul>
                <li><a>FAQ</a></li>
                <li><a>Support</a></li>
                <li><a>Knowledge Base</a></li>
            </ul>
        </div>
    </div>
);

export default Footer;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExamplePanel from '../Panels/ExamplePanel';
import Footer from '../Helpers/Footer';
import PageTitle from '../Helpers/PageTitle';
import Sidebar from '../Helpers/Sidebar';
import Toolbar from '../Helpers/Toolbar';
import { NotificationContainer } from 'react-notifications';
import ContactPanel from '../Panels/ContactPanel';

export default class Backend extends Component {
    render() {
        return(
            <div className="page-inner">
                <Toolbar />
                <Sidebar />

                <div className="main">
                    <PageTitle />

                    <div className="content">
                        {this.props.children}
                    </div>

                    <Footer />
                </div>
                <ExamplePanel/>
                <NotificationContainer />
                <ContactPanel />
            </div>
        );
    }
}

Backend.propTypes = {
  children: PropTypes.node.isRequired
}


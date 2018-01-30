import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PageHeader extends Component {
    render() {
        let greeting = ((hour) => {
            switch (true) {
                case (hour < 12):
                    return 'Good morning';
                case (hour < 18):
                    return 'Good afternoon';
                default:
                    return 'Good evening';
            }
        })((new Date).getHours());


        return (
          <div className="page-header">
              <div className="page-header-inner">
                  <div className="page-header-content">
                      <h1>{greeting} {this.props.user.name}!</h1>
                      <p>
                          Today you have <a href="#">10 calls to make</a>. You should create 2 opportunities to stay on track for the quarter.
                      </p>

                      <div className="page-header-info">
                          <span>Your VECTOR is<br/><h2>{this.props.user.vector}</h2></span>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}


export default connect((store) => {
    return {
        user: store.authState.user
    }
})(PageHeader)

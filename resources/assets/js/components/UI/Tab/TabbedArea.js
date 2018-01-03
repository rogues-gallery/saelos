import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TabbedArea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: this.props.activeIndex || 0
        };
    }

    render() {
        let self = this;
        let tabNodes = _.map(this.props.children, function (child, index) {
            let className = self.state.activeIndex === index ? 'active' : '';
            let onClick = child.props.onClick || self._handleClick.bind(self, index);

            return (
                <div key={index} className={className + " tab user-action-box"} onClick={onClick}>
                    <i className="md-icon">{child.props.icon}</i><br />
                    {child.props.title}
                </div>
            );
        });

        let contentNodes = _.map(this.props.children, function (child, index) {
            if(self.state.activeIndex === index) {
                return (
                    <div key={index} className="tab-pane">
                        {child.props.children}
                    </div>
                );
            }
        });

        return (
            <div className="tabbed-area">
                <div className="panel-user-available-actions">
                    {tabNodes}
                </div>
                <section>
                    {contentNodes}
                </section>
            </div>
        );
    }

    _handleClick(index) {
        this.setState({
            activeIndex: index
        });
    }
}

TabbedArea.propTypes = {
    children: PropTypes.node.isRequired
}
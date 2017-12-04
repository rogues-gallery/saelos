import React, { Component } from 'react';

import { Panel, PanelList, PanelListItem, PanelListTitle, PanelListWrapper } from '../UI/Panel/index';

export default class ExamplePanel extends Component {
    _toggleBodyClass() {
        document.querySelector('body').classList.toggle('content-side-open')
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="content-side-overlay side-overlay" />

                <div className="content-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-avatar" style={{
                                backgroundImage: 'url("/img/tmp/user-8.jpg")'
                            }}>&nbsp;</div>

                            <div className="panel-user-content">
                                <div className="panel-user-name">John Bohn</div>
                                <div className="panel-user-subtitle">Copywriter</div>

                                <div className="panel-user-action" onClick={this._toggleBodyClass.bind(this)}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                        </div>

                        <PanelListWrapper>
                            <PanelListTitle>Todays Tasks</PanelListTitle>

                            <PanelList>
                                <PanelListItem>Contact <a>John Doe</a> for website wireframes.</PanelListItem>
                                <PanelListItem>Make the code reviews for project <a>Awesome Startup</a>.</PanelListItem>
                                <PanelListItem>Discuss about new scrum workflow to your colleagues.</PanelListItem>
                            </PanelList>

                            <PanelListTitle>Sticky Notes</PanelListTitle>

                            <PanelList>
                                <PanelListItem>Here you can find <a>all passwords</a>.</PanelListItem>
                                <PanelListItem>All <a>contact information</a> are stored here.</PanelListItem>
                                <PanelListItem>Never make production deployment <a>at Friday</a>.</PanelListItem>
                                <PanelListItem>General shared terminals commands list is available <a>in notes</a>.</PanelListItem>
                            </PanelList>
                        </PanelListWrapper>
                    </Panel>
                    </div>
            </div>
        );
    }
}

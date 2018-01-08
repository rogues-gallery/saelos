import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import { actionCreators } from "../../actions";
import { TabbedArea, TabPane } from '../UI/Tab';
import fetch from '../../utils/fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ContactContactPanel extends Component {
    constructor(props) {
        super(props);

        this._initPhoneCall = this._initPhoneCall.bind(this);
        this._sendEmail = this._sendEmail.bind(this);
    }

    _togglePanelClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-contact-panel-open');
    }

    _initPhoneCall() {
        actionCreators.callContact({
            id: this.props.contact.id,
            recipient: this.props.user.phone
        });
    }

    _sendEmail(e) {
        e.preventDefault();

        actionCreators.emailContact({
            id: this.props.contact.id,
            emailContent: document.getElementById('email-content').value
        });

        this._togglePanelClass();
    }

    _submitScore(e) {
        e.preventDefault();
        //
        // actionCreators.submitScore({
        //
        // });
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="contact-contact-overlay side-overlay" onClick={this._togglePanelClass.bind(this)} />
                <div className="contact-contact-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                {this.props.contact.first_name ? <div className="panel-user-name">{this.props.contact.first_name} {this.props.contact.last_name}</div> : ''}

                                {this.props.contact.company ? <div className="panel-user-subtitle">{this.props.contact.company.name}</div> : ''}

                                <div className="panel-user-action" onClick={this._togglePanelClass.bind(this)}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                            <div className="panel-user-score">
                                <Progress size={0}/>
                            </div>
                        </div>

                        <TabbedArea>
                            <TabPane title="Email" icon="email">
                                <div>
                                    <form>
                                        <input className="form-control" type="text" name="subject" placeholder="Subject" />
                                        <textarea placeholder="Email content" className="form-control" name="content" id="email-content" style={{width:"100%", height: "300px"}}/>
                                        <br />
                                        <button className="button button-primary" onClick={this._sendEmail}>Send</button>
                                    </form>
                                </div>
                            </TabPane>
                            <TabPane title="SMS" icon="sms">
                                <div>Coming Soon</div>
                            </TabPane>
                            <TabPane title="Phone" icon="phone">
                                <div>
                                    <p>Click the button below to initiate a call to this user. After the call
                                    is completed, please give your Rep Sentiment score and submit.</p>

                                    <button onClick={this._initPhoneCall} className="button button-primary">Init Phone Call</button>
                                    <button onClick={this._submitScore} className="button button-primary">Submit Sentiment Score</button>

                                </div>
                            </TabPane>
                        </TabbedArea>
                    </Panel>
                </div>
            </div>
        );
    }
}

ContactContactPanel.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        user: store.authState.user
    }
})(ContactContactPanel);
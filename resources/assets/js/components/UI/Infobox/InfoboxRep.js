import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Money } from 'react-format';
import RepPanel from "../../Panels/RepPanel";
import Gravatar from 'react-gravatar';

export default class InfoboxRep extends Component {
    _togglePanelClass() {
        let itemClass = 'div.rep-item-' + this.props.rep.id;

        document.querySelector(itemClass).classList.toggle('rep-panel-open');
    }

    render() {
        let itemClass = 'infobox rep-item-' + this.props.rep.id;

        if (typeof this.props.rep.deals === 'undefined') {
            this.props.rep.deals = [];
        }

        let totalValue = _.sum(_.map(this.props.rep.deals, 'amount'));

        return (
            <div className={itemClass}>
                <div className="infobox-inner">
                    <div className="infobox-header">
                        <div className="infobox-header-content" onClick={this._togglePanelClass.bind(this)}>
                            <div className="avatar">
                                <Gravatar email={this.props.rep.email} size={44} />
                            </div>
                            <h3>{this.props.rep.name}</h3>
                        </div>
                    </div>

                    <div className="infobox-meta">
                        <div className="flex-row-nospace">
                            <div>
                                <span>Pipeline</span>
                                <strong><Money>{totalValue}</Money></strong>
                            </div>
                        </div>
                    </div>

                    <RepPanel rep={this.props.rep} />
                </div>
            </div>
        );
    }
}

InfoboxRep.propTypes = {
    rep: PropTypes.object.isRequired
};

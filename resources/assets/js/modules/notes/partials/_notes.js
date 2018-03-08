import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import moment from 'moment'
import Note from '../Note'
import TextTruncate from 'react-text-truncate'
import { Modal, ModalBody } from 'reactstrap'

class Notes extends React.Component {
  constructor(props) {
    super(props)

    this._toggleModal = this._toggleModal.bind(this)

    this.state = {
      modal: false
    }
  }

  _toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    const { notes } = this.props

    return (
      <div className="card">
        <div className="card-header" id="headingNotes">
          <a href="javascript:void(0);" className="float-right">New</a>
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseNotes" aria-expanded="true" aria-controls="collapseNotes">
            <MDIcons.MdKeyboardArrowDown /> Notes <span className="text-muted font-weight-normal">({notes.length})</span>
          </h6>
        </div>

        <div id="collapseNotes" className="collapse show mh-200" aria-labelledby="headingNotes">
          <div className="list-group border-bottom">
            {notes.map(note => <Item key={note.id} note={note} />)}
          </div>
        </div>
      </div>
    )}
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired
}

class Item extends React.Component {
  constructor(props) {
    super(props)

    this._toggleModal = this._toggleModal.bind(this)

    this.state = {
      modal: false
    }
  }

  _toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    const note = new Note(this.props.note)

    return (
      <div>
        <div onClick={this._toggleModal} className="list-group-item list-group-item-action align-items-start">
          <span className="mini-text text-muted float-right mt-1">{note.created_at.fromNow()}</span>
          <p className="font-weight-bold">{note.user.name}</p>
          <div className="note"><TextTruncate line={3} truncateText="..." text={note.note}/></div>
        </div>
        <Modal isOpen={this.state.modal} fade={false} toggle={this._toggleModal} autoFocus={false} className="noteModal">
          <ModalBody>
            <span className="mini-text text-muted mt-1 float-right">{note.created_at.fromNow()}</span>
            <p className="font-weight-bold">{note.user.name}</p>
            <div className="pt-2">{note.nl2br(note.note)}</div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
}

export default Notes
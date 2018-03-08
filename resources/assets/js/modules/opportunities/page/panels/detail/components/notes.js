import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import moment from 'moment'
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
    const { notes, dispatch } = this.props;

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
        {notes.map(note => <Note key={note.id} note={note} dispatch={dispatch} toggleModal={this._toggleModal} modalState={this.state.modal} />)}
      </div>
    </div>
  </div>
)}
}

const Note = ({ note, dispatch, toggleModal, modalState}) => {
  return (
    <div>
      <div onClick={toggleModal} className="list-group-item list-group-item-action align-items-start">
        <span className="mini-text text-muted float-right mt-1">{moment(note.createdAt).fromNow()}</span>
        <p className="font-weight-bold">{note.user.name}</p>
        <div className="note"><TextTruncate line={3} truncateText="..." text={note.note} /></div>
      </div>
      {modalState ?
      <Modal isOpen={modalState} fade={false} toggle={toggleModal} autoFocus={false} className="noteModal">
        <ModalBody>
          {note.note}
        </ModalBody>
      </Modal>
      : null }
    </div>
  );
}


Notes.propTypes = {
  notes: PropTypes.array.isRequired
}

export default Notes
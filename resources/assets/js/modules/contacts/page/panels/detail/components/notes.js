import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import moment from 'moment'

class Notes extends React.Component {
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
        {notes.map(note => <Note key={note.id} note={note} dispatch={dispatch} />)}
      </div>
    </div>
  </div>
)}
}

const Note = ({ note, dispatch }) => {
  const openNoteRecord = (id) => {
    // dispatch(fetchNote(contact.id))
    // router.history.push(`/contacts/${id}`)
  }

  return (
    <div onClick={() => openNoteRecord(contact.id)} className="list-group-item list-group-item-action align-items-start">
      <span className="mini-text text-muted float-right mt-1">{moment(note.createdAt).fromNow()}</span>
      <p className="font-weight-bold">{note.user.name}</p>
      <div className="note">{note.note}</div>
      
    </div>
  );
}


Notes.propTypes = {
  notes: PropTypes.array.isRequired
}

export default Notes
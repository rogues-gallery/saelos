import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import Note from '../Note'
import TextTruncate from 'react-text-truncate'
import Dropzone from 'react-dropzone'
import { saveNote, deleteNote, uploadFile } from '../service'
import ContentEditable from 'react-contenteditable'

class Notes extends React.Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._submit = this._submit.bind(this)
    this._onDrop = this._onDrop.bind(this)
    this._togglePrivate = this._togglePrivate.bind(this)

    const newNote = new Note({
      entity_type: this.props.entityType,
      entity_id: this.props.entityId,
      user_id: this.props.user.id,
      private: 0,
      document: {}
    })

    this.state = {
      formState: newNote.originalProps
    }
  }

  _handleInputChange(event) {
    const { target } = event

    this.state.formState.note = target.value
  }

  _submit() {
    this.props.dispatch(saveNote(this.state.formState))
    this.state.formState.note = ''
  }

  _togglePrivate(e) {
    const { formState } = this.state

    // We're toggling state, so if it is private, change
    formState.private = formState.private ? 0 : 1

    this.setState({
      formState
    })
  }

  _onDrop(acceptedFiles, rejectedFiles) {
    const { formState } = this.state

    formState.document = acceptedFiles[0]

    this.setState({
      formState
    })
  }

  render() {
    const { notes } = this.props
    const { document } = this.state.formState

    return (
      <div className="card">
        <div className="card-header" id="headingNotes">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseNotes" aria-expanded="true" aria-controls="collapseNotes">
            <MDIcons.MdKeyboardArrowDown /> Notes <span className="text-muted font-weight-normal">({notes.length})</span>
          </h6>
        </div>
        <div className="newNote py-2 px-3 border-bottom">
          <p className="font-weight-bold">
            {this.props.user.name}
            <span
              className={`float-right ${this.state.formState.private ? '' : 'text-muted'}`}
              onClick={this._togglePrivate}
            >
              <MDIcons.MdLockOutline />
            </span>
          </p>
          <ContentEditable className="fh-5 my-2 p-1 border rounded" onChange={this._handleInputChange} html={this.state.formState.note} />
          <React.Fragment>
            <Dropzone
              onDrop={this._onDrop}
              className="document-dropzone"
              activeClassName="active"
              acceptClassName="accept"
              rejectClassName="reject"
              accept="image/jpeg, image/jpg, text/csv, application/json, application/pdf, application/zip, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword"
            >
              <button className="btn btn-link btn-xs"><span className="h5"><MDIcons.MdAttachFile /></span></button>
            </Dropzone>
            <div className="text-center">
              <button className="btn btn-link btn-sm">Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={this._submit}>Create</button>
            </div>
          </React.Fragment>
          {document ?
            <div className="attached-file">
              <a target="_blank" href={document.preview}>{document.name}</a>
            </div>
            : ''}
        </div>

        <div id="collapseNotes" className="collapse show mh-200" aria-labelledby="headingNotes">
          <div className="list-group border-bottom">
            {notes.map(note => <Item key={note.id} note={note} user={this.props.user} dispatch={this.props.dispatch} />)}
          </div>
        </div>
      </div>
    )}
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.number,
  user: PropTypes.object.isRequired
}

class Item extends React.Component {
  constructor(props) {
    super(props)

    this._toggleOpenState = this._toggleOpenState.bind(this)
    this._toggleEditState = this._toggleEditState.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._submit = this._submit.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      open: false,
      inEdit: false,
      formState: props.note.originalProps
    }
  }

  _toggleOpenState() {
    if (!this.state.inEdit) {
      this.setState({
        open: !this.state.open
      })
    }
  }

  _toggleEditState(event) {
    event.stopPropagation()

    this.setState({
      inEdit: !this.state.inEdit
    })
  }

  _delete() {
    this.props.dispatch(deleteNote(this.state.formState))
  }

  _handleInputChange(event) {
    const { target } = event

    this.state.formState.note = target.value
  }

  _submit() {
    this.props.dispatch(saveNote(this.state.formState))

    this.setState({inEdit: false})
  }

  render() {
    const { note } = this.props

    // don't show private notes for other users
    if (note.private && note.user.id !== this.props.user.id) {
      return ''
    }

    return (
      <div className={`notes-partial ${this.state.inEdit ? 'notes-partial-edit' : '' }`}>
        <div onClick={this._toggleOpenState} className={`list-group-item list-group-item-action align-items-start`}>
          <span className="mini-text text-muted float-right mt-1">{note.created_at.fromNow()}</span>
           {note.private ?
             <span className="in-margin float-left text-muted"><MDIcons.MdLockOutline /></span>
             :
             '' }
          <p className="font-weight-bold">{note.user.name}</p>
          <div className="note">
            {this.state.open ?
              <div className="note-content nl2br">
                {this.state.inEdit ?
                  <div className="list-group-item-edit">
                    <ContentEditable className="fh-5 my-2 p-1 border rounded" name="note" onChange={this._handleInputChange} html={note.note} />
                    {/* @TODO: Private & File Uploads */}
                    <span className="mini-text my-2">
                      <a href="javascript:void(0)" className="text-muted pr-1" onClick={this._toggleEditState}>Cancel</a>
                      <a href="javascript:void(0)" onClick={this._submit}>Save</a>
                    </span>
                  </div>
                  :
                  <div className="list-group-item-view">
                    {note.note}
                    <a href="javascript:void(0)" className="mini-text d-block" onClick={this._delete}>Delete</a>
                    <a href="javascript:void(0)" className="mini-text d-block" onClick={this._toggleEditState}>Edit</a>
                  </div>
                }
              </div>
             :
              <TextTruncate line={3} truncateText="..." text={note.note}/>
            }
          </div>
          {note.document.id ?
            <div className="attached-file">
              <a target="_blank" href={`/uploads/${note.document.filename}`}>{note.document.name}</a>
            </div>
            : ''}
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  user: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Notes

import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import Note from '../Note'
import TextTruncate from 'react-text-truncate'
import _ from 'lodash'
import Dropzone from 'react-dropzone'
import { saveNote, deleteNote, uploadFile } from '../service'
import ContentEditable from 'react-contenteditable'

class Notes extends React.Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._submit = this._submit.bind(this)
    this._onDrop = this._onDrop.bind(this)

    const newNote = new Note({
      entity_type: this.props.entityType,
      entity_id: this.props.entityId,
      user: this.props.user
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
  }

  _onDrop(acceptedFiles, rejectedFiles) {
    let uploadUrl
    const { entity_type, entity_id } = this.state.formState

    switch(entity_type) {
      case 'App\\Opportunity':
        uploadUrl = `/opportunities/${entity_id}/notes`
        break
      case 'App\\Contact':
        uploadUrl = `/contacts/${entity_id}/notes`
        break
      case 'App\\Company':
        uploadUrl = `/companies/${entity_id}/notes`
        break
    }

    if (!uploadUrl) {
      return
    }

    console.log(acceptedFiles);

    uploadFile(uploadUrl, acceptedFiles[0], 'document')
      .then((response) => {
        console.log(response)
      })
  }

  render() {
    const { notes } = this.props

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
            <span className="text-muted float-right"><MDIcons.MdLockOutline /></span>
          </p>
          <ContentEditable className="fh-5 my-2 p-1 border rounded" onChange={this._handleInputChange} />
          <React.Fragment>
            <Dropzone
              onDrop={this._onDrop}
              className="document-dropzone"
              activeClassName="active"
              acceptClassName="accept"
              rejectClassName="reject"
              accept="image/jpeg, image/jpg, text/csv, application/json, application/pdf, application/zip, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword"
            >
              <button className="position-fixed btn btn-link btn-xs"><span className="h5"><MDIcons.MdAttachFile /></span></button>
            </Dropzone>
            <div className="text-center">
              <button className="btn btn-link btn-sm">Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={this._submit}>Create</button>
            </div>
          </React.Fragment>
        </div>

        <div id="collapseNotes" className="collapse show mh-200" aria-labelledby="headingNotes">
          <div className="list-group border-bottom">
            {notes.map(note => <Item key={note.id} note={note} dispatch={this.props.dispatch} />)}
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

    return (
      <div className={`notes-partial ${this.state.inEdit ? 'notes-partial-edit' : '' }`}>
        <div onClick={this._toggleOpenState} className="list-group-item list-group-item-action align-items-start">
          <span className="mini-text text-muted float-right mt-1">{note.created_at.fromNow()}</span>
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
                    <a href="javascript:void(0)" className="mini-text d-block" onClick={this._toggleEditState}>Edit</a>
                  </div>
                }
              </div>
             :
              <TextTruncate line={3} truncateText="..." text={note.note}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Notes
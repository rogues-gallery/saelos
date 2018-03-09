import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import Note from '../Note'
import TextTruncate from 'react-text-truncate'
import _ from 'lodash'
import { saveNote, deleteNote } from '../service'
import ContentEditable from 'react-contenteditable'

class Notes extends React.Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._submit = this._submit.bind(this)

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
        <div className="newNote">
          <h2>{this.props.user.name}</h2>
          <ContentEditable onChange={this._handleInputChange} />
          <div className="btn-group">
            <button className="btn btn-outline-light">Cancel</button>
            <button className="btn btn-primary" onClick={this._submit}>Create</button>
          </div>
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
  entityId: PropTypes.number.isRequired,
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
      <div>
        <div onClick={this._toggleOpenState} className="list-group-item list-group-item-action align-items-start">
          <span className="mini-text text-muted float-right mt-1">{note.created_at.fromNow()}</span>
          <p className="font-weight-bold">{note.user.name}</p>
          <div className="note">
            {this.state.open ?
              <div className="note-content nl2br">
                {this.state.inEdit ?
                  <div>
                    <ContentEditable name="note" onChange={this._handleInputChange} html={note.note} />
                    {/* @TODO: Private & File Uploads */}
                    <span className="float-right mini-text my-2">
                      <a href="javascript:void(0)" className="text-muted" onClick={this._toggleEditState}>Cancel</a>
                      &nbsp;
                      <a href="javascript:void(0)" onClick={this._submit}>Save</a>
                    </span>
                  </div>
                  :
                  <div>
                    {note.note}
                    <a href="javascript:void(0)" className="mini-text float-right" onClick={this._toggleEditState}>Edit</a>
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
import CreateNote from "./CreateNote";
import React, { Component } from "react";
import "./Note.css";
import axios from "axios";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      day: props.day,
      notes: props.notes,
    };
  }

  // componentDidMount() {
  //   axios
  //     .get(`/api/notes/${this.state.userId}/${this.state.day}`)
  //     .then((res) => {
  //       this.setState({
  //         notes: res.data,
  //       });
  //     });
  // }

  render = () => {
    console.log(this.state.notes);
    return (
      <div className="notes">
        {this.state.notes.map((note, i) => (
          <div className="note" key={i}>
            <h1 className="note_h1">{note.title}</h1>
            <p>{note.content}</p>
            <button
              id="delete_btn"
              className={note.id}
              onClick={this.handleDelete}
            >
              Del
            </button>
          </div>
        ))}
        <CreateNote handleSubmit={this.handleSubmit} />
      </div>
    );
  };
}

export default Note;

import React, { Component } from "react";
import CreateNote from "./CreateNote";
import "./Note.css";
import axios from "axios";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      notes: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/notes/${this.state.userId}`).then((res) =>
      this.setState({
        notes: res.data,
      })
    );
  }

  handleDelete = (event) => {
    event.preventDefault();
    axios.delete(`/api/notes/${event.target.className}`).then(() => {
      axios.get(`/api/notes/${this.state.userId}`).then((res) =>
        this.setState({
          notes: res.data,
        })
      );
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    data["userId"] = this.state.userId;
    axios.post("/api/notes", data).then((res) =>
      this.setState({
        notes: [...this.state.notes, res.data.rows[0]],
      })
    );
  };

  render = () => {
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

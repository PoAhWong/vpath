import Note from "./Note";
import "./Main.css";
import Progress from "./Progress";
import React, { Component } from "react";
import axios from "axios";
import CreateNote from "./CreateNote";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      createDate: "",
      length: "",
      day: 1,
      notes: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/api/path/${this.state.userId}`)
      .then((res) =>
        this.setState({
          createDate: res.data.create_date,
          length: res.data.length,
          day: res.data.length + 1,
        })
      )
      .then(() =>
        axios
          .get(`/api/notes/${this.state.userId}/${this.state.day}`)
          .then((res) => {
            this.setState({
              notes: res.data,
            });
          })
      );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    data["userId"] = this.state.userId;
    data["day"] = this.state.day;
    axios.post("/api/notes", data).then((res) =>
      this.setState({
        notes: [...this.state.notes, res.data.rows[0]],
      })
    );
  };

  handleDelete = (event) => {
    event.preventDefault();
    axios.delete(`/api/notes/${event.target.className}`).then(() => {
      axios
        .get(`/api/notes/${this.state.userId}/${this.state.day}`)
        .then((res) =>
          this.setState({
            notes: res.data,
          })
        );
    });
  };

  handleChangeDate = (event) => {
    console.log(event.target.id);
    const userId = this.state.userId;
    const day = event.target.id;
    this.setState({
      day: day,
    });
    axios.get(`/api/notes/${this.state.userId}/${day}`).then((res) =>
      this.setState({
        notes: res.data,
      })
    );
  };

  render = () => {
    return (
      <div className="main">
        <h2 className="day_count">Day{this.state.day}</h2>
        <Progress
          userId={this.state.userId}
          createDate={this.state.createDate}
          length={this.state.length}
          handleChangeDate={this.handleChangeDate}
        />
        {/* <Note userId={this.state.userId} notes={this.state.notes} /> */}
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
      </div>
    );
  };
}

export default Main;

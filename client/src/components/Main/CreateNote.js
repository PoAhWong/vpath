function CreateNote({ handleSubmit }) {
  return (
    <form action="" className="note" id="form" onSubmit={handleSubmit}>
      <input id="create_title" name="title" placeholder="Title" />
      <textarea
        id="create_content"
        name="content"
        placeholder="Take a note..."
        cols="30"
        rows="10"
      ></textarea>
      <button id="create_btn" className="create_note_btn">
        Add
      </button>
    </form>
  );
}

export default CreateNote;

const express = require("express");
const Note = require("../models/note");

const router = express.Router();

router.get("/:userId/:day", (req, res) => {
  console.log(req.params);
  const { userId, day } = req.params;
  Note.findNotesByDay(userId, day).then((user) => {
    console.log(user);
    return res.json(user);
  });
});

// router.get("/", (req, res) => {
//   console.log(req);
//   Note.findNotesByDate(id, dateDiff).then((dbRes) => res.json(dbRes));
// });

router.post("/", (req, res) => {
  const { userId, title, content, day } = req.body;
  Note.create(userId, title, content, day).then((dbRes) => res.json(dbRes));
});

router.put("/", (req, res) => {
  const { id, title, content } = req.body;
  Note.update(id, title, content).then((id) => res.json(id));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Note.delete(id).then(() => {
    res.json("finished");
  });
});

module.exports = router;

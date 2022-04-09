const express = require("express");
const Note = require("../models/note");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/:userId", (req, res) => {
  Note.findAllByUserId(req.params.userId).then((user) => {
    console.log(user);
    return res.json(user);
  });
});

router.post("/", (req, res) => {
  const { userId, title, content } = req.body;
  Note.create(userId, title, content).then((dbRes) => res.json(dbRes));
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

const express = require("express");
const Path = require("../models/path");
const router = express.Router();

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  Path.getCreateDate(userId).then((dbRes) => res.json(dbRes));
});

router.post("/:userId", (req, res) => {
  const userId = req.params.userId;
  Path.create(userId).then((dbRes) => res.json(dbRes));
});

module.exports = router;

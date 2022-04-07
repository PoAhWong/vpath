const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

// router.get("/", (req, res) => {
//     if (req.session.username) {
//       res.status(200).json({ username: req.session.username, userId: req.session.userID});
//     } else {
//       res.status(401).json({ message: "You are not logged in" });
//     }
//   });

router.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    if (user) {
      const isValidPassword = bcrypt.compareSync(
        password,
        user.password_digest
      );
      if (isValidPassword) {
        req.session.userID = user.id;
        req.session.username = user.name;
        res.status(200).json({ userName: user.name, userId: user.id });
      } else {
        res.status(422).json({ message: "invalid email or password" });
      }
    } else {
      res.status(422).json({ message: "invalid email or password" });
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy();
  res.json({ message: "successfully logged out" });
});

module.exports = router;

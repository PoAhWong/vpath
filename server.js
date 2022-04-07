const express = require("express");
const path = require("path");

const dotenv = require("dotenv").config();

const logger = require("./middlewares/logger");
const sessions = require("./middlewares/sessions");

const usersController = require("./controllers/users_controller");
const sessionsController = require("./controllers/sessions_controller");

const app = express();
const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`server is listening on port: ${port}`);
});

app.use(logger);

app.use(express.static("client"));

app.use(express.json());

app.use(sessions);

app.use("/api/users", usersController);
app.use("/api/sessions", sessionsController);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

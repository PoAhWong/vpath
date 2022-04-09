import Note from "./Note";
import Progress from "./Progress";
import React, { useState } from "react";
function Main({ userName, userId }) {
  return (
    <div className="main">
      <Progress />
      <Note userId={userId} />
    </div>
  );
}

export default Main;

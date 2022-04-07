import React, { useState } from "react";

function LoginForm({ handleLogin }) {
  return (
    <div className="form_container">
      <form action="" onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button className="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;

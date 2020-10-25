import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          type="submit"
          name="action"
        >
          Log in
        </button>
        <h5>
          <Link to="/signup">Don't have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};
export default SignIn;

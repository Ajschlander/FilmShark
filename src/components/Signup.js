import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/Auth";
import app from "../firebase";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }

  }, [history]);

  const { currentUser } = useContext(AuthContext);

    if (currentUser) {
      return <Redirect to = "/" / > ;
    }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>

      <h1>Already have an account?</h1>
      <span>
        <Link to="/login">Click to login</Link>
      </span>
      
    </div>
  );
};

export default withRouter(SignUp);
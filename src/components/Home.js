import React from "react";
import * as firebase from "firebase";
import app from "../firebase";

const Home = () => {

    const user = firebase.auth().currentUser;

    return (
        <>
            <h1>Home Page</h1>
            <p>Hello {user.email}</p>
            <button onClick={() => {
                app.auth().signOut()
            }}>
                Sign out
            </button>
        </>
    )
}

export default Home;
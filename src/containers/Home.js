import React from "react";
import * as firebase from "firebase";
import app from "../firebase";
import Navbar from "../components/Navbar";

const signOut = () => {
    app.auth().signOut();
};

const Home = () => {

    const user = firebase.auth().currentUser;

    return (
        <div>
            <Navbar />
            
            {/* <h1>Home Page</h1>
            <p>Hello {user.email}</p>
            <button onClick={signOut}>
                Sign out
            </button> */}
        </div>
    )
}

export default Home;
import React from "react";
import * as firebase from "firebase";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";

const Home = () => {

    const user = firebase.auth().currentUser;

    return (
        <div>
            <Navbar user={user}/>
            <MovieList />
            {/* <h1>Home Page</h1>
            <p>Hello {user.email}</p>
            <button onClick={signOut}>
                Sign out
            </button> */}
        </div>
    )
}

export default Home;
import React from "react";
import "../styles/MovieCard.css";
import axios from "axios";

let API_KEY = "6939281b4b2fc9bd592e14dec01248d5";

const getOneMovie = async (id) => {
    let res = await axios.get("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + API_KEY);
    let data = res.data;
}

const MovieCard = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

export default MovieCard;
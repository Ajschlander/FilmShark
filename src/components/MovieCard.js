import React, {useState} from "react";
import "../styles/MovieCard.css";
import axios from "axios";

let API_KEY = "6939281b4b2fc9bd592e14dec01248d5";

const MovieCard = (props) => {

    return (
        <div>
            <h5>{props.title}</h5>
        </div>
    )
}

export default MovieCard;
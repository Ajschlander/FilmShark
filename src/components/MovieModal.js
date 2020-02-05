import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MovieModal = (props) => {

    const [closeModal, setCloseModal] = useState(true);

    const closeMovieModal = () => {
        return props.isOpen;
    }

    const getGenres = () => {
        let genres = props.movie.genres;
        // If there are genres
        if(genres){

        }
    }

}

export default MovieModal;
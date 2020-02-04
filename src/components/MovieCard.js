import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/Movie-Card.css";

const MovieCard = (props) => {

    let API_KEY = "6939281b4b2fc9bd592e14dec01248d5";

    const   [modal, setModal]   = useState(false),
            [loaded, setLoaded] = useState(false),
            [movie, setMovie]   = useState([]); 

    // props
    // title, rating, poster, backdrop, description, release-date, id, key

    useEffect(() => {
        const getMovieData = async () => {
            try {
                let res = await axios.get("https://api.themoviedb.org/3/movie/" + props.id + "?api_key=" + API_KEY);
                let data = res.data;
                setMovie(data);
            } catch (err) {
                console.log(err);
            }
        }
        getMovieData();
    }, [])

    const showModal = () => {
        setModal(!modal);
    }

    const renderPoster = () => {
        // If a movie poster is found then use that
        if(loaded){
            
        }
        // If there is no movie poster
        else{

        }
    }

    const renderMovieInfo = () => {

    }

    const renderLine = () => {
        let poster_path = props.poster;
    }

    return (
        <div>
            <h4>{props.title}</h4>
        </div>
    )
}

export default MovieCard;
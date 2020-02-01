import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import MovieCard from "./MovieCard";

let API_KEY = "6939281b4b2fc9bd592e14dec01248d5";

let useStyles = makeStyles(theme => ({
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 'auto',
        marginLeft: 'auto',

        // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
        [theme.breakpoints.up('md')]: { // medium: 960px or larger
            width: 920,
        },
        [theme.breakpoints.up('lg')]: { // large: 1280px or larger
            width: 1170,
        },
        [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
            width: 1366,
        },
    },
}));

const MovieList = (props) => {

    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("Dark");

    // Call this hook every time "query" gets updated
    useEffect(() => {
      const getData = async () => {
        let res = await axios.get(
          "https://api.themoviedb.org/3/search/movie?api_key=" +
            API_KEY +
            "&language=en-US&query=" + query
        );
        let data = res.data;
        console.log(data.results);
        setMovies(data.results);
      };
      getData();
    }, [query]);
    
    let classes = useStyles();

    return (
        <div className={classes.container}>
            {movies.map(movie => (
                <MovieCard 
                title={movie.title} 
                rating={movie.vote_average} 
                poster-img={movie.poster_path} 
                backdrop-img={movie.backdrop_path} 
                description={movie.overview}
                release-date={movie.release_date}
                id={movie.id}
                key={movie.id}
                />
            ))}
        </div>
    )
}

export default MovieList;
import React, {useState, useEffect} from "react";
import * as firebase from "firebase";
import app from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Link, Typography } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import logo from "../images/logo transparent.png";
import "../styles/Navbar.css";
import "../styles/Main.css"
import MovieCard from "../components/MovieCard";

let API_KEY = "6939281b4b2fc9bd592e14dec01248d5";

const useStyles = makeStyles(theme => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    active: {
        color: "#00d38e",
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "underline"
    },
    button: {
        color: "#00d38e",
        cursor: "pointer"
    },
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
    input: {
        marginLeft: "25%"
    }
}));

const Home = () => {

    // Get the user that is logged in
    const user = firebase.auth().currentUser;

    // set the useStyles to classes
    let classes = useStyles();

    // Setting up state values
    const   [movies, setMovies] = useState([]),
            [sort, setSort]     = useState("relevance"),
            [error, setError]   = useState(false),
            [loaded, setLoaded] = useState(true),
            [query, setQuery]   = useState("Dark");

    // let debouncedQuery = useDebounce(query, 500);

//     useEffect(() => {
//     // Make sure we have a value (user has entered something in input)
//         if (debouncedQuery) {
//             // Fire off API call
//             searchMovies(debouncedQuery).then(results => {
//                 setMovies(results);
//             });
//             } else {
//                 setMovies([]);
//             }
//         },
//         [debouncedQuery]
//   );

    // functions
    const signOut = () => {
        app.auth().signOut();
    };

    const reset = () => {
        window.location.reload();
    }

    const sortByRating = () => {
        setSort("rating");
    }

    const sortByRelevance = () => {
        setSort("relevance");
    }

    const sortByYear = () => {
        setSort("year");
    }

    const sortStyle = (selected) => {
        if(sort === selected){
            return {
                color: "#00d38e",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline"
            }
        }
    }

    useEffect(() => {
        if(sort === "rating"){
            movies.sort((a, b) => {
                if (a.vote_average > b.vote_average) return -1;
                if (a.vote_average < b.vote_average) return 1;
                return 0;
            })
            setMovies([...movies])
        }
        else if(sort === "year"){
            movies.sort((a, b) => {
                if (a.release_date.substring(0, 4) > b.release_date.substring(0, 4)) return -1;
                if (a.release_date.substring(0, 4) < b.release_date.substring(0, 4)) return 1;
                return 0;
            })
            setMovies([...movies])
        }
        else {
            searchMovies();
        }
    }, [sort])


    const searchMovies = async () => {

        try {
            let res = await axios.get(
                "https://api.themoviedb.org/3/search/movie?api_key=" +
                API_KEY +
                "&language=en-US&query=" + query
            );
            let data = res.data;
            setLoaded(true);
            setError(false);
            setSort("relevance");
            setMovies(data.results);
        }
        // Catches API limit errors, reloads page until resets
        catch (err) {
            if (err.status === "429") {
                console.log('Error 429');
                setError(true);
                setLoaded(false);
            }
            searchMovies(query);
        }
    }


    const renderNavbar = () => {
        return (
            <div className="Navbar">
                <div className={classes.container}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                    <img className="Navbar-img" src={logo} alt="FilmShark" onClick={reset} />
                    </Grid>
                    <Grid item>
                        <Typography className={classes.root}>
                            <Link className={classes.button} style={sortStyle("relevance")} onClick={sortByRelevance}>Relevance</Link>
                            <Link className={classes.button} style={sortStyle("rating")} onClick={sortByRating}>Rating</Link>
                            <Link className={classes.button} style={sortStyle("year")} onClick={sortByYear}>Year</Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography>
                        <Link className={classes.button} onClick={signOut}>
                        Logout<ExitToAppIcon />
                        </Link>
                    </Typography>
                    </Grid>
                </Grid>
                <TextField />
                </div>
            </div>
        )
    }

    const renderContent = () => {
        if(loaded && movies.length >= 1){
            return (
                <div className="Home-content">
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
        else {
            return (
                <h1>No movies found</h1>
            )
        }
    }

    return (
        <div className="Home-app">
            <div>
                {renderNavbar()}
            </div>
            <div className={classes.container}>
                {renderContent()}
            </div>
        </div>
    )
}

export default Home;
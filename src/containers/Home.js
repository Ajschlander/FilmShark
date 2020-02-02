import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from "firebase";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import Navbar from "../components/Navbar";
import useDebounce from "../hooks/useDebounce";

let API_KEY = "6939281b4b2fc9bd592e14dec01248d5";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "50%",
        },
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

const searchMovies = async (query) => {
    let res = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
        API_KEY +
        "&language=en-US&query=" + query
    );
    let data = res.data;
    return data.results;
}

const Home = () => {

    // Get the user that is logged in
    const user = firebase.auth().currentUser;

    // set the useStyles to classes
    let classes = useStyles();

    // Setting up state values
    const   [movies, setMovies] = useState([]),
            [sort, setSort]     = useState(""),
            [loaded, setLoaded] = useState(false),
            [error, setError]   = useState(false),
            [query, setQuery]   = useState("Dark");

    let debouncedSearchTerm = useDebounce(query, 500);

    useEffect(() => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Fire off our API call
        searchMovies(debouncedSearchTerm).then(results => {
          setMovies(results);
        });
      } else {
        setMovies([]);
      }
    },
    [debouncedSearchTerm]
  );

    return (
        <div>
            <Navbar user={user}/>
            <div className={classes.container}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField className={classes.input} id="standard-basic" label="Title" value={query} onChange={e => {
                        setQuery(e.target.value);
                    }}/>
                </form>
                <div>
                    {/* Render movie cards */}
                </div>
            </div>
        </div>
    )
}

export default Home;
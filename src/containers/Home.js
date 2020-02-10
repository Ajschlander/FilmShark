import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import app from "../firebase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Link, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import logo from "../images/logo transparent.png";
import "../styles/Navbar.css";
import "../styles/Main.css";
import MovieCard from "../components/MovieCard";

const useStyles = makeStyles(theme => ({
	root: {
		"& > * + *": {
			marginLeft: theme.spacing(2)
		}
	},
	active: {
		color: "#00d38e",
		cursor: "pointer",
		fontWeight: "bold",
		textDecoration: "underline"
	},
	button: {
		color: "#00d38e",
		cursor: "pointer",
		textAlign: "center"
	},
	container: {
		paddingRight: 15,
		paddingLeft: 15,
		marginRight: "auto",
		marginLeft: "auto",
		display: "flex",

		// Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
		[theme.breakpoints.up("md")]: {
			// medium: 960px or larger
			width: 920
		},
		[theme.breakpoints.up("lg")]: {
			// large: 1280px or larger
			width: 1170
		},
		[theme.breakpoints.up("xl")]: {
			// extra-large: 1920px or larger
			width: 1366
		}
	}
}));

const CssTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: "#00d38e"
		},
		"& .MuiFormLabel-root": {
			color: "#00d38e"
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "#00d38e"
		},
		"& .MuiInputBase-input": {
			color: "#00d38e",
			fontWeight: "bold"
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "#00d38e"
			},
			"&:hover fieldset": {
				borderColor: "#00d38e"
			},
			"&.Mui-focused fieldset": {
				borderColor: "#00d38e"
			}
		}
	}
})(TextField);

const Home = () => {

	// Get the user that is logged in
	const user = firebase.auth().currentUser;

	// set the useStyles to classes
	let classes = useStyles();

	// Setting up state values
	const [movies, setMovies] = useState([]),
		[sort, setSort] = useState("relevance"),
		[loaded, setLoaded] = useState(true),
		[query, setQuery] = useState("Dark");

	let debouncedQuery = useDebounce(query, 1000);

	const searchMovies = async query => {
		try {
			let res = await axios.get(
				"https://api.themoviedb.org/3/search/movie?api_key=" +
					process.env.REACT_APP_MOVIE_API_KEY +
					"&language=en-US&query=" +
					query
			);
			let data = res.data;
			setLoaded(true);
			setSort("relevance");
			return data.results;
		} catch (err) {
			// Catches API limit errors, reloads page until resets
			if (err.status === "429") {
				console.log("Error 429");
				setLoaded(false);
			}
			searchMovies(query);
		}
	};

	useEffect(() => {
		// Make sure we have a value (user has entered something in input)
		if (debouncedQuery) {
			// Fire off API call
			searchMovies(debouncedQuery).then(results => {
				setMovies(results);
			});
		} else {
			setMovies([]);
		}
	}, [debouncedQuery]);

	// functions
	const signOut = () => {
		app.auth().signOut();
	};

	const reset = () => {
		window.location.reload();
	};

	const sortByRating = () => {
		setSort("rating");
	};

	const sortByRelevance = () => {
		setSort("relevance");
	};

	const sortByYear = () => {
		setSort("year");
	};

	const sortStyle = selected => {
		if (sort === selected) {
			return {
				color: "#00d38e",
				cursor: "pointer",
				fontWeight: "bold",
				textDecoration: "underline"
			};
		}
	};

	useEffect(() => {
		if (sort === "rating") {
			movies.sort((a, b) => {
				if (a.vote_average > b.vote_average) return -1;
				if (a.vote_average < b.vote_average) return 1;
				return 0;
			});
			setMovies([...movies]);
		} else if (sort === "year") {
			movies.sort((a, b) => {
				if (
					a.release_date.substring(0, 4) >
					b.release_date.substring(0, 4)
				)
					return -1;
				if (
					a.release_date.substring(0, 4) <
					b.release_date.substring(0, 4)
				)
					return 1;
				return 0;
			});
			setMovies([...movies]);
		} else if (sort === "relevance") {
			searchMovies(debouncedQuery).then(results => {
				setMovies(results);
			});
		}
	}, [sort]);

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
							<img
								className="Navbar-img"
								src={logo}
								alt="FilmShark"
								onClick={reset}
							/>
						</Grid>
						<Grid item>
							<Typography className={classes.root}>
								<Link
									className={classes.button}
									style={sortStyle("relevance")}
									onClick={sortByRelevance}
								>
									Relevance
								</Link>
								<Link
									className={classes.button}
									style={sortStyle("rating")}
									onClick={sortByRating}
								>
									Rating
								</Link>
								<Link
									className={classes.button}
									style={sortStyle("year")}
									onClick={sortByYear}
								>
									Year
								</Link>
							</Typography>
						</Grid>
						<Grid item>
							<div className="Home-hello-display-name">
								<h2>
									Hello {user.displayName}!
								</h2>
							</div>
							<Typography>
								<Link
									className={classes.button}
									onClick={signOut}
								>
									Logout
									<ExitToAppIcon />
								</Link>
							</Typography>
						</Grid>
					</Grid>
				</div>
				<div className={classes.container}>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Grid item>
							<div className="Home-input">
								<CssTextField
									className={classes.input}
									label="Search Movies..."
									variant="outlined"
									id="custom-css-outlined-input"
									value={query}
									onChange={e => {
										setQuery(e.target.value);
									}}
								/>
							</div>
						</Grid>
						<Grid item>
							<div className="Home-results-for-display">
								<h2>
									Results for: <span>{debouncedQuery}</span>
								</h2>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	};

	const renderContent = () => {
		if (loaded && movies.length >= 1) {
			return (
				<Grid container spacing={5} className="Home-content">
					{movies.map(movie => (
						<Grid item xs={6} md={4} lg={3}>
							<MovieCard
								title={movie.title}
								rating={movie.vote_average}
								poster={movie.poster_path}
								backdrop={movie.backdrop_path}
								description={movie.overview}
								release-date={movie.release_date}
								id={movie.id}
							/>
						</Grid>
					))}
				</Grid>
			);
		} else {
			return <h1>No movies found</h1>;
		}
	};

	return (
		<div className="Home-app">
			<div>{renderNavbar()}</div>
			<div className={classes.container}>{renderContent()}</div>
		</div>
	);
};

export default Home;

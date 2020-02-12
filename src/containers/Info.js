import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link, Typography, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import app from "../firebase";
import logo from "../images/logo transparent.png";
import MovieCardItem from "../components/MovieCardItem";
import "../styles/Info.css";

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

const Info = () => {
  let user = firebase.auth().currentUser;

  const [sort, setSort] = useState("relevance"),
		[favMovieArr, setFavMovieArr] = useState([]),
		[watchlist, setWatchlist] = useState([]);

  let classes = useStyles();

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
      // Sort watchlist arr
      watchlist.sort((a, b) => {
        if (a.vote_average > b.vote_average) return -1;
        if (a.vote_average < b.vote_average) return 1;
        return 0;
      });
      setWatchlist([...watchlist]);
      // Sort fav movie arr
      favMovieArr.sort((a, b) => {
        if (a.vote_average > b.vote_average) return -1;
        if (a.vote_average < b.vote_average) return 1;
        return 0;
      });
      setFavMovieArr([...favMovieArr]);
    } else if (sort === "year") {
      // Sort watchlist arr
      watchlist.sort((a, b) => {
        if (a.release_date.substring(0, 4) > b.release_date.substring(0, 4))
          return -1;
        if (a.release_date.substring(0, 4) < b.release_date.substring(0, 4))
          return 1;
        return 0;
      });
      setWatchlist([...watchlist]);
      // Sort fav movie arr
      favMovieArr.sort((a, b) => {
        if (a.release_date.substring(0, 4) > b.release_date.substring(0, 4))
          return -1;
        if (a.release_date.substring(0, 4) < b.release_date.substring(0, 4))
          return 1;
        return 0;
      });
      setFavMovieArr([...favMovieArr]);
    } else if (sort === "relevance") {
      getUserWatchlist();
      getUserFavorites();
    }
  }, [sort]);

  const renderNavbar = () => {
    return (
      <Grid className="Navbar">
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
                <h2>Hello {user.displayName}!</h2>
              </div>
              <Typography>
                <Link className={classes.button} onClick={signOut}>
                  Logout
                  <ExitToAppIcon />
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Grid
          className={classes.container}
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button className={classes.button} href="/home">
              Search for more movies
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const getUserFavorites = async () => {
    let usersRef = app
      .firestore()
      .collection("users")
      .doc(`${user.uid}`);
    await usersRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No document!");
        } else {
          let movieArr = doc.data().top5movies;
          setFavMovieArr(movieArr);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getUserWatchlist = async () => {
    let usersRef = app
      .firestore()
      .collection("users")
      .doc(`${user.uid}`);
    await usersRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No document!");
        } else {
          let movieArr = doc.data().watchList;
          setWatchlist(movieArr);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserFavorites();
    getUserWatchlist();
  }, []);

  return (
		<div>
			<div>{renderNavbar()}</div>
			<div className="Info-lists-container">
				<div className={classes.container}>
					<h1 className="Info-fav-title">Favorites</h1>
					<Grid container spacing={5} className="Info-fav-content">
						{favMovieArr.map(movie => (
							<Grid item xs={12} md={4} lg={3}>
								<MovieCardItem
									title={movie.title}
									rating={movie.vote_average}
									poster={movie.poster_path}
									backdrop={movie.backdrop_path}
									description={movie.overview}
									release-date={movie.release_date}
									id={movie.id}
									key={movie.id}
									favMovieArr={favMovieArr}
									watchList={watchlist}
								/>
							</Grid>
						))}
					</Grid>
				</div>
				<div className={classes.container}>
					<h1 className="Info-watch-title">WatchList</h1>
					<Grid container spacing={5} className="Info-watch-content">
						{watchlist.map(movie => (
							<Grid item xs={12} md={4} lg={3}>
								<MovieCardItem
									title={movie.title}
									rating={movie.vote_average}
									poster={movie.poster_path}
									backdrop={movie.backdrop_path}
									description={movie.overview}
									release-date={movie.release_date}
									id={movie.id}
									key={movie.id}
									favMovieArr={favMovieArr}
									watchList={watchlist}
								/>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</div>
  );
};

export default Info;

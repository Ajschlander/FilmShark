import React, {useState, useContext, useEffect} from "react";
import * as firebase from "firebase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Link, Typography, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import app from "../firebase";
import logo from "../images/logo transparent.png";
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

    const [favMovieArr, setFavMovieArr] = useState([]),
        [watchlist, setWatchlist] = useState([]);

    let classes = useStyles();

    const signOut = () => {
		app.auth().signOut();
    };
    
    const reset = () => {
		window.location.reload();
	};

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
								>
									Relevance
								</Link>
								<Link
									className={classes.button}
								>
									Rating
								</Link>
								<Link
									className={classes.button}
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
				<Grid className={classes.container}>
					<Grid item>
                        <Button className={classes.button} href="/home">
                            Back to searching
                        </Button>
                    </Grid>
				</Grid>
			</Grid>
		);
	}
	
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
		console.log(favMovieArr);
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
	}, [])

        return (
            <div>
                <div>
                    {renderNavbar()}
                </div>
                <h1>Favorites</h1>
                {favMovieArr.map(item => (
                    <div>
                        {item.title}
                    </div>
                ))}
                <h1>Watchlist</h1>
                {watchlist.map(item => (
                    <div>
                        {item.title}
                    </div>
                ))}
            </div>
        )
    }

export default Info;
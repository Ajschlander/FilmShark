import React from "react";
import * as firebase from "firebase";
import app from "../firebase";
import { IoIosPlayCircle, IoMdEye, IoIosAddCircle } from "react-icons/io";
import { Grid, Button } from "@material-ui/core";
import Modal from "react-modal";
import axios from "axios";
import "../styles/Movie-Modal.css";

Modal.setAppElement("#root");

app.functions().useFunctionsEmulator("http://localhost:6000");

const MovieModal = props => {

	// Get the user that is logged in
	const user = firebase.auth().currentUser;

	const closeMovieModal = () => {
		return props.isOpen;
	};

	const getGenres = () => {
		let genres = props.movie.genres;
		// If there are genres
		if (genres) {
			let genreString = "";
			for (let i = 0; i < genres.length; i++) {
				genreString += genres[i].name + " / ";
			}
			return genreString.substring(0, genreString.length - 2);
		} else {
			return "No genres?";
		}
	};

	const formatBudget = () => {
		let budgetString = props.movie.budget;
		if (budgetString) {
			return (
				"$" +
				budgetString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			);
		} else {
			return "Budget not available";
		}
	};

	const renderMoviePoster = () => {
		let poster_url = props.movie.poster_path;
		if (poster_url) {
			return (
				<img
					className="MovieModal-modal-poster"
					src={"https://image.tmdb.org/t/p/w500" + poster_url}
					alt="Modal Poster"
				/>
			);
		} else {
			return <div>No Poster</div>;
		}
	};

	const handleAddToFavClick = async () => {
		// saving props.movie to db
		let usersRef = app.firestore().collection("users").doc(`${user.uid}`);
		await usersRef.get()
		.then(doc => {
			if(!doc.exists){
				console.log("No document!");
			}
			else{
				console.log("Document data: ", doc.data());
			}
		}).catch(err => {
			console.log(err);
		});

		let userRef = app.firestore().collection("users").doc(`${user.uid}`);
		await userRef.update({
			top5movies: app.firestore.FieldValue.arrayUnion(props.movie)
		  });

		  

		// console.log(props.movie);
		console.log(user.uid);
	}

	const handleWatchLaterClick = async () => {
		let usersRef = app.firestore().collection("users").doc(`${user.uid}`);
		await usersRef.get()
		.then(doc => {
			if(!doc.exists){
				console.log("No document!");
			}
			else{
				console.log("Document data: ", doc.data());
			}
		}).catch(err => {
			console.log(err);
		});

		let userRef = app.firestore().collection("users").doc(`${user.uid}`);
		await userRef.update({
			watchList: app.firestore.FieldValue.arrayUnion(props.movie)
		  });

		  

		// console.log(props.movie);
		console.log(user.uid);
	}

	const handleTrailerClick = async (e) => {
		e.stopPropagation();
		let res = await axios.get(
			"https://api.themoviedb.org/3/movie/" +
				props.movie.id +
				"/videos?api_key=" +
				process.env.REACT_APP_MOVIE_API_KEY
		);
		let data = res.data;
		window.open(
			"https://www.youtube.com/watch?v=" + data.results[0].key,
			"_blank"
		);
	};

	return (
		<div>
			<Modal
				className="MovieModal-modal"
				isOpen={props.isOpen}
				onRequestClose={closeMovieModal}
				shouldCloseOnOverlayClick={false}
			>
				<button onClick={closeMovieModal} className="MovieModal-button">
					X
				</button>

				<img
					className="MovieModal-background-image"
					src={
						"https://image.tmdb.org/t/p/original/" +
						props.movie.backdrop_path
					}
					alt="Backdrop"
					onClick={e => {
						e.stopPropagation();
					}}
				/>

				<Grid container className="MovieModal-modal-container">
					<Grid item lg={7} className="MovieModal-modal-row">
						<div className="MovieModal-modal-info">
							<h1>{props.movie.title}</h1>
							<div>
								<p className="MovieModal-modal-overview">
									{props.movie.overview}
								</p>
								<Button
									style={{ marginRight: "1rem" }}
									onClick={handleTrailerClick}
								>
									<IoIosPlayCircle />
									TRAILER
								</Button>
								<Button
									style={{ marginRight: "1rem" }}
									onClick={e => {
										handleWatchLaterClick();
									}}
								>
									<IoMdEye />
									Watch later
								</Button>
								<Button
									style={{ marginRight: "1rem" }}
									onClick={e => {
										handleAddToFavClick();
									}}
								>
									<IoIosAddCircle />
									Add to favorites
								</Button>
							</div>
						</div>
					</Grid>
					<Grid item lg={5} className="MovieModal-modal-stats">
						{renderMoviePoster()}
						<div className="MovieModal-stats">
							<p>
								<span>Genres</span>
								{getGenres()}
							</p>
							<p>
								<span>Rating</span>
								{props.movie.vote_average}
							</p>
							<p>
								<span>Release Date</span>
								{props.movie.release_date}
							</p>
							<p>
								<span>Budget</span>
								{formatBudget()}
							</p>
						</div>
					</Grid>
				</Grid>
			</Modal>
		</div>
	);
};

export default MovieModal;

import React, { useState, useEffect } from "react";
import { Palette } from "react-palette";
import { MdStar } from "react-icons/md";
import axios from "axios";
import NoImg from "../images/no-img.png";
import "../styles/Movie-Card.css";
import MovieModal from "./MovieModal";

const MovieCard = props => {

	const [modal, setModal] = useState(false),
		[loaded, setLoaded] = useState(false),
		[movie, setMovie] = useState([]);

	// props
	// title, rating, poster, backdrop, description, release-date, id, key

	useEffect(() => {
		const getMovieData = async () => {
			try {
				let res = await axios.get(
					"https://api.themoviedb.org/3/movie/" +
						props.id +
						"?api_key=" +
						process.env.REACT_APP_MOVIE_API_KEY
				);
				let data = res.data;
				setMovie(data);
				setLoaded(true);
			} catch (err) {
				console.log(err);
			}
		};
		getMovieData();
	}, []);

	const showModal = () => {
		setModal(!modal);
	};

	const renderPoster = () => {
		// If a movie is found
		if (loaded) {
			let poster_url = movie.poster_path;
			if (poster_url != null) {
				return (
					<div className="MovieCard-poster-container">
						<img
							src={"https://image.tmdb.org/t/p/w500" + poster_url}
							alt="Poster"
							className="MovieCard-poster"
						/>
					</div>
				);
			} else {
				return (
					<div className="MovieCard-poster-container">
						<img 
						src={NoImg}
						alt="Poster"
						className="MovieCard-no-image"
						/>
					</div>
				);
			}
		}
		// If no movie is found
		else {
			return (
				<div>
					<p>No image available</p>
				</div>
			);
		}
	};

	const renderMovieInfo = () => {
		// if a movie is found
		if (loaded) {
			return (
				<div className="MovieCard-info">
					<div className="MovieCard-line-container">
						{renderLine()}
					</div>
					<div className="MovieCard-info-container">
						<div className="MovieCard-title-container">
							<p className="MovieCard-title">
								{movie.title}
								<span>{movie.release_date.substring(0, 4)}</span>
							</p>
						</div>
						<div className="MovieCard-buttons-container">
							<p className="MovieCard-rating">
								<MdStar className="MovieCard-star"/>
								{movie.vote_average}
							</p>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div style={{ color: "white" }}>
					Nothing found! Try again.
				</div>
			)
		}
	};

	const renderLine = () => {
		let poster_url = movie.poster_path;
		return (
			<Palette src={"https://image.tmdb.org/t/p/w500" + poster_url}>
				{({ data, loading, error }) => (
					<div
						style={{ backgroundColor: data.vibrant }}
						className="MovieCard-line"
					></div>
				)}
			</Palette>
		);
	};

	return (
		<div className="MovieCard-card" onClick={showModal}>
			<div>
				<MovieModal className="MovieCard-modal" isOpen={modal} movie={movie} key={movie.id}/>
				{renderPoster()}
				{renderMovieInfo()}
			</div>
		</div>
	);
};

export default MovieCard;

import React, {useState, useContext, useEffect} from "react";
import * as firebase from "firebase";
import app from "../firebase";
import { AuthContext } from "../utils/Auth";
import "../styles/Info.css";

const Info = () => {

    const { currentUser } = useContext(AuthContext);
    let user = currentUser;

    const [favMovieArr, setFavMovieArr] = useState([]),
        [watchlist, setWatchlist] = useState([]);

    if(user){
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
        getUserFavorites();
        return (
            <div>
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
    else {
        return (
			<div>
                WAITING ON INFO FROM DB
            </div>
		);
    }
}

export default Info;
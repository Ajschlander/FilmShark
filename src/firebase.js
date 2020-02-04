import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyAxns8Mk2LKYq8I_kBwjOZiUC-1Y_br0A8",
	authDomain: "filmshark-react.firebaseapp.com",
	databaseURL: "https://filmshark-react.firebaseio.com",
	projectId: "filmshark-react",
	storageBucket: "filmshark-react.appspot.com",
	messagingSenderId: "116506343238",
	appId: "1:116506343238:web:8d3725599b75dc28f85747",
	measurementId: "G-1RHP93K18M"
});

export default app;

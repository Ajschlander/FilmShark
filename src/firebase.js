import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyCewsngV0t9B9HdWauaRI4rSK6TZ0Wh_QI",
  	authDomain: "filmshark-78a6c.firebaseapp.com",
  	databaseURL: "https://filmshark-78a6c.firebaseio.com",
  	projectId: "filmshark-78a6c",
  	storageBucket: "filmshark-78a6c.appspot.com",
  	messagingSenderId: "235370868994",
  	appId: "1:235370868994:web:07d8fa688e1a2ed665921b",
  	measurementId: "G-VF8999BL44"
});

export default app;

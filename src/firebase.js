import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const firebaseConfig = {
// 	apiKey: "AIzaSyB14VLkZA1k7xbRAEXIc68VMpR16gsxGEE",
// 	authDomain: "filmshark-90cf8.firebaseapp.com",
// 	databaseURL: "https://filmshark-90cf8.firebaseio.com",
// 	projectId: "filmshark-90cf8",
// 	storageBucket: "filmshark-90cf8.appspot.com",
// 	messagingSenderId: "272335362244",
// 	appId: "1:272335362244:web:7bfbc8ad3239b0e1b31191",
// 	measurementId: "G-SSLK122VM9"
//   };

//   firebase.initializeApp(firebaseConfig);

firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  	appId: process.env.REACT_APP_FIREBASE_APP_ID,
  	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

export default firebase;

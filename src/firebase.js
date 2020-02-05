import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyCj8fo0CdYYSYtzL2Xmhx1DEMgvevogt5g",
	authDomain: "filmshark-c0324.firebaseapp.com",
	databaseURL: "https://filmshark-c0324.firebaseio.com",
	projectId: "filmshark-c0324",
	storageBucket: "filmshark-c0324.appspot.com",
	messagingSenderId: "3960362904",
	appId: "1:3960362904:web:b5b18ba71541985feabded",
	measurementId: "G-ZCTLKW26JK"
});

export default app;

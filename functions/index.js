const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp({databaseURL:process.env.REACT_APP_FIREBASE_DATABASE});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.userCreated = functions.auth.user().onCreate(user => {

	const {uid, email} = user;

	return admin
		.firestore()
		.collection("users")
		.doc(uid)
		.set({
            email: email,
            top5movies: [],
            watchList: []
		});
});

exports.getUserData = functions.https.onRequest((req, res) => {
	let db = admin.firestore();
	

	db.collection("users")
	.get()
	.then(snapshot => {
		return snapshot.docs
	}).catch(err => {
		return err;
	})
})
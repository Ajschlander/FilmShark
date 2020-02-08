const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.userCreated = functions.auth.user().onCreate(e => {
    let userId = e.data.uid;
    let email = e.data.email;

	return admin
		.firestore()
		.collection("users")
		.doc(userId)
		.set({
            email: email,
            top5movies: [],
            watchList: []
		});
});
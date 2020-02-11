import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/Auth";
import app from "../firebase";
import "../styles/Form.css";

// const useStyles = makeStyles(theme => ({
// 	input: {
// 		color: "#00d38e"
// 	},
// 	button: {
// 		color: "#00d38e",
// 		border: "1px solid #00d38e"
// 	}
// }));


const Pending = ({ history }) => {
	const handleSignUp = useCallback(
		async event => {
			event.preventDefault();
			const { email, password, name } = event.target.elements;
			await app
				.auth()
				.createUserWithEmailAndPassword(email.value, password.value)
				.then(res => {
					res.user.updateProfile({
						displayName: name.value
					});
				})
				.catch(err => {
					console.log(err);
				});
			history.push("/home");
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/info" />;
	}

	return (
		<div className="Form-background">
			
		</div>
	);
};

export default withRouter(Pending);

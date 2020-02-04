import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";
import { AuthContext } from "../utils/Auth";
import app from "../firebase";
import "../styles/Form.css";

const useStyles = makeStyles(theme => ({
	input: {
		color: "#00d38e"
	},
	button: {
		color: "#00d38e",
		border: "1px solid #00d38e"
	}
}));

const SignUp = ({ history }) => {
	let classes = useStyles();
	const handleSignUp = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.createUserWithEmailAndPassword(
						email.value,
						password.value
					);
				history.push("/home");
			} catch (err) {
				console.log(err.message);
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/home" />;
	}

	return (
		<div className="Form-background">
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				<div className="Form-container">
					<h1 className="Form-title">Sign Up</h1>
					<hr align="left" className="Form-title-underline" />
					<form onSubmit={handleSignUp}>
						<div className="Form-input">
							<TextField
								className={classes.textField}
								variant="outlined"
								label="Email"
								name="email"
								type="email"
								inputProps={{ className: classes.input }}
							/>
						</div>
						<div className="Form-input">
							<TextField
								variant="outlined"
								label="Password"
								name="password"
								type="password"
								inputProps={{ className: classes.input }}
							/>
						</div>
						<Button className={classes.button} type="submit">
							Sign Up
						</Button>
					</form>
					<Link to="/login">Already have an account?</Link>
				</div>
			</Grid>
		</div>
	);
};

export default withRouter(SignUp);

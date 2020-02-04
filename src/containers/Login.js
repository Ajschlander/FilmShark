import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import app from "../firebase";
import { AuthContext } from "../utils/Auth";
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

const Login = ({ history }) => {
	let classes = useStyles();
	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.signInWithEmailAndPassword(email.value, password.value);
				history.push("/home");
			} catch (err) {
				console.log(err);
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
					<h1 className="Form-title">Log in</h1>
					<hr align="left" className="Form-title-underline" />
					<form onSubmit={handleLogin}>
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
							Log in
						</Button>
					</form>
					<Link to="/signup">Click here to signup</Link>
				</div>
			</Grid>
		</div>
	);
};

export default withRouter(Login);

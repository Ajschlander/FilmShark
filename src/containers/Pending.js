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


const Pending = () => {

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

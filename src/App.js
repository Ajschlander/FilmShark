import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./utils/Auth";
import Home from "./containers/Home";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Info from "./containers/Info";
import Pending from "./containers/Pending";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
					<PrivateRoute exact path="/home" component={Home} />
					<PrivateRoute exact path="/info" component={Info} />
					<Route exact path="/" component={Landing} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/pending" component={Pending} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;

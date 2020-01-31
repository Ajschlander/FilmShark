import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from './utils/Auth';
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
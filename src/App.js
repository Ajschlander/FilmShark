import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from './utils/Auth';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
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
import React, { useEffect, useState } from "react";
import app from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		app.auth().onAuthStateChanged(user => {
			if(user){
				setCurrentUser(user);
			}
			else {
				setCurrentUser(null);
			}
		});
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

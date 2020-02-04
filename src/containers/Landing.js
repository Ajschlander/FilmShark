import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "../utils/Auth";
import { Grid, Button } from '@material-ui/core';
import "../styles/Landing.css";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginRight: theme.spacing(10),
            marginLeft: theme.spacing(10)
        },
    },
    button: {
        color: "#00d38e",
        border: "1px solid #00d38e"
    }
}));


const Landing = () => {

    let classes = useStyles();

    return (

        <div className="Landing-background">

            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >

                    <div className="Landing-welcome">
                        <h1 className="Landing-welcome-title">Welcome To FilmShark!</h1>
                        <h3 className="Landing-get-started">Get Started!</h3>
                        <div className={classes.root}>
                            <Button variant="outlined" className={classes.button} href="/signup">Signup</Button>
                            <Button variant="outlined" className={classes.button} href="/login">Login</Button>
                        </div>
                    </div>

            </Grid>

        </div>
    )
}

export default Landing;
import React from "react";
import app from "../firebase";
import logo from "../images/logo transparent.png";
import { Grid, Link, Typography } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import "../styles/Navbar.css";

const useStyles = makeStyles(theme => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    active: {
        color: "#00d38e",
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "underline"
    },
    button: {
        color: "#00d38e",
        cursor: "pointer"
    },
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 'auto',
        marginLeft: 'auto',

        // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
        [theme.breakpoints.up('md')]: { // medium: 960px or larger
            width: 920,
        },
        [theme.breakpoints.up('lg')]: { // large: 1280px or larger
            width: 1170,
        },
        [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
            width: 1366,
        },
    },
}));

const signOut = () => {
  app.auth().signOut();
};


const Navbar = (props) => {

    let classes = useStyles();

    return (
      <div className="Navbar">
        <div className={classes.container}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <img className="Navbar-img" src={logo} alt="FilmShark" />
            </Grid>
            <Grid item>
              <Typography className={classes.root}>
                <Link className={classes.active}>Relevance</Link>
                <Link className={classes.button}>Rating</Link>
                <Link className={classes.button}>Year</Link>
              </Typography>
            </Grid>
            <Grid item>
              {/* Login/Signout */}
              <Typography>
                <Link>{props.user.email}</Link>
                <Link className={classes.button} onClick={signOut}>
                  Logout<ExitToAppIcon />
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    );
}

export default Navbar;
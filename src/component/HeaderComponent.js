import React from "react";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {AppBar, Avatar, IconButton, Toolbar, Typography} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import {useFirebaseApp} from "reactfire";
import firebase from "firebase";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(
    (theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
            large: {
                width: theme.spacing(7),
                height: theme.spacing(7),
            },
        })
);

export default (props) => {

    const provider = new firebase.auth.GoogleAuthProvider;
    const firebaseApp = useFirebaseApp();

    function guardaDatos(){
        firebaseApp.database().ref("Usuarios/" +user.uid)
            .set(user)
    }

    function login() {
        firebaseApp.auth().signInWithPopup(provider).then(result => {
            console.log(result.user);
            var userToSave = result.user;
            var usuario={
                uid:userToSave.uid,
                nombre:userToSave.displayName,
                email:userToSave.email,
                foto:userToSave.photoURL,
                dia:userToSave.metadata.lastSignInTime
            }
            setUser(result.user)
            setIsLogedIn(true)
            firebaseApp.database().ref("Usuarios/" +usuario.uid)
                .set(usuario)
        })

    }

    const classes = useStyles();
    const [isLogedIn, setIsLogedIn] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, setUser] = React.useState(null)
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        if (isLogedIn) {
            setAnchorEl(event.currentTarget);
        } else {
            login();
        }

    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsLogedIn(false);
        firebaseApp.auth().signOut();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Horno Panadero
                </Typography>

                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >{
                        isLogedIn ?  <Avatar alt="Remy Sharp" src={user.photoURL}/> : <AccountCircle/>
                    }
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Log out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}
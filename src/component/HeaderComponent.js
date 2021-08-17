import React from "react";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {AppBar, Button, Grid, IconButton, Toolbar, Typography} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';

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
        })
);

export default (props) => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Horno Panadero
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}
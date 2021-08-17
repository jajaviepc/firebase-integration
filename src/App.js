import './App.css';
import LinechartContainer from "./component/LinechartContainer";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {AppBar, Button, Grid, IconButton, Toolbar, Typography} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import HeaderComponent from "./component/HeaderComponent";
import TemperatureMeterComponent from "./component/TemperatureMeterComponent";

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
            grid: {
                flexGrow: 1,
            }
        })
);

function App() {
    const classes = useStyles();
    return (
        <div  className={classes.root}>
            <Grid container className={classes.grid} spacing={2}>
                <Grid item xs={12}>
                    <HeaderComponent/>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <LinechartContainer/>
                </Grid>
            </Grid>

        </div>
    );
}

export default App;

import React from "react";
import {Grid} from "@material-ui/core";
import LinechartFirebaseComponent from "./LinechartFirebaseInfoComponent";
import TemperatureMeterComponent from "./TemperatureMeterComponent";

export default (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid key={1}>
                        <TemperatureMeterComponent/>
                    </Grid>
                    <Grid key={2} item>
                        <LinechartFirebaseComponent/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

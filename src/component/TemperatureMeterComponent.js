import {createStyles, makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from "react";
import {useFirebaseApp} from "reactfire";
import ReactSpeedometer from "react-d3-speedometer";
import firebase from "firebase";

const useStyles = makeStyles(
    (theme) =>
        createStyles({
            dial: {
                display: "inline-block",
                width: `300px`,
                height: `auto`,
                color: "#000",
                border: "0.5px solid #fff",
                padding: "2px"
            },
            title: {
                fontSize: "1em",
                color: "#000",
                textAlign:"center"
            }
        })
);


export default (props) => {

    const styles = useStyles();
    const firebase = useFirebaseApp();
    const [temperature, setTemperature] = useState(0);

    function getLastTemperatureFromFirebase() {
        firebase.database().ref('Nodemcu/TThermok').limitToLast(1).on("value", (snapshot) => {
            var fetchedData = snapshot.val();
            if (fetchedData) {
                var dataToUse = [];
                for (var key in fetchedData) {
                    dataToUse.push(fetchedData[key]);
                }
            }
            setTemperature(dataToUse[0])
        });
    }

    useEffect(() => {
        getLastTemperatureFromFirebase();
    }, []);


    return (
        <div className={styles.dial}>
            <ReactSpeedometer
                maxValue={300}
                minValue={100}
                height={190}
                width={290}
                value={temperature}
                needleTransition="easeQuadIn"
                needleTransitionDuration={1000}
                needleColor="black"
                startColor="green"
                segments={10}
                endColor="red"
            />
            <div className={styles.title}>Temperatura actual</div>
        </div>
    );
}
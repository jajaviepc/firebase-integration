import React, {useEffect, useState} from "react";
import {useFirebaseApp} from "reactfire";
import firebase from "firebase";
import {Helmet} from 'react-helmet';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import moment from "moment";

export default (props) => {
    const quantity = 5;


    const firebase = useFirebaseApp();
    const [temperature, setTemperature] = useState([]);
    const [hour, setHour] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [day, setDay] = useState([]);
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);

    const [renderTemperature, setRenderTemperature] = useState(false);
    const [renderHour, setRenderHour] = useState(false);
    const [renderMinutes, setRenderMinutes] = useState(false);
    const [renderDay, setRenderDay] = useState(false);
    const [renderMonth, setRenderMonth] = useState(false);
    const [renderYear, setRenderYear] = useState(false);

    function validateIfRender() {
        return (temperature.length > 0 && hour.length > 0 && minutes.length > 0 && day > 0 && month > 0 && year > 0);
    }

    function generateObjectToDisplay() {
        var response = [];
        for (let i = 0; i < temperature.length; i++) {
            response.push({date: createArrayOfDates()[i], Temperatura: temperature[i]})
        }
        return response;
    }

    function getDataFromFirebase(quantity) {
        firebase.database().ref('Nodemcu/TThermok').limitToLast(quantity).on("value", (snapshot) => {
            var fetchedData = snapshot.val();
            if (fetchedData) {
                var dataToUse = [];
                for (var key in fetchedData) {
                    dataToUse.push(fetchedData[key]);
                }
            }
            setTemperature(dataToUse)
            setRenderTemperature(true)
        });
        firebase.database().ref('Nodemcu/Hora').limitToLast(quantity).on("value", (snapshot) => {
            var fetchedData = snapshot.val();
            if (fetchedData) {
                var dataToUse = [];
                for (var key in fetchedData) {
                    dataToUse.push(fetchedData[key]);
                }
            }
            setHour(dataToUse)
            setRenderHour(true)
        });
        firebase.database().ref('Nodemcu/Minutos').limitToLast(quantity).on("value", (snapshot) => {
            var fetchedData = snapshot.val();
            if (fetchedData) {
                var dataToUse = [];
                for (var key in fetchedData) {
                    dataToUse.push(fetchedData[key]);
                }
            }
            setMinutes(dataToUse)
            setRenderMinutes(true)
        });
        firebase.database().ref('Nodemcu/Dia').limitToLast(quantity).on("value", (snapshot) => {
            var fetchedData = snapshot.val();
            if (fetchedData) {
                var dataToUse = [];
                for (var key in fetchedData) {
                    dataToUse.push(fetchedData[key]);
                }
            }
            setDay(dataToUse)
            setRenderDay(true)
        });

        firebase.database().ref('Nodemcu/Mes').limitToLast(quantity).on("value", (snapshot) => {
            var fetchedData = snapshot.val();
            if (fetchedData) {
                var dataToUse = [];
                for (var key in fetchedData) {
                    dataToUse.push(fetchedData[key]);
                }
            }
            setMonth(dataToUse)
            setRenderMonth(true)
        });
        firebase.database().ref('Nodemcu/Ano').limitToLast(quantity).on("value", (snapshot) => {
            var fetchedData = snapshot.val();
            if (fetchedData) {
                var dataToUse = [];
                for (var key in fetchedData) {
                    dataToUse.push(fetchedData[key]);
                }
            }
            setYear(dataToUse)
            setRenderYear(true)
        });
        refreshPage();
    }

    function refreshPage() {
        setTimeout(() => window.location.reload(), 300000)
    }

    function createArrayOfDates() {
        var response = [];
        for (let i = 0; i < temperature.length; i++) {
            response.push(moment(new Date(year[i], month[i], day[i], hour[i], minutes[i])).format("DD-MMTHH:mm"))
        }
        return response
    }

    useEffect(() => {
        getDataFromFirebase(quantity)
    }, []);

    if (validateIfRender()) {
        generateObjectToDisplay();
    }

    const data = generateObjectToDisplay();

    return (
        <div>
            <LineChart
                title={"Hola muinda"}
                width={1000}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis type={"number"} domain={['100', '300']}/>
                <Tooltip/>
                <Legend/>
                <Line
                    type="monotone"
                    dataKey="Temperatura"
                    stroke="#8884d8"
                    activeDot={{r: 8}}
                />
            </LineChart>
            <p className="notes">Grafica de temperatura en el tiempo</p>
        </div>
    );
}
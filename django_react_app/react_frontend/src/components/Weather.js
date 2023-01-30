import { useEffect, useState, useContext } from "react";
import { Typography } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';
import Loading from "./Loading";

function Weather({latitude, longitude}) {
    const [latitudeLongitudeLoaded, setLatitudeLongitudeLoaded] = useState(false);
    const [weather, setWeather] = useState(null);
    const {authTokens} = useContext(UserAuthContext);

    useEffect(() => {
        if(isNaN(latitude) === false && isNaN(longitude) === false) {
            getWeather();
        }
    }, [latitude, longitude]);

    async function getWeather() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/weather/latitude/${latitude}/longitude/${longitude}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/weather/latitude/${latitude}/longitude/${longitude}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            setWeather(data);
            setLatitudeLongitudeLoaded(true);
        }
    }

    return (
        <div>
            {latitudeLongitudeLoaded ? (
                <div>
                    <img src={weather.weather_icon} style={{ width: "35%", backgroundColor: "#88E0F3" }} alt="not found"/>
                    <Typography variant="h6"><b>{weather.weather_description}</b></Typography>
                    <Typography variant="h6"><b>Current Temp: </b>{weather.temperature_f}°F</Typography>
                    <Typography variant="h6"><b>Low Temp: </b>{weather.temperature_min_f}°F</Typography>
                    <Typography variant="h6"><b>High Temp: </b>{weather.temperature_max_f}°F</Typography>
                </div>
            ) : (
                <div>
                    <Loading/>
                </div>
            )}
        </div>
    );
}

export default Weather;
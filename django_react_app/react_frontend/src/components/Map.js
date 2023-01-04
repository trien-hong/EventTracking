import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Typography } from '@mui/material';

function Map({latitude, longitude}) {
    const [value, setValue] = useState(null);
    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_OPENWEATHERMAP_API});

    useEffect(() => {
        checkValues();
    }, [latitude, longitude]);

    function checkValues() {
        if (isNaN(latitude) === true || isNaN(longitude) === true) {
            setValue(
                <Typography variant="h5">There seems to be an error. Doesn't look like a specific location was provided for this event. Therefore, no maps will be displayed.</Typography>
            );
        } else {
            setValue(
                <GoogleMap zoom={16} center={{lat: latitude, lng: longitude}} mapContainerClassName="map-container"></GoogleMap>
            );
        }
    }

    return (
        <div>
            {isLoaded ? (
                <div>
                    {value}
                </div>
            ) : (
                <div>
                    <Typography variant="h5">There seems to be an error with making an API call.</Typography>
                </div>
            )}
        </div>
    );
}

export default Map;
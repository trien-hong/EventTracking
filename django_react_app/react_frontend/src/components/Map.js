import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Typography } from '@mui/material';
import Loading from './Loading';
import atm_icon from '../assets/atm_icon.png';
import center_icon from '../assets/center_icon.png';
import parking_icon from '../assets/parking_icon.png';

function Map({latitude, longitude}) {
    const [latitudeLongitudeLoaded, setLatitudeLongitudeLoaded] = useState(false);
    const [center, setCenter] = useState({lat: 0, lng: 0});
    const [atmCoordinates, setAtmCoordinates] = useState([]);
    const [parkingCoordinates, setParkingCoordinates] = useState([]);
    // const [hotelCoordinates, setHotelCoordinates] = useState([]);
    const [libraries] = useState(["places"]);
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY,
        libraries
    });

    useEffect(() => {
        if(isNaN(latitude) === false && isNaN(longitude) === false) {
            setCenter({lat: latitude, lng: longitude});
            setLatitudeLongitudeLoaded(true);
        }
    }, [latitude, longitude]);
    
    function getNearByServices(map) {
        const atm = {
            location: center,
            radius: 1000,
            types: ["atm"]
        };

        const parking = {
            location: center,
            radius: 1000,
            types: ["parking"]
        };

        // const hotel = {
        //     location: center,
        //     radius: 1000,
        //     types: ["hotel"]
        // };

        var service = new window.google.maps.places.PlacesService(map);
        
        service.nearbySearch(atm, getAtm);
        service.nearbySearch(parking, getParking);
        // service.nearbySearch(hotel, getHotel);
    }

    function getAtm(results, status) {
        const array = [];
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                array.push(results[i]);
            }
            setAtmCoordinates(array);
        }
    }

    function getParking(results, status) {
        const array = [];
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                array.push(results[i]);
            }
            setParkingCoordinates(array);
        }
    }

    // function getHotel(results, status) {
    //     const array = [];
    //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //         for (var i = 0; i < results.length; i++) {
    //             array.push(results[i]);
    //         }
    //         setHotelCoordinates(array);
    //     }
    // }

    return (
        <div>
            {latitudeLongitudeLoaded ? (
                <div>
                    {isLoaded ? (
                        <div>
                            <Typography sx={{ my: 2 }} variant="h5">
                                <img style={{ width: "4%", verticalAlign: "middle" }} src={atm_icon} alt="not found"/> = ATM &nbsp;|&nbsp;
                                <img style={{ width: "4%", verticalAlign: "middle" }} src={center_icon} alt="not found"/> = VENUE &nbsp;|&nbsp;
                                <img style={{ width: "4%", verticalAlign: "middle" }} src={parking_icon} alt="not found"/> = PARKING
                            </Typography>
                            <GoogleMap zoom={15} center={center} onLoad={(map) => { getNearByServices(map); }} mapContainerClassName="map-container">
                                <MarkerF position={center} icon={center_icon}/>
                                {atmCoordinates.map((coordinates, i) =>
                                    <MarkerF position={coordinates.geometry.location} icon={atm_icon} key={i}/>
                                )}
                                {parkingCoordinates.map((coordinates, i) =>
                                    <MarkerF position={coordinates.geometry.location} icon={parking_icon} key={i}/>
                                )}
                                {/* {hotelCoordinates.map((coordinates, i) =>
                                    <MarkerF position={coordinates.geometry.location} key={i}/>
                                )} */}
                            </GoogleMap>
                        </div>
                    ) : (
                        <div>
                            <Loading/>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Loading/>
                </div>
            )}
        </div>
    );
}

export default Map;
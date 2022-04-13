var map;

function initMap() {
    var longitude = document.getElementById("longitude").value;
    var latitude  = document.getElementById("latitude").value;
 
    //these were from the Maps JavaScript API
    //https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-html
    
    const uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: uluru,
    });

    var atmRequest = {
        location: uluru,
        radius: 1250,
        types: ["atm"]
    };

    var parkingRequest = {
        location: uluru,
        radius: 1250,
        types: ["parking"]
    };

    // var hotelRequest = {
    //     location: uluru,
    //     radius: 1250,
    //     types: ["hotel"]
    // };
    
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(atmRequest, getAtms);
    service.nearbySearch(parkingRequest, getParking);
    // service.nearbySearch(hotelRequest, getHotel);

    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: "https://img.icons8.com/plasticine/50/000000/google-maps-new.png"
    });
}

function getAtms(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createAtmMarker(results[i])
        }
    }
}

function createAtmMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: "https://img.icons8.com/fluency/35/000000/atm.png"
    });
}

function getParking(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createParkingMarker(results[i])
        }
    }
}

function createParkingMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: "http://maps.google.com/mapfiles/ms/micons/parkinglot.png"
    });
}

// function getHotel(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createHotelMarker(results[i])
//         }
//     }
// }

// function createHotelMarker(place) {
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location,
//         icon: "http://maps.google.com/mapfiles/kml/pal2/icon28.png"
//     });
// }
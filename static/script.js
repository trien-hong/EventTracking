function initMap() {
    var longitude = document.getElementById("longitude").value;
    var latitude  = document.getElementById("latitude").value;

    const uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: uluru,
    });

    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}
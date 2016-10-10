// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  var map = new google.maps.Map(document.getElementById('googlemap'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var DengueCaseCentral = new google.maps.KmlLayer({
     url: 'https://firebasestorage.googleapis.com/v0/b/thediscoverers-99fb8.appspot.com/o/DengueCaseCentral.kml?alt=media&token=add8aa82-161a-489c-8655-bbda0bc48b03',
     map: map
   });

   var DengueCaseNortheastArea = new google.maps.KmlLayer({
      url: 'https://firebasestorage.googleapis.com/v0/b/thediscoverers-99fb8.appspot.com/o/DengueCaseNortheastArea.kml?alt=media&token=99ef32bb-7568-4626-9844-c5c87ee81009',
      map: map
    });


    var DengueCaseNorthwest = new google.maps.KmlLayer({
       url: 'https://firebasestorage.googleapis.com/v0/b/thediscoverers-99fb8.appspot.com/o/DengueCaseNorthwest.kml?alt=media&token=d1e987da-6299-4130-a260-32241c7de035',
       map: map
     });

     var DengueSouthEast = new google.maps.KmlLayer({
        url: 'https://firebasestorage.googleapis.com/v0/b/thediscoverers-99fb8.appspot.com/o/DengueCaseSoutheast.kml?alt=media&token=803f994b-b7e8-45c9-9f1f-71bb0414f5e0',
        map: map
      });

      var DengueSouthWest = new google.maps.KmlLayer({
         url: 'https://firebasestorage.googleapis.com/v0/b/thediscoverers-99fb8.appspot.com/o/DengueCaseSouthwest.kml?alt=media&token=eb0a03ae-d3df-422c-9f48-a771089fa96b',
         map: map
       });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

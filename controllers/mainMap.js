
       document.write('script type="text/javascript" src="../public/assets/global/js/firebase.js" ></script>');
       document.write('script type="text/javascript" src="../public/assets/pages/js/gmaps.js" ></script>');



       var table = firebase.database().ref('/locations/bloodbank');
       var count = 0;
       table.on('value', function(snapshot) {

         snapshot.forEach(function() {
           count++;
         });
   //count is now safe to use.

          });



          var table = firebase.database().ref('/locations/breastscreening');
          var breastcount = 0;
          table.on('value', function(snapshot) {

              snapshot.forEach(function() {
                breastcount++;
               });
         //count is now safe to use.

                });


                var table = firebase.database().ref('/locations/chas');
                var chascount = 0;
                table.on('value', function(snapshot) {

                    snapshot.forEach(function() {
                      chascount++;
                     });
               //count is now safe to use.

                      });

                      var table = firebase.database().ref('/locations/quitcentres');
                      var quitcount = 0;
                      table.on('value', function(snapshot) {

                          snapshot.forEach(function() {
                            quitcount++;
                           });
                     //count is now safe to use.

                            });

                            var table = firebase.database().ref('/locations/cervicalscreening');
                            var cliniccount = 0;
                            table.on('value', function(snapshot) {

                                snapshot.forEach(function() {
                                  cliniccount++;
                                 });
                           //count is now safe to use.
                                  });

                                  var table = firebase.database().ref('/DengueCases/Central');
                                  var DCcount = 0;
                                  table.on('value', function(snapshot) {

                                      snapshot.forEach(function() {
                                        DCcount++;
                                       });
                                 //count is now safe to use.

                                        });

                                        var table = firebase.database().ref('/DengueCases/Northeast');
                                        var DNEcount = 0;
                                        table.on('value', function(snapshot) {

                                            snapshot.forEach(function() {
                                              DNEcount++;
                                             });
                                       //count is now safe to use.

                                              });

                                              var table = firebase.database().ref('/DengueCases/Northwest');
                                              var DNWcount = 0;
                                              table.on('value', function(snapshot) {

                                                  snapshot.forEach(function() {
                                                    DNWcount++;
                                                   });
                                             //count is now safe to use.

                                                    });


                                                    var table = firebase.database().ref('/DengueCases/Southeast');
                                                    var DSEcount = 0;
                                                    table.on('value', function(snapshot) {

                                                        snapshot.forEach(function() {
                                                          DSEcount++;
                                                         });
                                                   //count is now safe to use.

                                                          });


                                                          var table = firebase.database().ref('/DengueCases/Southwest');
                                                          var DSWcount = 0;
                                                          table.on('value', function(snapshot) {

                                                              snapshot.forEach(function() {
                                                                DSWcount++;
                                                               });
                                                         //count is now safe to use.

                                                                });

                                                           var table = firebase.database().ref('/ZIKACases/ZIKA');
                                                          var ZIKAcount = 0;
                                                          table.on('value', function(snapshot) {

                                                              snapshot.forEach(function() {
                                                                ZIKAcount++;
                                                                document.getElementById("test").innerHTML = ZIKAcount;
                                                               });
                                                         //count is now safe to use.

                                                                });

                                                          




map = new GMaps({
  div: '#map',
  lat: 1.3017,
  lng: 103.8382,
  zoom : 18
});



GMaps.geolocate({
success: function(position){
map.setCenter(position.coords.latitude, position.coords.longitude);
map.addMarker({
  lat: position.coords.latitude,
  lng: position.coords.longitude,
  title: "Current Location",
  infoWindow: {
    content : "You are here."
  }
});
},
error: function(error){
alert('Geolocation failed: '+error.message);
},
not_supported: function(){
alert("Your browser does not support geolocation");
},

});

      map.addControl({
        position: 'top_right',
        content: 'Show current location',
        style: {
          margin: '5px',
          padding: '1px 6px',
          border: 'solid 1px #717B87',
          background: '#fff'
        },
        events: {
          click: function(){
            GMaps.geolocate({
              success: function(position){
                map.setCenter(position.coords.latitude, position.coords.longitude);
              },
              error: function(error){
                alert('Geolocation failed: ' + error.message);
              },
              not_supported: function(){
                alert("Your browser does not support geolocation");
              }
            });
          }
        }
      });



function locate()
{


 
  GMaps.geolocate({
  success: function(position){
  map.setCenter(position.coords.latitude, position.coords.longitude);

  
  map.addMarker({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    title: "Current Location",
    infoWindow: {
      content : "You are here."
    }
  });

  },
  error: function(error){
  alert('Geolocation failed: '+error.message);
  },
  not_supported: function(){
  alert("Your browser does not support geolocation");
  },

  });

map.setZoom(18);

}

function panOut()
{

  map = new GMaps({
    div: '#map',
    lat: 1.3521,
    lng: 103.8198,
    zoom : 11
  });
  
 
  map.setCenter('1.3521', '103.8198');
     map.addControl({
        position: 'top_right',
        content: 'Show current location ',
        style: {
          margin: '5px',
          padding: '1px 6px',
          border: 'solid 1px #717B87',
          background: '#fff'
        },
        events: {
          click: function(){
          locate();
          }
        }
      });


}
        //fill up this part with database data///////

  ///////////////////////////

 function bloodbank(){


   panOut();


   var i;
   for(i=0; i < count ; i++)
   {
   var starCountRef = firebase.database().ref('/locations/bloodbank/' + i);
   starCountRef.on('value', function(snapshot) {
     

     map.addMarker({
       lat: snapshot.val().latitude,
       lng: snapshot.val().longitude,
       title: 'Dengue1',
       infoWindow: {
          content: '<a href="appointment_new.html?type=BreastScreening&name='+ snapshot.val().name +  '">' + snapshot.val().name + '</a>'


                    }
                  });
                });
              }
            }


  function breastscreening(){

            panOut();


              var i;
              for(i=0; i < breastcount ; i++)
              {
              var starCountRef = firebase.database().ref('/locations/breastscreening/' + i);
              starCountRef.on('value', function(snapshot) {

                map.addMarker({
                  lat: snapshot.val().latitude,
                  lng: snapshot.val().longitude,
                  title: 'Breasts Screening',
                  infoWindow: {
                    content: '<a href="appointment_new.html?type=BreastScreening&name='+ snapshot.val().name +  '">' + snapshot.val().name + '</a>'

                               }
                             });
                           });
                         }
                       }



function chas()
{
  panOut();


    var i;
    for(i=0; i < chascount ; i++)
    {
    var starCountRef = firebase.database().ref('/locations/chas/' + i);
    starCountRef.on('value', function(snapshot) {

      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'CHAS',
        infoWindow: {
       content: '<a href="appointment_new.html?type=BreastScreening&name='+ snapshot.val().name +  '">' + snapshot.val().name + '</a>'


                     }
                   });
                 });
               }

}

function quitCentre()
{
   panOut();


    var i;
    for(i=0; i < quitcount ; i++)
    {
    var starCountRef = firebase.database().ref('/locations/quitcentres/' + i);
    starCountRef.on('value', function(snapshot) {

      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'Quit Centres',
        infoWindow: {
          content: '<a href="appointment_new.html?type=BreastScreening&name='+ snapshot.val().name +  '">' + snapshot.val().name + '</a>'


                     }
                   });
                 });
               }
}


function clinic()
{
   panOut();

    var i;
    for(i=0; i < cliniccount ; i++)
    {
    var starCountRef = firebase.database().ref('/locations/cervicalscreening/' + i);
    starCountRef.on('value', function(snapshot) {

      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'Clinic',
        infoWindow: {
          content: '<a href="appointment_new.html?type=BreastScreening&name='+ snapshot.val().name +  '">' + snapshot.val().name + '</a>'


                     }
                   });
                 });
               }
}



function dengueCentral()
{
   panOut();

    var i;
    for(i=0; i < DCcount ; i++)
    {
    var starCountRef = firebase.database().ref('/DengueCases/Central/' + i);
    starCountRef.on('value', function(snapshot) {

      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'Clinic',
     
                   });
                 });
               }

}

function dengueNortheast()
{
   panOut();

    var i;
    for(i=0; i < DNEcount ; i++)
    {
    var starCountRef = firebase.database().ref('/DengueCases/Northeast/' + i);
    starCountRef.on('value', function(snapshot) {

      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'Clinic',
        
                   });
                 });
               }

}


function dengueNorthwest()
{
   panOut();

    var i;
    for(i=0; i < DNWcount ; i++)
    {
    var starCountRef = firebase.database().ref('/DengueCases/Northwest/' + i);
    starCountRef.on('value', function(snapshot) {

      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'Clinic',
       
                   });
                 });
               }

}


function dengueSoutheast()
{
   panOut();

    var i;
    for(i=0; i < DSEcount ; i++)
    {
    var starCountRef = firebase.database().ref('/DengueCases/Southeast/' + i);
    starCountRef.on('value', function(snapshot) {


      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'Clinic',
       
                   });
                 });
               }

}


function dengueSouthwest()
{
   panOut();

    var i;
    for(i=0; i < DSWcount ; i++)
    {
    var starCountRef = firebase.database().ref('/DengueCases/Southwest/' + i);
    starCountRef.on('value', function(snapshot) {


      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'Clinic',
       
                   });
                 });
               }

}



function zika()
{


panOut();

    var i;
    for(i=0; i < ZIKAcount ; i++)
    {
    var starCountRef = firebase.database().ref('/ZIKACases/ZIKA/' + i);
    starCountRef.on('value', function(snapshot) {

        
        
      map.addMarker({
        lat: snapshot.val().latitude,
        lng: snapshot.val().longitude,
        title: 'ZIKA',
       
                   });
                 });
               }

}



book
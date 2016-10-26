function writeNewAppointment(uid, type, location, date, time, remarks, bookingdate) {
  // A post entry.
  var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd='0'+dd
            } 

            if(mm<10) {
                mm='0'+mm
            } 

            today = dd+'/'+mm+'/'+yyyy;

  var postData = {
    type: type,
    location: location,
    date: date,
    time: time,
    remarks: remarks,
    bookingdate: today,
    status: "Confirmed"
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('appointments').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/appointments/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);

}

function onSelect(){


        
        var db = firebase.database();
        var locationsRef = db.ref("locations");
        var submitbtn = document.getElementById('submitbtn');
        var type = document.getElementById('type');
        var type2 = type.options[type.selectedIndex].value;
        var location = document.getElementById('location');

         var i;
    for(i = location.options.length - 1 ; i >= 1 ; i--)
    {
        location.remove(i);
    }



                            var ref3 = locationsRef.child(type2).orderByChild("name").on("value", function(snapshot) {
                    snapshot.forEach(function (child) {
                        console.log(child.val().name);

                        var el = document.createElement("option");
                        el.textContent = child.val().name;
                        el.value = child.val().name;
                        location.appendChild(el);
                    });
                });
}

  window.onload = function() {
    var uid;
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            uid = user.uid;
            console.log(uid);
        }
    });


        submitbtn.addEventListener('click', function() {
        var type = document.getElementById('type');
        var type2 = type.options[type.selectedIndex].text;
        var location = document.getElementById('location');
        var location2 = location.options[location.selectedIndex].text;
        var date = document.getElementById('date').value;
        var time = document.getElementById('time');
        var time2 = time.options[time.selectedIndex].text;
        var remarks = document.getElementById('remarks').value;
        var currentdate = new Date(); 
        writeNewAppointment(uid, type2, location2, date, time2, remarks, currentdate);
        console.log("success");
        window.location = "appointment_manage.html";
        });

      
    };
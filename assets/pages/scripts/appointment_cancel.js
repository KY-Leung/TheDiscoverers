function getAppointments() {
            firebase.auth().onAuthStateChanged(function(user){
                if(user){
                    var uid = user.uid;
                    console.log(uid);
                    var db = firebase.database();
                    var appointmentsRef = db.ref("appointments");
                    var bookingid = sessionStorage.getItem('bookingid');
                    var ref3 = appointmentsRef.child(uid).child(bookingid).on("value", function(snapshot) {
                         console.log(snapshot.val().type);

                         document.getElementById("bookingid").textContent = bookingid;
                         document.getElementById("type").textContent = snapshot.val().type;
                         document.getElementById("location").textContent = snapshot.val().location;
                         document.getElementById("date").textContent = snapshot.val().date;
                         document.getElementById("time").textContent = snapshot.val().time;
                         document.getElementById("remarks").textContent = snapshot.val().remarks;
                    });
                }
            });
        }

        function cancelAppointment(){
            firebase.auth().onAuthStateChanged(function(user){
                if(user){
                    var uid = user.uid;
                    console.log(uid);
                    var db = firebase.database();
                    var appointmentsRef = db.ref("appointments");
                    var bookingid = sessionStorage.getItem('bookingid');
                    console.log("inside cancelAppointment method");
                    appointmentsRef.child(uid).child(bookingid).update({status: "Cancelled"});
                    alert("You appointment has been cancelled.");
                    window.location = "appointment_manage.html"
                }
            });
        }

        function initApp() {
            var logoutbtn = document.getElementById('logoutbtn');
            var cancelbtn = document.getElementById('cancelbtn');

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    console.log("in initapp");
                    getAppointments();
                    var db = firebase.database();
                    var scoresRef = db.ref("appointments");

                    cancelbtn.addEventListener('click', function() {
                        cancelAppointment();
                        console.log("inside cancelbtn event listener")
                    });

                    logoutbtn.addEventListener('click', function() {
                        firebase.auth().signOut();
                        window.location = "page_user_login_1.html"
                    });
                } else {
                    window.location = "page_user_login_1.html";
                }
            });
        }

        window.onload = function() {
            initApp();
        };
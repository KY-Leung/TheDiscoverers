var uid;
var entries = new Array();

$(document).ready(function() {
    console.log("i am in header");
    setTimeout(function () {
        console.log("i am in set timeout");
        $('#TABLE').DataTable( {
            data: entries,
            columns: [
                { title: "#" },
                { title: "Type" },
                { title: "Location" },
                { title: "Date" },
                { title: "Time" },
                { title: "Remarks" },
                { title: "Booking Date" },
                { title: "Booking ID" },
                { title: "Status" }
            ]
        } );
    },2550);
    
} );

        function getAppointments() {
            console.log(uid);
            var db = firebase.database();
            var appointmentsRef = db.ref("appointments");

            var count = 0; //To keep track of the array and also for index

            var myTableDiv = document.getElementById("container");
            var table = document.getElementById('TABLE');
            var tableBody = document.getElementById('TBODY');
            var tableHead = document.getElementById('THEAD');

            table.border = '1'
            table.appendChild(tableBody);

           

            var tr = document.createElement('tr');
           

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

            console.log(today);

            var ref3 = appointmentsRef.orderByKey().equalTo(uid).on("value", function(snapshot) {
                console.log(snapshot.numChildren());
                console.log(snapshot.val());
                snapshot.forEach(function(data) {
                    data.forEach(function(childData) {
                        //childData.val().status!="Cancelled"
                        if(childData.val().date < today || childData.val().status!="Confirmed"){
                            console.log(childData.val().remarks);
                        entries[count] = new Array(count + 1, childData.val().type, childData.val().location, childData.val().date, childData.val().time, childData.val().remarks, childData.val().bookingdate, childData.getKey(), childData.val().status);
                        console.log(entries[count]);
                        count++;
                    }
                    });
                    for (i = 0; i < entries.length; i++) {
                        var tr = document.createElement('tr');
                        
                        tr.id = "row" + i;

                        for (j = 0; j < entries[i].length; j++) {
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode(entries[i][j]));
                            tr.appendChild(td)
                        }
                        tableBody.appendChild(tr);
                    }
                    myTableDiv.appendChild(table)
                });
                console.log(entries.length + "entries length");

            });
        }

        function initApp() {
            var logoutbtn = document.getElementById('logoutbtn');

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    uid = user.uid;
                    getAppointments();
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
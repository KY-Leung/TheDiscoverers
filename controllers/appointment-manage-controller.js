var uid;
var entries = new Array();

$(document).ready(function() {
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
                { title: "Status" },
                { title: "Actions" }
            ]
        } );
    },2500);
        
        console.log(entries.length + " entries length");

        
} );


        $('#TABLE').on('draw.dt', function() {
            if(entries.length >0){
                 console.log("i am in page change");
        var table = document.getElementById('TABLE');
        for (var r = 1, n = table.rows.length; r < n; r++) {
            for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
                if(c==(table.rows[r].cells.length-1)){   
                table.rows[r].cells[c].innerHTML = '<div class="btn-group"><button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions <i class="fa fa-angle-down"></i></button>'+
                                '<ul class="dropdown-menu" role="menu"><li><a href="javascript:;"><i class="icon-docs"></i> Edit </a></li><li><a onclick="clicked(this.parentNode.parentNode.parentNode.parentNode.parentNode);"><i onclick="clicked(this);" class="icon-tag"></i> Cancel Appointment </a></li></ul></div>';
                }
            }
        }
            }
        });
       


       function clicked(evt) {
            var tbody = document.getElementById('TBODY');
            var bookingid;
            bookingid = evt.cells[7].innerHTML;
               
            sessionStorage.setItem('bookingid', bookingid);
            window.location = "appointment_cancel.html"
        }



        function getAppointments() {
            console.log(uid);
            var db = firebase.database();
            var appointmentsRef = db.ref("appointments");
             //To store the appointment entries
            var count = 0; //To keep track of the array and also for index

            var myTableDiv = document.getElementById("container");
            var table = document.getElementById('TABLE');
            var tableBody = document.getElementById('TBODY');
            var tableHead = document.getElementById('THEAD');
            console.log("i am in getAppointments after table declaration")

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


            var ref3 = appointmentsRef.orderByKey().equalTo(uid).on("value", function(snapshot) {
                console.log(snapshot.numChildren());
                console.log(snapshot.val());
                snapshot.forEach(function(data) {
                    data.forEach(function(childData) {
                        //childData.val().status!="Cancelled"

                        if(childData.val().date >= today && childData.val().status!="Cancelled"){
                        entries[count] = new Array(count + 1, childData.val().type, childData.val().location, childData.val().date, childData.val().time, childData.val().remarks, childData.val().bookingdate, childData.getKey(), childData.val().status,"");
                        count++;
                    }
                    });
                    for (i = 0; i < entries.length; i++) {
                        var tr = document.createElement('tr');
                        
                        tr.id = "row" + i;
                        //tr.addEventListener("click", clicked);
                        //mouseclic.addEventListener("click", clicked);

                        for (j = 0; j < entries[i].length; j++) {
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode(entries[i][j]));
                            tr.appendChild(td);
                            //if(j==entries[i].length-1){   
                                //console.log("I am in innerHTML");
  
                                 //td.innerHTML = '<div class="btn-group"><button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions <i class="fa fa-angle-down"></i></button>'+
                                 //                       '<ul class="dropdown-menu" role="menu"><li><a href="javascript:;"><i class="icon-docs"></i> Edit </a></li><li><a onclick="clicked(this.parentNode.parentNode.parentNode.parentNode.parentNode);"><i onclick="clicked(this);" class="icon-tag"></i> Cancel Appointment </a></li></ul></div>';
                                
                               // tr.appendChild(document.createTextNode("hello"));
                            //}
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
                    console.log("I am in initApp")
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
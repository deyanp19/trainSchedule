// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMZjbvJ92EbgB09oa8zj_FsYL0Va5LTvo",
    authDomain: "train-schedule-535f1.firebaseapp.com",
    databaseURL: "https://train-schedule-535f1.firebaseio.com",
    projectId: "train-schedule-535f1",
    storageBucket: "",
    messagingSenderId: "693311659805"
  };
  firebase.initializeApp(config);
 var database =  firebase.database();
  //Initial Values
//   var trainName;
//   var destination;
//   var frequency;
//   var nextArrival;
//   var minutesAway;
//   var firstTrainTime;

  // big allert- use this variable to refer to the database data

 
  $("#submit").on("click", function() {
    event.preventDefault(); 
    
    // get input values

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    //rate = parseInt($("#employeeRate").val().trim());
    //console.log(frequency);

    //time schedule in Firevase
    database.ref().push( {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP  
    });
    database.ref().on("child_added", function(childSnapshot) {
        trainName: childSnapshot.val().trainName;
        destination: childSnapshot.val().destination;
        firstTrainTime: firstTrainTime.val().firstTrainTime;
        frequency: childSnapshot.val().frequency
        // call the table body HTML element and select it using jQuery
        // create variable that can be used to create dinamically table rows
        var tBody = $("tbody");
        var tRow = $("<tr>");
        var sv = childSnapshot.val();
        
        var trainNameTd = $("<td>").text(sv.trainName);
        var destinationTd = $("<td>").text(sv.destination);
        var firstTrainTimeTd = $("<td>").text(sv.firstTrainTime);
        var frequencyTd = $("<td>").text(sv.frequency);

        // append the firebase data to our frintend table
        tRow.append(trainNameTd, destinationTd, firstTrainTimeTd, frequencyTd);
        // append the row to the document
        tBody.append(tRow);
    });
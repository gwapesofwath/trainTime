
var config = {
    apiKey: "AIzaSyD6ha4hnt4bMAUhzJOMnFVVDAxlSZcNBpE",
    authDomain: "traintime-db860.firebaseapp.com",
    databaseURL: "https://traintime-db860.firebaseio.com",
    projectId: "traintime-db860",
    storageBucket: "",
    messagingSenderId: "375393719457"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //setup variables

  $("#add-info").on("click", function(event) {

    event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var frequency = $("#frequency").val().trim();
  var firstTrainTime = $("#trainTime").val().trim();

  database.ref().push({
            name: trainName,
            destination: destination,
            trainTime: firstTrainTime,
            frequency: frequency});
  
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().trainTime;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);

    var firstTimeConverted = moment(trainTime, "HH:mma").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var timeRemaining = frequency - (Math.floor(diffTime % frequency));

    var nextTrain = diffTime > 0 ? moment().add(minTilTrain, "minutes").format("HH:mm"): moment(minTilTrain, "hh:mm");

    var minTilTrain = frequency - timeRemaining;


    var row = ("<tr>");

    $("#new-train").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minTilTrain + "</td>");
});



  
  // function generateRows(trainData){
  //   //   <tr>
  //   //   <th scope="row"></th>
  //   //   <td></td>
  //   //   <td></td>
  //   //   <td></td>
  //   //   <td></td>
  //   // </tr>
  //   var tRow = $("<tr>");
  //   var tHead = $("<th scope='row'>");
  //   var tdName = $("<td>");
  //   var tdDestination = $("<td>");
  //   var tdFrequency = $("<td>");
  //   var tdFirstTrainTime = $("<td>");
  //   var tdNextArrival = $("<td>");
  //   var tdMinutesAway = $("<td>");

  //   tHead.text(trainData.name);
  //   tdDestination.text(trainData.destination);
  //   tdFirstTrainTime.text(trainData.firstTrainTime);
  //   tdFrequency.text(trainData.frequency);
  //   tdNextArrival.text(trainData.nextArrival);
  //   tdMinutesAway.text(trainData.minutesAway);

    
  //   tRow.append(tHead);
  //   tRow.append(tdDestination);
  //   tRow.append(tdFrequency);
  //   tRow.append(tdNextArrival);
  //   tRow.append(tdMinutesAway);
    
  //   $("tbody").append(tRow);
  // };

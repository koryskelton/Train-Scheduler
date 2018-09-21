
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAEx-HueAuymPNuCJGK505t78fOCq82H0o",
    authDomain: "train-4f7ca.firebaseapp.com",
    databaseURL: "https://train-4f7ca.firebaseio.com",
    projectId: "train-4f7ca",
    storageBucket: "train-4f7ca.appspot.com",
    messagingSenderId: "565099803623"
  };
  firebase.initializeApp(config);

  var database= firebase.database();

// Button for adding trains to fire base
$("#submitbtn").on("click", function(event) {
  event.preventDefault();

  // user input
  var trainName = $("#train_name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime =  $("#first_train").val().trim();
  var frequency = $("#frequency").val().trim();
  

  // object for holding train 
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
  };

  // push train to database
  database.ref().push(newTrain);

  // Logs to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);

  alert("Train added successfully");

  // Clears all boxes
  $("#train_name").val("");
  $("#destination").val("");
  $("#first_train").val("");
  $("#frequency").val("");
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;
  var nextArrival = timearrive;
  var minutesAway = minTilTrain;

  
  var firstTrainTime = moment(firstTime, "HH:mm").subtract(1, "years");  
  console.log("TIME CONVERTED: " + firstTrainTime);
    
  var diffTime = moment.duration(moment().diff(moment(firstTime, "HH:mm")), 'milliseconds').asMinutes(); 
    
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var timeRemaining = frequency - (Math.floor(diffTime) % frequency); 
  console.log("TIME REMAINING: " + timeRemaining);

  var nextArrival = diffTime > 0 ? moment().add(timeRemaining, 'minutes' ) : moment(firstTime, "HH:mm") ; 
  
  var timearrive = moment(nextArrival).format("HH:mm");
  
  var minTilTrain = Math.ceil(moment.duration(moment(nextArrival).diff(moment()), 'milliseconds').asMinutes()); 
  console.log("MINUTES TILL TRAIN: " + minTilTrain);
  
  
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(timearrive),
    $("<td>").text(minTilTrain)
  );

  
  $(".table > tbody").append(newRow);
});
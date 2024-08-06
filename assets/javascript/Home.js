const firebaseConfig = {
    apiKey: "AIzaSyD5pqDw2o4AyjiARrFEP8nBwG4g2kmRStQ",
    authDomain: "nhan-3660d.firebaseapp.com",
    databaseURL: "https://nhan-3660d-default-rtdb.firebaseio.com",
    projectId: "nhan-3660d",
    storageBucket: "nhan-3660d.appspot.com",
    messagingSenderId: "1054276103106",
    appId: "1:1054276103106:web:428ec651a347fa0b39045b",
    measurementId: "G-27TGW7MZDB"
  };
  firebase.initializeApp(firebaseConfig);


  firebase.database().ref("/LivingRoom/smoke").on("value", function(snapshot) {
    var smk = snapshot.val();
    var smokeStatus = document.getElementById("smoke_node1");
    
    if (smk === "ON") {
      smokeStatus.innerHTML = "DETECTED";
      smokeStatus.style.color = "red";
    } else {
      smokeStatus.innerHTML = "NOT DETECTED";
      smokeStatus.style.color = "black";
    }
    
    console.log("khói: " + smk);
  });
  
  firebase.database().ref("/LivingRoom/fire").on("value", function(snapshot) {
    var fire = snapshot.val();
    var fireStatus = document.getElementById("fire_node1");
    
    if (fire === "ON") {
      fireStatus.innerHTML = "DETECTED";
      fireStatus.style.color = "red";
    } else {
      fireStatus.innerHTML = "NOT DETECTED";
      fireStatus.style.color = "black";
    }
    
    console.log("lửa: " + fire);
  });
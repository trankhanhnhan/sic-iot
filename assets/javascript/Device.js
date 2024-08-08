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
    
  //-------------------AUTO LOAD SENSOR-------------------------
    firebase.database().ref("/LivingRoom/nhietdo").on("value",function(snapshot){
      var nd = snapshot.val();  
      document.getElementById("nhietdo").innerHTML = nd;
      console.log("nhiệt độ: " + nd);
    });
    
    firebase.database().ref("/LivingRoom/doamkk").on("value",function(snapshot){
      var da = snapshot.val();  
      document.getElementById("doamkk").innerHTML = da;
      console.log("độ ẩm: " + da);
    });
  
    firebase.database().ref("/LivingRoom/khigas").on("value",function(snapshot){
      var gas = snapshot.val();  
      document.getElementById("khigas").innerHTML = gas;
      console.log("khí gas: " + gas);
    });

    var fireStatus = "OFF";
    var smokeStatus = "OFF";
    var fireAlarmStatus = "OFF";

function checkFireAndSmokeStatus() {
    const alarmSound = document.getElementById('alarmSound');

    if (fireAlarmStatus === "ON" && (fireStatus === "ON" || smokeStatus === "ON")) {
        if (alarmSound.paused) {
            alarmSound.play().catch(error => console.error('Error playing sound:', error));
        }
    } else {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
}

firebase.database().ref("/LivingRoom/fireAlarm").on("value", function(snapshot) {
  if (snapshot.exists()) {
      fireAlarmStatus = snapshot.val();
      var fireAlarmInput = document.getElementById("fireAlarm");
      var textfireAlarm = document.getElementById("textfireAlarm");
      var fireAlarm = document.getElementById("firealarm");

      if (fireAlarmInput && textfireAlarm) {
          fireAlarmInput.checked = (fireAlarmStatus === "ON");
          textfireAlarm.textContent = fireAlarmStatus;
          textfireAlarm.style.color = (fireAlarmStatus === "ON") ? "red" : "black";
          fireAlarm.style.color = (fireAlarmStatus === "ON") ? "red" : "#6a7076";
      }

      checkFireAndSmokeStatus();
  } else {
      console.log("No data available for fireAlarm!");
  }
});

document.getElementById("fireAlarm").addEventListener("change", function() {
  var fireAlarmInput = document.getElementById("fireAlarm");

  if (fireAlarmInput.checked) {
      firebase.database().ref("/LivingRoom/fireAlarm").set("ON");
  } else {
      firebase.database().ref("/LivingRoom/fireAlarm").set("OFF");
      
      alert("If you turn off Fire Alarm. You will not receive a notification if there is smoke or fire. Please attention!");
  }
});

window.addEventListener('load', function() {
  firebase.database().ref("/LivingRoom/fireAlarm").once('value').then(function(snapshot) {
      if (snapshot.exists()) {
          fireAlarmStatus = snapshot.val();
          checkFireAndSmokeStatus();
      }
  }).catch(error => console.error('Error fetching fireAlarm status:', error));
});

firebase.database().ref("/LivingRoom/smoke").on("value", function(snapshot) {
    smokeStatus = snapshot.val();
    var smokeStatusElem = document.getElementById("smoke_node1");
    var smokeNode1 = document.getElementById("smoke_node1_id");

    if (smokeStatus === "ON") {
        smokeStatusElem.innerHTML = "DETECTED";
        smokeStatusElem.style.color = "red";
        smokeNode1.classList.add("zooming2");
    } else {
        smokeStatusElem.innerHTML = "NOT DETECTED";
        smokeStatusElem.style.color = "black";
        smokeNode1.classList.remove("zooming2");
    }

    console.log("khói: " + smokeStatus);
    checkFireAndSmokeStatus();
});

firebase.database().ref("/LivingRoom/fire").on("value", function(snapshot) {
    fireStatus = snapshot.val();
    var fireStatusElem = document.getElementById("fire_node1");
    var fireNode1 = document.getElementById("firesensor_node1_id");

    if (fireStatus === "ON") {
        fireStatusElem.innerHTML = "DETECTED";
        fireStatusElem.style.color = "red";
        fireNode1.classList.add("zooming1");
    } else {
        fireStatusElem.innerHTML = "NOT DETECTED";
        fireStatusElem.style.color = "black";
        fireNode1.classList.remove("zooming1");
    }

    console.log("lửa: " + fireStatus);
    checkFireAndSmokeStatus();
});

document.getElementById("fireAlarm").addEventListener("change", function() {
    var fireAlarmInput = document.getElementById("fireAlarm");

    if (fireAlarmInput.checked) {
        firebase.database().ref("/LivingRoom/fireAlarm").set("ON");
    } else {
        firebase.database().ref("/LivingRoom/fireAlarm").set("OFF");
    }
});

  //----------------CONNECT LIGHT TO FIREBASE-----------------
  firebase.database().ref("/LivingRoom/light").on("value", function(snapshot) {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        var lightStatus = snapshot.val();
        var lightInput = document.getElementById("light");
        var textLight = document.getElementById("textlight");
        var theLight = document.getElementById("thelight");
  
        if (lightInput && textLight && theLight) {
            lightInput.checked = (lightStatus === "ON");
            textLight.textContent = lightStatus;
            textLight.style.color = (lightStatus === "ON") ? "red" : "black";
            theLight.style.color = (lightStatus === "ON") ? "#dbdb0bed" : "#6a7076";
        }
    } else {
        console.log("No data available for light!");
    }
  });
  
  
  //-----------------CONTROL LIGHT FROM THE WEB----------------------
  var lightInput = document.getElementById('light');
  if (lightInput) {
    lightInput.addEventListener('change', function() {
        var lightState = this.checked ? "ON" : "OFF";
        firebase.database().ref("/LivingRoom").update({
            "light": lightState
        });
        var textLight = document.getElementById("textlight");
        if (textLight) {
            textLight.textContent = lightState;
            textLight.style.color = (lightState === "ON") ? "red" : "black";
        }
    });
  }
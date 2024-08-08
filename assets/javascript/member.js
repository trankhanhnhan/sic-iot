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

const alarmSound = document.getElementById('alarmSound');

firebase.database().ref("/LivingRoom/fireAlarm").on("value", function(snapshot) {
    if (snapshot.exists()) {
        const fireAlarmStatus = snapshot.val();
        
        if (fireAlarmStatus === "ON") {
            if (alarmSound.paused) {
                alarmSound.play().catch(error => console.error('Error playing sound:', error));
            }
        } else {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
    }
});

firebase.database().ref("/LivingRoom/fire").on("value", function(snapshot) {
    if (snapshot.exists()) {
        const fireStatus = snapshot.val();

        if (fireStatus === "ON") {
            if (alarmSound.paused) {
                alarmSound.play().catch(error => console.error('Error playing sound:', error));
            }
        } else {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
    }
});

firebase.database().ref("/LivingRoom/smoke").on("value", function(snapshot) {
    if (snapshot.exists()) {
        const smokeStatus = snapshot.val();

        if (smokeStatus === "ON") {
            if (alarmSound.paused) {
                alarmSound.play().catch(error => console.error('Error playing sound:', error));
            }
        } else {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
    }
});

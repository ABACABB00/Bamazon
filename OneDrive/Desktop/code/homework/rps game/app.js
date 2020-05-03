var config = {
    apiKey: "AIzaSyDrUaHf9hr1GQEEmi6WKWgR6B197XQUZ_M",
    authDomain: "form-application-640ec.firebaseapp.com",
    databaseURL: "https://form-application-640ec.firebaseio.com",
    projectId: "form-application-640ec",
    storageBucket: "form-application-640ec.appspot.com",
    messagingSenderId: "486904912418",
    appId: "1:486904912418:web:779554f921aadf949a087b",
    measurementId: "G-NCC9KBNY7F"
  };
  firebase.initializeApp(config);
  
 
  var messagesRef = firebase.database().ref('messages');
  
 
  
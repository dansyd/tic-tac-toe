var config = {
    apiKey: "AIzaSyASv5mqjGniNdmzc80PMYNxlJI--TWLhJM",
    authDomain: "tic-tac-toe-a7067.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-a7067.firebaseio.com",
    storageBucket: "tic-tac-toe-a7067.appspot.com",
    messagingSenderId: "949178931152"
  };
firebase.initializeApp(config);

const dbRefObject = firebase.database().ref().child('game');

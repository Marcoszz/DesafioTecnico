import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCoZcfPh1AIfM-MkbqbA-vyGkcozp6MHrI",
  authDomain: "mysched-503a0.firebaseapp.com",
  databaseURL: "https://mysched-503a0-default-rtdb.firebaseio.com",
  projectId: "mysched-503a0",
  storageBucket: "mysched-503a0.appspot.com",
  messagingSenderId: "350496308747",
  appId: "1:350496308747:web:216365b7224f12a1ae110e",
  measurementId: "G-ZKG5WSQY8R"
};

firebase.initializeApp(firebaseConfig);


export default firebase;
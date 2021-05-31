import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA5V6L7_f0cksyn6Er0n1z7A3GP2nrMQcc",
    authDomain: "chatclone-ace62.firebaseapp.com",
    databaseURL: "https://chatclone-ace62.firebaseio.com",
    projectId: "chatclone-ace62",
    storageBucket: "chatclone-ace62.appspot.com",
    messagingSenderId: "608492234033",
    appId: "1:608492234033:web:a11763b0db74544185bc10",
    measurementId: "G-X7YPEWS5S7"
  };
  

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;
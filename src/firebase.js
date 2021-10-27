import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

            apiKey: "AIzaSyCghO7NfTfq6Jl-tmBwaE7a890XvtCbeQ0",
            authDomain: "instagram-clone-react-21454.firebaseapp.com",
            projectId: "instagram-clone-react-21454",
            storageBucket: "instagram-clone-react-21454.appspot.com",
            messagingSenderId: "105222350457",
            appId: "1:105222350457:web:efd71c3eddca0d6238d6a8"
      
    });

    const db = firebaseApp.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage();
    
    export {db, auth, storage};
  // export default db;s
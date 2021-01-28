import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAggPwAa_qA717LIAOAap4fHY7Gg1Bc-mk",
    authDomain: "signalcloned.firebaseapp.com",
    projectId: "signalcloned",
    storageBucket: "signalcloned.appspot.com",
    messagingSenderId: "629136115868",
    appId: "1:629136115868:web:3431b008a8ef54ebcdc559"
  };
  let app;
  if(firebase.apps.length===0){ //initialize app if it haven't been
    app=firebase.initializeApp(firebaseConfig)
  }
  else{
    app=firebase.app();
  }
  const db=app.firestore();
  const auth=firebase.auth();

  export {db,auth};
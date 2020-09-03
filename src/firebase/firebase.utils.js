import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBHiDIyvSgqI7eR4SdfpXwcpdQ2Zr5l-mo",
  authDomain: "crown-db-de9d3.firebaseapp.com",
  databaseURL: "https://crown-db-de9d3.firebaseio.com",
  projectId: "crown-db-de9d3",
  storageBucket: "crown-db-de9d3.appspot.com",
  messagingSenderId: "301239239760",
  appId: "1:301239239760:web:8ba6f9c8c540351429fd55",
  measurementId: "G-5CD4CZWCHW"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
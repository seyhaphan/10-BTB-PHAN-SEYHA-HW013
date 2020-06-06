import firebase from 'firebase/app';
import 'firebase/storage'

const firebaseConfig = {
   apiKey: "AIzaSyAqLkP7FaACy35_E_IjCZg1uX0Z0HtP0Vo",
   authDomain: "react-js-upload-images.firebaseapp.com",
   databaseURL: "https://react-js-upload-images.firebaseio.com",
   projectId: "react-js-upload-images",
   storageBucket: "react-js-upload-images.appspot.com",
   messagingSenderId: "311390949241",
   appId: "1:311390949241:web:d0854f5fa42d7b0ad529a8",
   measurementId: "G-W5LZESKKF6"
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
export { storage, firebase as default };
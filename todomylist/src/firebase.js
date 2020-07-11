import firebase from 'firebase/app'
import 'firebase/firestore';
const firebaseConfig=firebase.initializeApp({ 
    apiKey: "AIzaSyCxc7vxhpUyNvJGBtS78GT6wszwC7c2-9M",
    authDomain: "todolist-ericleung.firebaseapp.com",
    databaseURL: "https://todolist-ericleung.firebaseio.com",
    projectId: "todolist-ericleung",
    storageBucket: "todolist-ericleung.appspot.com",
    messagingSenderId: "317436854624",
    appId: "1:317436854624:web:f46ae8c2c552748dbb1e05",
    measurementId: "G-TNPMTELK9B"
})
export {firebaseConfig as firebase};
import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRGQhddl1ncIWeQs6-CHJbheF1xaPFfR0",
    authDomain: "dropbox-57291.firebaseapp.com",
    projectId: "dropbox-57291",
    storageBucket: "dropbox-57291.appspot.com",
    messagingSenderId: "838242084721",
    appId: "1:838242084721:web:f3b7b78b1a360b334338d0",
    measurementId: "G-ZD9365VQF0"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
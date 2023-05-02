import { getAuth } from '@firebase/auth';
import { initializeApp, getApps } from 'firebase/app';



export const firebaseConfig = {
    apiKey: "AIzaSyDVE8vqdxMruFlgvN0JtOv1c6qaohw0v90",
    authDomain: "travelapp12-2eddc.firebaseapp.com",
    projectId: "travelapp12-2eddc",
    storageBucket: "travelapp12-2eddc.appspot.com",
    messagingSenderId: "1090135174394",
    appId: "1:1090135174394:web:772f7f6f487bbc918ead43",
    measurementId: "G-J77T34T9PX"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export default app;
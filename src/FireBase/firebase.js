import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword ,signInWithPopup,signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyBg-hB_v4m7WDvxiAk4_aTZzlxhtzPURYo",
    authDomain: "eshop-5268f.firebaseapp.com",
    projectId: "eshop-5268f",
    storageBucket: "eshop-5268f.appspot.com",
    messagingSenderId: "142203534807",
    appId: "1:142203534807:web:ae4470070931f79e019f92"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export function singup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export function singin(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}
export function singout() {
    return signOut(auth)
}
export function signInWithGoogle( password) {
    return signInWithPopup(auth, password)
}
export function sendPassword(email) {
    return sendPasswordResetEmail(auth, email)
}


export default app

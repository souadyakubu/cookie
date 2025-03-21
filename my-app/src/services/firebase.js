import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC1KjHJ94kApyNCj-GTlebIMXGmUvNW6K8",
    authDomain: "cooking-3d97a.firebaseapp.com",
    projectId: "cooking-3d97a",
    storageBucket: "cooking-3d97a.firebasestorage.app",
    messagingSenderId: "892633833123",
    appId: "1:892633833123:web:2cbf07be14ed7a9742a916",
    measurementId: "G-97BW6V738J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const registerWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user };
    } catch (error) {
        return { error: error.message };
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user };
    } catch (error) {
        return { error: error.message };
    }
};

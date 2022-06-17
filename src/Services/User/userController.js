import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const userLogin = async (email, password) => {
    const auth = getAuth();
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    }
    catch (error) {
        return error.FirebaseError;
    }
}
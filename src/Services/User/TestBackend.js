import { collection, getDocs, getFirestore } from "firebase/firestore";
import {db} from '../../Firebase/firebaseConfig';

export const UseTestingBackend= async()=>{
    return await getDocs(collection(db, "categorias"));
}
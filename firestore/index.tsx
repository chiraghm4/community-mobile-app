import { getFirestore, collection, addDoc } from 'firebase/firestore'
import {app} from '@/FirebaseConfig'
export const db = getFirestore(app);
import { db } from "@/firestore"
import { collection, getDocs, query } from "firebase/firestore"

const getAllCommunities = async () => {
    const q = query(collection(db, 'communities'))
    const qSnap = await getDocs(q);
    const docsData = qSnap.docs.map(doc => ({id: doc.id, ...doc.data()}))
    return docsData
}

const subscribeCommunity = async () => {
    
}

export {getAllCommunities, subscribeCommunity}
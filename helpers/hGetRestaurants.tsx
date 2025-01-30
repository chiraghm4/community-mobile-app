import { db } from "@/firestore"
import { collection, getDocs, query } from "firebase/firestore"

export const getRestaurants = async () => {
    try {

        const restaurantRef = collection(db, 'restaurants')
        const q = query(restaurantRef)

        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) {
            return {error: "no restaurants found"}
        }

        const docsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return docsData;

    } catch(e) {
        console.error(e)
    }
}
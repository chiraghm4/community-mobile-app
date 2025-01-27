import { db } from "@/firestore"
import { getAuth } from "firebase/auth"
import { collection, getDocs, query } from "firebase/firestore"

const getRecipes = async () => {

    try {
        const auth = getAuth()
        const currUser = auth.currentUser

        const recipesRef = collection(db, 'recipes');

        const q = query(recipesRef);
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) console.log('no recipes found')

        const recipesData = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });

        //   console.log(recipesData)
          return recipesData;
    } catch (e) {
        console.log(e)
    }
}

export {getRecipes}
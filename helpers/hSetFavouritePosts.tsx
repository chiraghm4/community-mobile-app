import { db } from "@/firestore";
import { getAuth } from "firebase/auth";
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const setPostAsFavourite = async (postId : string) => {
    try{
        const auth = getAuth();
        const currUser = auth.currentUser;
        if (!currUser) {
            console.log("User is not authenticated");
            return;
        }
        const userRef = collection(db, "users");
        const q = query(userRef, where("userId", "==", currUser.uid));
        const querySnapshot = await getDocs(q);
 
        if (querySnapshot.empty) {
            console.log("No user found with this userId.");
            return;
        }

        const userDoc = querySnapshot.docs[0];
        const userDocRef = userDoc.ref;

        const userDocData = userDoc.data();
        const currentFavourites = userDocData.favourites || [];

        if (currentFavourites.includes(postId)) {
            await updateDoc(userDocRef, {
                favourites: arrayRemove(postId), 
            });
            console.log("Post removed from favourites.");
        } else {
            await updateDoc(userDocRef, {
                favourites: arrayUnion(postId), 
            });
            console.log("Post added to favourites.");
        }
        
    }
    catch(e){
        console.log(e);
        return e;
    }
}

export {setPostAsFavourite};
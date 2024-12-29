import { getAuth } from "firebase/auth";
import { db } from '@/firestore';
import { collection, getDocs, query, where } from "firebase/firestore";

const GetFavouritePosts =  async () => { 
    try{
        const auth = getAuth();
        const currUser = auth.currentUser;

        const userRef = collection(db, "users");
        
        const favPostsQuery = query(userRef, where("userId", "==", currUser?.uid));
        const querySnapshot = await getDocs(favPostsQuery);


        // Fix the data access
        const favouritePosts = querySnapshot.docs[0]?.data()?.favourites || [];
        return favouritePosts;
    }
    catch(e){
        console.log(e);
        return;
    }

}

export {GetFavouritePosts}
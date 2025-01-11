import { getAuth } from "firebase/auth";
import { db } from "@/firestore";
import {
    addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GetFavouritePosts } from "./hGetFavouritePosts";

const likePost = async (postid : string) => {
    try{
        const auth = getAuth();
        const currUser = auth.currentUser;
        const currUserId = currUser?.uid;

        const likeRef = await addDoc(collection(db,"likes"),
            {
                userid : currUserId,
                postid : postid
            }
        )
    }
    catch(e){
        console.log(e);
    }
}

const removeLikeFromPost = async (postid : string) => {
    try{
        const auth = getAuth();
        const currUser = auth.currentUser;
        const currUserId = currUser?.uid;

        const refToCurrLikeId = collection(db,"likes");
        const queryToGETCurrLikeId = query(refToCurrLikeId, where("userid", "==", currUserId),where("postid","==",postid));
        
        const currentLikeId = await getDocs(queryToGETCurrLikeId); 

        const docRef = doc(db, "likes", currentLikeId.docs[0].id);
        await deleteDoc(docRef);
    }
    catch(e){
        console.log(e);
    }
}

export {likePost, removeLikeFromPost}
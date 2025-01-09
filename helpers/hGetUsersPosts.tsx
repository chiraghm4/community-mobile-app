import { getAuth } from "firebase/auth";
import { db } from "@/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GetFavouritePosts } from "./hGetFavouritePosts";

const getUserCommunities = async () => {
  try {
    const auth = getAuth();
    const currUser = auth.currentUser;
    const userRef = collection(db, "users");

    const q = query(userRef, where("userId", "==", currUser?.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) console.log("empty");

    const userData = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    const subscribedComms = userData[0]?.communities;

    return {subscribedComms, userData};
  } catch (e) {
    console.log(e);
    return e;
  }
};

const fetchPostsByCommunities = async () => {
  try {
    const {subscribedComms} = await getUserCommunities();
    const favPostsList = await GetFavouritePosts();
    const postsRef = collection(db, "posts");

    const q = query(postsRef, where("community", "in", subscribedComms));
    const querySnapshot = await getDocs(q);

    const postsData = querySnapshot.docs.map((doc) => {
      const isFav = favPostsList?.includes(doc.id);
      return {
        ...doc.data(),
        id: doc.id,
        docID: doc.id,
        isFavourite: isFav || false,
      };
    });

    if(querySnapshot.empty)
      return {error: "error occured in helper func"}

    return postsData

  } catch (e) {
    console.log(e);
  }
};

export { getUserCommunities, fetchPostsByCommunities };

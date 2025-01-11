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

const fetchLikedPostsByUsers = async () => {
  try {
    const auth = getAuth();
    const currUser = auth.currentUser;
    
    if (!currUser) {
      throw new Error("No authenticated user found");
    }

    const refToGetLikedPosts = collection(db, "likes");
    const queryToGetLikedPosts = query(
      refToGetLikedPosts,
      where("userid", "==", currUser.uid)
    );
    const likedPostsSnapshot = await getDocs(queryToGetLikedPosts);
    console.log(currUser.uid);
    return likedPostsSnapshot.docs.map(doc => {
      return doc.data().postid;
    });
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    throw error;
  }
};


const fetchPostsByCommunities = async () => {
  try {
    const auth = getAuth();
    const currUser = auth.currentUser;
    const {subscribedComms} = await getUserCommunities();
    const favPostsList = await GetFavouritePosts();
    const postsRef = collection(db, "posts");

    const q = query(postsRef, where("community", "in", subscribedComms));
    const querySnapshot = await getDocs(q);
    const allLikedPosts = await getDocs(collection(db, "likes"))
    const likedPostsList = await fetchLikedPostsByUsers();
    // Create a map of postId to like count
    const likesCountMap = new Map();
    allLikedPosts.docs.forEach(doc => {
      const likeData = doc.data();
      const postId = likeData.postid;
      likesCountMap.set(postId, (likesCountMap.get(postId) || 0) + 1);
    });

    const postsData = querySnapshot.docs.map((doc) => {
      const isFav = favPostsList?.includes(doc.id);
      const isLiked = likedPostsList?.includes(doc.id);
      return {
        ...doc.data(),
        id: doc.id,
        docID: doc.id,
        isFavourite: isFav || false,
        isLiked : isLiked || false,
        numberOfLikes: likesCountMap.get(doc.id) || 0 
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

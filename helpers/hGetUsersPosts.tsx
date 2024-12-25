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

const getUserCommunities = async () => {
  try {
    const auth = getAuth();
    const currUser = auth.currentUser;
    console.log(currUser?.uid, "current user");

    const userRef = collection(db, "users");

    const q = query(userRef, where("userId", "==", currUser?.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) console.log("empty");

    const userData = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    const subscribedComms = userData[0]?.communities;

    return subscribedComms;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const fetchPostsByCommunities = async () => {
  try {
    const subscribedComms = await getUserCommunities();
    console.log(subscribedComms);

    const postsRef = collection(db, "posts");

    const q = query(postsRef, where("community", "in", subscribedComms));
    const querySnapshot = await getDocs(q);

    const postsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if(querySnapshot.empty)
      return {error: "error occured in helper func"}

    return postsData

  } catch (e) {
    console.log(e);
  }
};

export { getUserCommunities, fetchPostsByCommunities };

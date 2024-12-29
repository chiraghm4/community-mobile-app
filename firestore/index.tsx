import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/FirebaseConfig";
export const db = getFirestore(app);

export const addNewPost = async (
  title: string,
  body: string,
  userID: string,
  community: string
) => {
  addDoc(collection(db, "posts"), {
    title,
    body,
    userID,
    community,
  });
};

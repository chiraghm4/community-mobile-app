import { db } from "@/firestore";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const getAllCommunities = async () => {
  const q = query(collection(db, "communities"));
  const qSnap = await getDocs(q);
  const docsData = qSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return docsData;
};

const subscribeCommunity = async (commID: string) => {
  try {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    const userRef = collection(db, "users");
    const q = query(userRef, where("userId", "==", uid));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { error: "No user of this userId" };
    }

    const userDataRef = querySnapshot.docs[0].ref;

    const userCommData = querySnapshot.docs[0].data().communities;

    const commRef = collection(db, 'communities')
    const q2 = query(commRef)

    const commQuerySnapshot = await getDocs(q2)

    if(commQuerySnapshot.empty) {
        return {error: "No community found with given id"}
    }

    const commDataRef = commQuerySnapshot.docs[0].ref
    const commData = commQuerySnapshot.docs[0].data()

    console.log(commData, 'communities collection ka data')

    if (userCommData.includes(commID)) {
      await updateDoc(userDataRef, {
        communities: arrayRemove(commID),
      });

      await updateDoc(commDataRef, {
        subscribedUsers: arrayRemove(uid)
      })
    } else {
      await updateDoc(userDataRef, {
        communities: arrayUnion(commID),
      });

      await updateDoc(commDataRef, {
        subscribedUsers: arrayUnion(uid)
      })
    }
  } catch (e) {
    console.log(e);
  }
};

export { getAllCommunities, subscribeCommunity };

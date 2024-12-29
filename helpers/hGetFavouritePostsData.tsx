import { getAuth } from "firebase/auth";
import { db } from '@/firestore';
import { collection, documentId, getDocs, query, where } from "firebase/firestore";


const hGetFavouritePostsData = async () => {
  try{
    const auth = getAuth();
    const currUser = auth.currentUser;

    const userRef = collection(db, "users");
    
    const favPostsQuery = query(userRef, where("userId", "==", currUser?.uid));
    const querySnapshot = await getDocs(favPostsQuery);


    // First get the array of favorite post IDs
    const favouritePosts = querySnapshot.docs[0]?.data()?.favourites || [];

    // Check if we have any favorites
    if (!favouritePosts.length) {
        console.log("No favorites found");
        return [];
    }

    // Filter out any empty strings or invalid IDs
    const validFavorites = favouritePosts.filter(id => id && typeof id === 'string' && id.length > 0);

    if (!validFavorites.length) {
        console.log("No valid favorite IDs found");
        return [];
    }

    // Query posts with valid IDs
    const postsRef = collection(db, "posts");
    const favPostsDataQuery = query(postsRef, where(documentId(), "in", validFavorites));
    const favPostsData = await getDocs(favPostsDataQuery);

    const favorites = favPostsData.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        docID: doc.id,
        isFavourite: true,
    }));

    return favorites;
  }
  catch(e){
    console.log(e);
    return;
  }
}

export { hGetFavouritePostsData }
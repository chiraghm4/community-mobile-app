import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Posts from "@/components/Posts";
// import AddNewForm from "@/components/Forms/AddNewForm";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firestore";
import { fetchPostsByCommunities } from "@/helpers/hGetUsersPosts";

type Post = {
  userID: string,
  title: string,
  tags: [string],
  imageURL: string,
  desc: string,
  community: string
}

export default function PostsPage() {
  // const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  // const [favourites,setFavourites] = useState(new Set());

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const postsData = await fetchPostsByCommunities();
  //       setPosts(postsData);
  //     } catch (e) {
  //       console.log("error fetching docs", e);
  //     }
  //   };
  //   getPosts();
  // }, []);

  // useEffect(() => {
  //   const auth = getAuth()
  //   const uid = auth.currentUser?.uid
  //   const userRef = collection(db, 'users')
  //   const q = query(userRef, where("userId", '==', uid))

  //   const unsub = onSnapshot(q, async (querySnapshot) => {
  //     try {
  //       const subscribedComms = querySnapshot.docs[0].data().communities
  //       console.log(subscribedComms, 'updated comms')
  //       const postsData = await fetchPostsByCommunities()
  //       setPosts(postsData)
  //     } catch(e) {
  //       console.log(e)
  //     }

  //     return () => unsub()
  //   })
  // }, [])

  // useEffect(() => {
  //   const query = collection(db,"likes");

  //   const unsubscribe = onSnapshot(query, async (querySnapshot) => {
  //     try{
  //       const postsData = await fetchPostsByCommunities();
  //       setPosts(postsData);
  //     }
  //     catch(e){
  //       console.log(e);
  //     }
  //   })
  //   return () => unsubscribe();
  // },[])

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return; // Ensure user is logged in before proceeding

    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("userId", "==", uid));
    const likesRef = collection(db, "likes");
    const postsRef = collection(db, "posts");

    // Listen for changes in user's subscribed communities and likes
    const unsubUser = onSnapshot(userQuery, async (userSnapshot) => {
      try {
        const subscribedComms = userSnapshot.docs[0]?.data()?.communities || [];
        console.log(subscribedComms, "Updated Communities");

        const postsData = await fetchPostsByCommunities(subscribedComms);
        setPosts(postsData);
      } catch (error) {
        console.log("Error updating posts from user communities:", error);
      }
    });

    const unsubLikes = onSnapshot(likesRef, async () => {
      try {
        const postsData = await fetchPostsByCommunities();
        setPosts(postsData);
      } catch (error) {
        console.log("Error updating posts from likes:", error);
      }
    });

    const unsubPosts = onSnapshot(postsRef, async () => {
      try {
        const postsData = await fetchPostsByCommunities();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      unsubUser();
      unsubLikes();
      unsubPosts();
    };
  }, [uid]);

  const handleUpdatePost = (updatedPost: any) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.docID === updatedPost.docID ? updatedPost : post
      )
    );
  };

  return (
    <View>
      <Posts Postings={posts} community="abc" onUpdatePost={handleUpdatePost} />
    </View>
  );
}

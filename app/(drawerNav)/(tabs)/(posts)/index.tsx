import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import Posts from "@/components/Posts";
import AddNewForm from "@/components/Forms/AddNewForm";
import { collection, getDocs, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import { db } from "@/firestore";
import { fetchPostsByCommunities } from '@/helpers/hGetUsersPosts'


export default function PostsPage() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favourites,setFavourites] = useState(new Set());
  const handleUpdatePost = (updatedPost: any) => {
    setPosts(currentPosts => 
      currentPosts.map(post => 
        post.docID === updatedPost.docID ? updatedPost : post
      )
    );
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPostsByCommunities();
        setPosts(postsData);
      } catch (e) {
        console.log("error fetching docs", e);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    const auth = getAuth()
    const uid = auth.currentUser?.uid
    const userRef = collection(db, 'users')
    const q = query(userRef, where("userId", '==', uid))

    const unsub = onSnapshot(q, async (querySnapshot) => {
      try {
        const subscribedComms = querySnapshot.docs[0].data().communities
        console.log(subscribedComms, 'updated comms')
        const postsData = await fetchPostsByCommunities()
        setPosts(postsData)
      } catch(e) {
        console.log(e)
      }

      return () => unsub()
    })
  }, [])

  useEffect(() => {
    const query = collection(db,"likes");

    const unsubscribe = onSnapshot(query, async (querySnapshot) => {
      try{
        const postsData = await fetchPostsByCommunities();
        setPosts(postsData);
      }
      catch(e){
        console.log(e);
      }
    }) 
    return () => unsubscribe();
  },[])

  return (
    <View>
      <Posts 
        Postings={posts}
        community="abc"
        onUpdatePost={handleUpdatePost}
      />
    </View>
  );
}

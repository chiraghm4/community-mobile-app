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
      <TouchableOpacity style={styleSheet.floatingButton}>
        <Text style={styleSheet.buttonText} onPress={() => setShowModal(true)}>
          + Post
        </Text>
        {showModal && (
          <AddNewForm
            showModal={showModal}
            handleClose={() => setShowModal(false)}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 24,
    paddingVertical: 17,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#bebebe",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
    boxShadow: "inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff",
  },
  buttonText: {
    fontWeight: "bold",
  },
});
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import PostData from "@/assets/Data/fakeData.json";
import Posts from "@/components/Posts";
import AddNewForm from "@/components/Forms/AddNewForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firestore";
import {fetchPostsByCommunities} from '@/helpers/hGetUsersPosts'

export default function PostsPage() {
  const getPosts = useMemo(() => PostData.dataMedium, []);
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

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

  return (
    <View>
      <Posts Postings={posts} community="abc" />
      <TouchableOpacity style={styleSheet.floatingButton}>
        <Text style={styleSheet.buttonText} onPress={() => setShowModal(true)}>
          + Post
        </Text>
        {showModal ? (
          <AddNewForm
            showModal={showModal}
            handleClose={() => setShowModal(!showModal)}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "#e0e0e0", // Soft gray to match neumorphic style
    paddingHorizontal: 24, // Add padding for better button size
    paddingVertical: 17,
    borderRadius: 25, // Pill-shaped button
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#bebebe", // Inset shadow to simulate "pressed" effect
    shadowOffset: { width: 4, height: 4 }, // Shadow to make it look "pressed"
    shadowOpacity: 0.5, // Darker shadow for depth
    shadowRadius: 6, // Slightly larger radius for shadow
    elevation: 4, // Elevation for Android devices
    boxShadow: "inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff", // Pushed-in shadow effect
  },
  buttonText: {
    fontWeight: "bold",
  },
});

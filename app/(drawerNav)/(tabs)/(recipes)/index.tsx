import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import Posts from "@/components/Posts";
import AddNewForm from "@/components/Forms/AddNewForm";
import { collection, getDocs, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import { db } from "@/firestore";
import { fetchPostsByCommunities } from '@/helpers/hGetUsersPosts'
import RecipeCard from "@/components/RecipesCard";
import PostsData from '@/assets/Data/fakeRecipes.json'


export default function RecipePage() {

  const posts = useMemo(() => PostsData.fakeRecipes, [])
  
  return (
    <View>
      <RecipeCard 
        Postings={posts}
        // community="abc"
        // onUpdatePost={handleUpdatePost}
      />
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
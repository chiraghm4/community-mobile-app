import { View, Text, Button } from "react-native";
import React from "react";
import { getAuth, signOut } from "@firebase/auth";
import { router } from "expo-router";

const PostsPage = () => {
  const auth = getAuth();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.replace('/(login)')
    } catch (e) {
      console.log(e);
    }
  };

  return (  
    <View>
      <Text>PostsPage</Text>
      <Button title="log out" onPress={handleLogOut} />   
    </View>
  );
};

export default PostsPage;

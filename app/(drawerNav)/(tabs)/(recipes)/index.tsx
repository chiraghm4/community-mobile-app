import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";

const RecipesPage = () => {
  const auth = getAuth();
  return (
    <View>
      <Text>RecipesPage</Text>
      <Button
        title="logout"
        onPress={() => {
          auth
            .signOut()
            .then(() => {
              console.log("user signed out");
              Alert.alert("user signed out");
              router.replace('/(login)')
            })
            .catch((e) => {
              console.log(e);
              Alert.alert(e);
            });
        }}
      />
    </View>
  );
};

export default RecipesPage;

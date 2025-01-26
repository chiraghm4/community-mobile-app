import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, User } from "@firebase/auth";
import { router } from "expo-router";

const WelcomePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);
  const auth = getAuth();

  // if (user) {
  //   router.replace("/(drawerNav)/(tabs)/(posts)");
  // }

  useEffect(() => {
    if (user) {
      router.replace("/(drawerNav)/(tabs)/(posts)");
    }
  }, [user]); 

  return (
    <View style={styleSheet.container}>
      <Text>Welcome!!</Text>
      <Text>You're not logged in.</Text>
      <Button title="Sign In" onPress={() => router.replace("/(login)")} />
    </View>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default WelcomePage;

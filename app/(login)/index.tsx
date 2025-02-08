import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { router } from "expo-router";
import { FormViewSignup, FormViewLogin } from "@/components/Forms";
import { db } from "@/firestore";
import { collection, addDoc } from "firebase/firestore";
import { app } from "@/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = () => {
  const [User, setUser] = useState();
  const auth = getAuth(app);
  const [createNewAcc, setCreateNewAcc] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(drawerNav)/(tabs)/(posts)");
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      //   trying to reflect the new user in firestore
      await addDoc(collection(db, "users"), {
        userId: user.user.uid,
        username,
        email,
        communities: [],
      });

      if (user) router.replace("/(drawerNav)/(tabs)/(posts)");

      console.log(AsyncStorage.getAllKeys());
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  const signOutUser = async () => {
    signOut(auth).then(() => {
      Alert.alert("user signed out");
      router.replace("/");
    });
  };

  if (User) router.push("/(tabs)/(posts)");

  return (
    <SafeAreaView style={styles.container}>
      {createNewAcc ? (
        <FormViewSignup actionHandler={signUp} />
      ) : (
        <FormViewLogin actionHandler={signIn} />
      )}

      <View
        style={{
          marginTop: 12,
        }}
      >
        {createNewAcc ? (
          <Text
            style={{
              color: "blue",
            }}
            onPress={() => setCreateNewAcc(!createNewAcc)}
          >
            Already have an account?
          </Text>
        ) : (
          <Text
            style={{
              color: "blue",
            }}
            onPress={() => setCreateNewAcc(!createNewAcc)}
          >
            Create a new account?
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA", // A softer white for a modern, minimalist background
  },
  title: {
    fontSize: 28, // A bit larger for a more striking appearance
    fontWeight: "800", // Extra bold for emphasis
    marginBottom: 40, // Increased space for a more airy, open feel
    color: "#1A237E", // A deep indigo for a sophisticated, modern look
  },
  textInput: {
    height: 50, // Standard height for elegance and simplicity
    width: "90%", // Full width for a more expansive feel
    backgroundColor: "#FFFFFF", // Pure white for contrast against the container
    borderColor: "#E8EAF6", // A very light indigo border for subtle contrast
    borderWidth: 2,
    borderRadius: 15, // Softly rounded corners for a modern, friendly touch
    marginVertical: 15,
    paddingHorizontal: 25, // Generous padding for ease of text entry
    fontSize: 16, // Comfortable reading size
    color: "#3C4858", // A dark gray for readability with a hint of warmth
    shadowColor: "#9E9E9E", // A medium gray shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Slightly elevated for a subtle 3D effect
  },
  button: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: "#5C6BC0", // A lighter indigo to complement the title color
    padding: 20,
    borderRadius: 15, // Matching rounded corners for consistency
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C6BC0", // Shadow color to match the button for a cohesive look
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: "#FFFFFF", // Maintained white for clear visibility
    fontSize: 18, // Slightly larger for emphasis
    fontWeight: "600", // Semi-bold for a balanced weight
  },
});

export default LoginPage;

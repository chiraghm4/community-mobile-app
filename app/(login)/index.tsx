import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { router } from "expo-router";
import { FormViewSignup, FormViewLogin } from "@/components/Forms";
import { db } from "@/firestore";
import { collection, addDoc } from "firebase/firestore";
import { app } from "@/FirebaseConfig";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LoginPage = () => {
  const [User, setUser] = useState();
  const auth = getAuth(app);
  const [createNewAcc, setCreateNewAcc] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(drawerNav)/(tabs)/(posts)");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        userId: user.user.uid,
        username,
        email,
        communities: [],
      });
      if (user) router.replace("/(drawerNav)/(tabs)/(posts)");
    } catch (error: any) {
      Alert.alert("Sign up failed", error.message);
    }
  };

  if (User) router.push("/(drawerNav)/(tabs)/(posts)");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="fitness" size={40} color="black" />
        </View>
        <Text style={styles.title}>Healthify</Text>
        <Text style={styles.subtitle}>Your Wellness Journey</Text>
      </View>

      <View style={styles.formContainer}>
        {createNewAcc ? (
          <FormViewSignup actionHandler={signUp} />
        ) : (
          <FormViewLogin actionHandler={signIn} />
        )}

        <Text
          style={styles.toggleText}
          onPress={() => setCreateNewAcc(!createNewAcc)}
        >
          {createNewAcc ? "Already have an account?" : "Create a new account?"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: '#f0f0f0',
  },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: 'black',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    opacity: 0.6,
  },
  formContainer: {
    flex: 1,
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  toggleText: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginPage;
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { Feather } from '@expo/vector-icons'
import { getAuth } from "firebase/auth";
import * as FileSystem from "expo-file-system";
import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from "@/firestore";

const ProfilePage = () => {
  const [username, setUsername] = useState('Username');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [email, changeEmail] = useState('Email');
  const [image, setImage] = useState("https://cdn-images-1.medium.com/max/1024/1*xYYZwY2MNMUUMv6nvZOooA.png");
  const [imagePath, setImagePath] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [previousUsername, setPreviousUsername] = useState("");

  useEffect(() => { 
    const getData = async () => {
      try{
        const auth = getAuth();
        const currUser = auth.currentUser;
        const userRef = collection(db, "users");
        const q = query(userRef, where("userId", "==", currUser.uid));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];
        const profileUrl = userDoc.data().profileImage;
        const userName = userDoc.data().username;
        const userEmail = userDoc.data().email;
        const storedImagePath = userDoc.data().imagePath;
        setImagePath(storedImagePath);
        setImage(profileUrl);
        setUsername(userName);
        changeEmail(userEmail);
      }
      catch(e){
        console.log("Error in fetching user data");
      }
    }
    getData();
  },[]);

  const updateUsername = async (newUsername: string, previousUsername : string) => {

    if (!newUsername || newUsername.trim() === '') {
      Alert.alert('Error', 'Username cannot be empty');
      setUsername(previousUsername);
      return;
    }

    if (newUsername.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters long');
      setUsername(previousUsername);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
      Alert.alert('Error', 'Username can only contain letters, numbers, and underscores');
      setUsername(previousUsername);
      return;
    }
    
    try {
      const auth = getAuth();
      const currUser = auth.currentUser;
      
      if (!currUser) {
        Alert.alert('Error', 'You must be logged in to update your username');
        return;
      }
  
      const userRef = collection(db, "users");
      const q = query(userRef, where("userId", "==", currUser.uid));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        throw new Error("User document not found");
      }
  
      const userDoc = querySnapshot.docs[0];
      
      // Optional: Check for duplicate usernames
      const duplicateCheck = query(userRef, where("username", "==", newUsername));
      const duplicateSnapshot = await getDocs(duplicateCheck);
      if (!duplicateSnapshot.empty) {
        Alert.alert('Error', 'This username is already taken');
        setUsername(previousUsername);
        return;
      }
  
      // Update the document with new username
      await updateDoc(doc(db, "users", userDoc.id), {
        username: newUsername
      });
      Alert.alert('Success', 'Username updated successfully');
    } catch(e) {
      console.log("Error updating username:", e);
      setUsername(previousUsername);
      Alert.alert(
        "Error",
        "Failed to update username. Please try again later.",
        [{ text: "OK" }]
      );
    }
  };
  

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
  
      if (!result.canceled) {
        try {
          const imgURL = await updateImage(result.assets[0]);
          setImage(imgURL); // Update local state with the URL, not the URI

          // // Pass the whole asset object, not just the URI
          // await updateImage(result.assets[0]);
          // // Update local image state after successful upload
          setImage(result.assets[0].uri);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload image. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error selecting image. Please try again.");
    }
  };
  
  const updateImage = async (image) => {
    try {
      const auth = getAuth();
      const currUser = auth.currentUser;
      
      if (!image?.uri) {
        throw new Error("No image URI provided");
      }

      console.log("THIS IS IMAGE PATH");
      console.log(imagePath);
      // Delete previous image if path exists
      if (imagePath) {
        console.log("Trying to delete the images");
        const { error: deleteError } = await supabase.storage
          .from("community-app-assets")
          .remove([imagePath]);

        if (deleteError) {
          console.error("Error deleting old file:", deleteError);
        }
      }

      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: "base64",
      });

      const newFilePath = `${currUser?.uid}/profile_photo/${new Date().getTime()}.${
        image?.type === "image" ? "png" : "mp4"
      }`;
      
      const contentType = image?.type === "image" ? "image/png" : "video/mp4";
      
      const { data, error: uploadError } = await supabase.storage
        .from("community-app-assets")
        .upload(newFilePath, decode(base64), { contentType });

      if (uploadError) {
        throw new Error("Failed to upload image to storage");
      }

      const imagePublicURL = await supabase.storage
        .from("community-app-assets")
        .getPublicUrl(newFilePath);

      if (!imagePublicURL?.data?.publicUrl) {
        throw new Error("Failed to get public URL");
      }

      const imgURL = imagePublicURL.data.publicUrl;

      const userRef = collection(db, "users");
      const q = query(userRef, where("userId", "==", currUser.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User document not found");
      }

      const userDoc = querySnapshot.docs[0];
      
      // Store both the URL and path
      await updateDoc(doc(db, "users", userDoc.id), {
        profileImage: imgURL,
        imagePath: newFilePath
      });

      setImagePath(newFilePath);
      return imgURL;
    } catch (error) {
      console.error("Error in updateImage:", error);
      throw error;
    }
  };

  const toggleUsernameEdit = async () => {
    setPreviousUsername(username);
    if (isEditingUsername) {
      if (isUpdating) return; // Prevent multiple clicks
      
      setIsUpdating(true);
      try {
        await updateUsername(username,previousUsername);
        setIsEditingUsername(false);
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to update username. Please try again.",
          [{ text: "OK" }]
        );
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsEditingUsername(true);
    }
  };

  return (
<View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image }} 
          style={styles.ProfileImage}
        />
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={pickImage}
        >
          <MaterialIcons name="camera" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput 
          style={[
            styles.inputContainer, 
            isEditingUsername && styles.inputActive
          ]}
          onChangeText={setUsername}
          value={username}
          editable={isEditingUsername}
        />
        <TouchableOpacity 
          style={styles.innerEditButton} 
          onPress={toggleUsernameEdit}
          disabled={isUpdating}
        >
          <Feather 
            name={isEditingUsername ? (isUpdating ? "loader" : "check") : "edit"} 
            size={20} 
            color={isUpdating ? "#999" : "#666"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputContainer}
          onChangeText={changeEmail}
          value={email}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40
  },
  imageContainer: {
    position: 'relative',
  },
  ProfileImage: {
    width: 250,  
    height: 250, 
    borderRadius: 999,
    resizeMode: 'cover'
  },
  editButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#f0f0f0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputWrapper: {
    width: '80%',
    position: 'relative',
    marginTop: 40, // Changed from percentage to fixed value
  },
  inputContainer: {
    height: 65,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingRight: 45,
    borderRadius: 20,
    fontSize: 16,
    fontFamily : 'manro-sb'
  },
  inputActive: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  innerEditButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  }
})

export default ProfilePage


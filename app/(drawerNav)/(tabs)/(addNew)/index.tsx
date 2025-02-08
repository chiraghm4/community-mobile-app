import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { decode } from "base64-arraybuffer";
import { pushSupabaseURL2Firebase } from "@/helpers/hSupabaseImageHandler";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from "react-native-gesture-handler";
import { getAllCommunities } from "@/helpers/hSubscribeToComm";
// import StarRating from "react-native-star-rating-widget";
import styles, { pickerSelectStyles } from "@/app/styles/addNewPageStyles";

const AddNewPage = () => {
  const [image, setImage] = useState(null);
  const [pickerValue, setPickerValue] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState<string | undefined>("");
  const [postBody, setPostBody] = useState<string | undefined>("");
  const [postTags, setPostTags] = useState<string | undefined>("");

  const [recipeName, setRecipeName] = useState<string | undefined>("");
  const [recipeBody, setRecipeBody] = useState<string | undefined>("");

  const [restaurantName, setRestaurantName] = useState<string | undefined>("");
  const [restaurantAddress, setRestaurantAddress] = useState<
    string | undefined
  >("");

  const [communityName, setCommunityName] = useState<string | undefined>("");
  const [communityDesc, setCommunityDesc] = useState<string | undefined>("");

  const [communityDropdown, setCommunityDropdown] = useState("");
  const [communityDropdownItems, setCommunityDropdownItems] = useState([]);
  const [rating, setRating] = useState(0);

  const [modalVisible, setModalVisible] = useState(false); // Modal state

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleCommunityDropDownData = async () => {
      if (pickerValue === "posts") {
        const allData = await getAllCommunities();
        const dropdownItems = allData.map((doc) => ({
          label: doc?.title,
          value: doc.id,
        }));
        setCommunityDropdownItems(dropdownItems);
      }
    };
    handleCommunityDropDownData();
  }, [pickerValue]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const handleUpload = async () => {
    setLoading(true);
    try {
      let response;
      if (pickerValue === "posts") {
        response = await pushSupabaseURL2Firebase({
          postTitle,
          postBody,
          communityDropdown,
          image,
          postTags,
          pickerValue,
        });
      } else if (pickerValue === "recipes") {
        response = await pushSupabaseURL2Firebase({
          recipeName,
          recipeBody,
          image,
          pickerValue,
        });
      } else if (pickerValue === "restaurants") {
        response = await pushSupabaseURL2Firebase({
          restaurantName,
          restaurantAddress,
          rating,
          image,
          pickerValue,
        });
      } else if (pickerValue === "communities") {
        response = await pushSupabaseURL2Firebase({
          communityName,
          communityDesc,
          pickerValue,
        });
      } else {
        throw new Error("Invalid choice");
      }

      if (response) {
        // Clear input fields
        setLoading(false);
        setImage(null);
        setPostTitle("");
        setPostBody("");
        setPostTags("");
        setRecipeName("");
        setRecipeBody("");
        setRestaurantName("");
        setRestaurantAddress("");
        setCommunityName("");
        setCommunityDesc("");
        setPickerValue(null);
        setCommunityDropdown("");
        setRating(0);

        // Show success modal
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContent}>
          <Text style={styles.headerText}>Choose Category</Text>

          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              onValueChange={(value) => setPickerValue(value)}
              items={[
                { label: "Post", value: "posts" },
                { label: "Community", value: "communities" },
                { label: "Recipe", value: "recipes" },
                { label: "Restaurant", value: "restaurants" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a category...", value: null }}
            />
          </View>

          <View style={styles.formFields}>
            {pickerValue === "posts" && (
              <>
                <View style={styles.pickerWrapper}>
                  <RNPickerSelect
                    onValueChange={(value) => setCommunityDropdown(value)}
                    items={communityDropdownItems}
                    placeholder={{ label: "Choose a community", value: null }}
                    style={pickerSelectStyles}
                  />
                </View>
                <TextInput
                  placeholder="Title"
                  value={postTitle}
                  onChangeText={setPostTitle}
                  style={styles.input}
                  placeholderTextColor="#666"
                />
                <TextInput
                  placeholder="Body"
                  value={postBody}
                  onChangeText={setPostBody}
                  style={[styles.input, styles.bodyInput]}
                  multiline
                  placeholderTextColor="#666"
                />
                <TextInput
                  placeholder="Tags (Space separated)"
                  value={postTags}
                  onChangeText={setPostTags}
                  style={styles.input}
                  placeholderTextColor="#666"
                />
              </>
            )}

            {pickerValue === "recipes" && (
              <>
                <TextInput
                  placeholder="Recipe Name"
                  value={recipeName}
                  onChangeText={setRecipeName}
                  style={styles.input}
                  placeholderTextColor="#666"
                />
                <TextInput
                  placeholder="Recipe Body"
                  value={recipeBody}
                  onChangeText={setRecipeBody}
                  style={[styles.input, styles.bodyInput]}
                  multiline
                  placeholderTextColor="#666"
                />
              </>
            )}

            {pickerValue === "restaurants" && (
              <>
                <TextInput
                  placeholder="Restaurant Name"
                  value={restaurantName}
                  onChangeText={setRestaurantName}
                  style={styles.input}
                  placeholderTextColor="#666"
                />
                <TextInput
                  placeholder="Restaurant Address"
                  value={restaurantAddress}
                  onChangeText={setRestaurantAddress}
                  style={[styles.input, styles.bodyInput]}
                  multiline
                  placeholderTextColor="#666"
                />
                {/* <StarRating rating={rating} onChange={setRating} /> */}
              </>
            )}

            {pickerValue === "communities" && (
              <>
                <TextInput
                  placeholder="Community Name"
                  value={communityName}
                  onChangeText={setCommunityName}
                  style={styles.input}
                  placeholderTextColor="#666"
                />
                <TextInput
                  placeholder="Community Description"
                  value={communityDesc}
                  onChangeText={setCommunityDesc}
                  style={[styles.input, styles.bodyInput]}
                  multiline
                  placeholderTextColor="#666"
                />
              </>
            )}

            {pickerValue !== "communities" && pickerValue != null && (
              <TouchableOpacity
                onPress={pickImage}
                style={styles.uploadButton}
                activeOpacity={0.7}
              >
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={handleUpload}
            style={styles.submitButton}
            activeOpacity={0.7}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Submission Successful!</Text>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddNewPage;

import {
  Button,
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
  const [communityDropdownItems, setCommunityDropdownItems] = useState([])

  useEffect(() => {
    const handleCommunityDropDownData = async () => {
      if (pickerValue === "posts") {
        const allData = await getAllCommunities();
        const dropdownItems = allData.map(doc => ({
          label: doc?.title,
          value: doc.id,
        }))
        setCommunityDropdownItems(dropdownItems)
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

  const handleUpload = async () => {
    if (pickerValue === "posts")
      await pushSupabaseURL2Firebase({
        postTitle,
        postBody,
        communityDropdown,
        image,
        postTags,
        pickerValue,
      });
    else if (pickerValue === "recipes")
      await pushSupabaseURL2Firebase({
        recipeName,
        recipeBody,
        image,
        pickerValue,
      });
    else if (pickerValue === "restaurants")
      await pushSupabaseURL2Firebase({
        restaurantName,
        restaurantAddress,
        image,
        pickerValue,
      });
    else if (pickerValue === "communities")
      await pushSupabaseURL2Firebase({
        communityName,
        communityDesc,
        pickerValue,
      });
    else return { error: "invalid choice" };
  };

  return (
    // <SafeAreaView
    //   style={{
    //     paddingRight: 10,
    //     paddingLeft: 10,
    //     marginLeft: 15,
    //     marginRight: 15,
    //     marginVertical: 10,
    //   }}
    // >
    //   <Text>Choose...</Text>
    //   <RNPickerSelect
    //     onValueChange={(value) => setPickerValue(value)}
    //     items={[
    //       { label: "Post", value: "posts" },
    //       { label: "Community", value: "communities" },
    //       { label: "Recipe", value: "recipes" },
    //       { label: "Restaurant", value: "restaurants" },
    //     ]}
    //   />
    //   <SafeAreaView>
    //     {pickerValue === "posts" ? (
    //       <>
    //         <RNPickerSelect
    //           onValueChange={(value) => setCommunityDropdown(value)}
    //           items={communityDropdownItems}
    //           placeholder= {{
    //             label: "Choose a community",
    //             value: null
    //           }}
    //         />
    //         <TextInput
    //           placeholder="Title"
    //           value={postTitle}
    //           onChangeText={(text) => setPostTitle(text)}
    //           style={{ visibility: "false" }}
    //         />
    //         <TextInput
    //           placeholder="Body"
    //           value={postBody}
    //           onChangeText={(text) => setPostBody(text)}
    //         />
    //         <TextInput
    //           placeholder="Tags (Space seperated)"
    //           value={postTags}
    //           onChangeText={(text) => setPostTags(text)}
    //         />
    //       </>
    //     ) : null}

    //     {pickerValue === "recipes" ? (
    //       <>
    //         <TextInput
    //           placeholder="Recipe Name"
    //           value={recipeName}
    //           onChangeText={(text) => setRecipeName(text)}
    //         />
    //         <TextInput
    //           placeholder="Recipe Body"
    //           value={recipeBody}
    //           onChangeText={(text) => setRecipeBody(text)}
    //         />
    //       </>
    //     ) : null}

    //     {pickerValue === "restaurants" ? (
    //       <>
    //         <TextInput
    //           placeholder="Recipe Name"
    //           value={restaurantName}
    //           onChangeText={(text) => setRestaurantName(text)}
    //         />
    //         <TextInput
    //           placeholder="Recipe Address"
    //           value={restaurantAddress}
    //           onChangeText={(text) => setRestaurantAddress(text)}
    //         />
    //       </>
    //     ) : null}

    //     {pickerValue === "communities" ? (
    //       <>
    //         <TextInput
    //           placeholder="Community Name"
    //           value={communityName}
    //           onChangeText={(text) => setCommunityName(text)}
    //         />
    //         <TextInput
    //           placeholder="Community Description"
    //           value={communityDesc}
    //           onChangeText={(text) => setCommunityDesc(text)}
    //         />
    //       </>
    //     ) : null}

    //     {pickerValue !== "communities" && pickerValue != null ? (
    //       <TouchableOpacity
    //         onPress={() => pickImage()}
    //         style={{
    //           alignItems: "center",
    //           backgroundColor: "#f0f0f0",
    //           width: "50%",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <Text>Upload image</Text>
    //       </TouchableOpacity>
    //     ) : null}
    //   </SafeAreaView>

    //   <Pressable onPress={() => handleUpload()}>
    //     <Text>Submit</Text>
    //   </Pressable>
    // </SafeAreaView>

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
              onChangeText={(text) => setPostTitle(text)}
              style={styles.input}
              placeholderTextColor="#666"
            />
            <TextInput
              placeholder="Body"
              value={postBody}
              onChangeText={(text) => setPostBody(text)}
              style={[styles.input, styles.bodyInput]}
              multiline
              placeholderTextColor="#666"
            />
            <TextInput
              placeholder="Tags (Space separated)"
              value={postTags}
              onChangeText={(text) => setPostTags(text)}
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
              onChangeText={(text) => setRecipeName(text)}
              style={styles.input}
              placeholderTextColor="#666"
            />
            <TextInput
              placeholder="Recipe Body"
              value={recipeBody}
              onChangeText={(text) => setRecipeBody(text)}
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
              onChangeText={(text) => setRestaurantName(text)}
              style={styles.input}
              placeholderTextColor="#666"
            />
            <TextInput
              placeholder="Restaurant Address"
              value={restaurantAddress}
              onChangeText={(text) => setRestaurantAddress(text)}
              style={[styles.input, styles.bodyInput]}
              multiline
              placeholderTextColor="#666"
            />
          </>
        )}

        {pickerValue === "communities" && (
          <>
            <TextInput
              placeholder="Community Name"
              value={communityName}
              onChangeText={(text) => setCommunityName(text)}
              style={styles.input}
              placeholderTextColor="#666"
            />
            <TextInput
              placeholder="Community Description"
              value={communityDesc}
              onChangeText={(text) => setCommunityDesc(text)}
              style={[styles.input, styles.bodyInput]}
              multiline
              placeholderTextColor="#666"
            />
          </>
        )}

        {pickerValue !== "communities" && pickerValue != null && (
          <TouchableOpacity
            onPress={() => pickImage()}
            style={styles.uploadButton}
            activeOpacity={0.7}
          >
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={() => handleUpload()}
        style={styles.submitButton}
        activeOpacity={0.7}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContent: {
    padding: 16,
    paddingBottom: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  pickerWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  formFields: {
    gap: 12,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  bodyInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    width: '50%',
  },
  uploadButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#333',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#333',
  },
});

export default AddNewPage;

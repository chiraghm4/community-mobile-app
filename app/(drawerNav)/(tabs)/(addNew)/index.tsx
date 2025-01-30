import {
  Button,
  Pressable,
  SafeAreaView,
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
    <SafeAreaView
      style={{
        paddingRight: 10,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginVertical: 10,
      }}
    >
      <Text>Choose...</Text>
      <RNPickerSelect
        onValueChange={(value) => setPickerValue(value)}
        items={[
          { label: "Post", value: "posts" },
          { label: "Community", value: "communities" },
          { label: "Recipe", value: "recipes" },
          { label: "Restaurant", value: "restaurants" },
        ]}
      />
      <SafeAreaView>
        {pickerValue === "posts" ? (
          <>
            <RNPickerSelect
              onValueChange={(value) => setCommunityDropdown(value)}
              items={communityDropdownItems}
              placeholder= {{
                label: "Choose a community",
                value: null
              }}
            />
            <TextInput
              placeholder="Title"
              value={postTitle}
              onChangeText={(text) => setPostTitle(text)}
              style={{ visibility: "false" }}
            />
            <TextInput
              placeholder="Body"
              value={postBody}
              onChangeText={(text) => setPostBody(text)}
            />
            <TextInput
              placeholder="Tags (Space seperated)"
              value={postTags}
              onChangeText={(text) => setPostTags(text)}
            />
          </>
        ) : null}

        {pickerValue === "recipes" ? (
          <>
            <TextInput
              placeholder="Recipe Name"
              value={recipeName}
              onChangeText={(text) => setRecipeName(text)}
            />
            <TextInput
              placeholder="Recipe Body"
              value={recipeBody}
              onChangeText={(text) => setRecipeBody(text)}
            />
          </>
        ) : null}

        {pickerValue === "restaurants" ? (
          <>
            <TextInput
              placeholder="Recipe Name"
              value={restaurantName}
              onChangeText={(text) => setRestaurantName(text)}
            />
            <TextInput
              placeholder="Recipe Address"
              value={restaurantAddress}
              onChangeText={(text) => setRestaurantAddress(text)}
            />
          </>
        ) : null}

        {pickerValue === "communities" ? (
          <>
            <TextInput
              placeholder="Community Name"
              value={communityName}
              onChangeText={(text) => setCommunityName(text)}
            />
            <TextInput
              placeholder="Community Description"
              value={communityDesc}
              onChangeText={(text) => setCommunityDesc(text)}
            />
          </>
        ) : null}

        {pickerValue !== "communities" && pickerValue != null ? (
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              width: "50%",
              justifyContent: "center",
            }}
          >
            <Text>Upload image</Text>
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>

      <Pressable onPress={() => handleUpload()}>
        <Text>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddNewPage;

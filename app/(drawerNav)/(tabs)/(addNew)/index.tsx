import { Button, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {decode} from 'base64-arraybuffer'
import { pushSupabaseURL2Firebase } from "@/helpers/hSupabaseImageHandler";
import RNPickerSelect from 'react-native-picker-select'
import { TextInput } from "react-native-gesture-handler";

const AddNewPage = () => {
  const [image, setImage] = useState(null);
  const [pickerValue, setPickerValue] = useState<string | null>("")
  const [addTitle, setAddTitle] = useState<string | undefined>("")
  const [addBody, setAddBody] = useState<string | undefined>("")

  const auth = getAuth()
  const currUser = auth.currentUser;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    await pushSupabaseURL2Firebase(addTitle, addBody, image, pickerValue)
  }


  return (
    <SafeAreaView style={{paddingRight: 10, paddingLeft: 10, marginLeft: 15, marginRight: 15, marginVertical: 10}}>
      <Text>Choose...</Text>   
      <RNPickerSelect onValueChange={(value) => setPickerValue(value)} items={[
        {label: "Post", value: "posts"},
        {label: "Community", value: "communities"},
        {label: "Recipe", value: "recipes"},
        {label: "Restaurant", value: "restaurants"}
      ]}/>

      <TextInput placeholder="Title" value={addTitle} onChangeText={(text) => setAddTitle(text)} />
      <TextInput placeholder="Body" value={addBody} onChangeText={(text) => setAddBody(text)} />

      <TouchableOpacity onPress={() => pickImage()} style={{alignItems: "center", backgroundColor: "#f0f0f0", width: "50%", justifyContent: "center"}} ><Text>Upload image</Text></TouchableOpacity>

      <Pressable onPress={() => handleUpload()}>
        <Text>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddNewPage;

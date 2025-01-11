import { Button, Text, View } from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const AddNewPage = () => {
  const [imageURI, setImageURI] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
      return result.assets[0].uri;
    }
    return null
  };

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = uri.split("/").pop();

    console.log(response, blob, fileName, '++++++++++++++++')

    const { data, error } = await supabase.storage
      .from("community-app-assets")
      .upload(`images/${fileName}`, blob, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }
    return data.Key; // Return the uploaded file's key
  };

  const handleUpload = async () => {
    const uri = await pickImage();
    if (uri !== null) {
        console.log('caught image==========================')
      const fileKey = await uploadImage(uri);
      console.log("Uploaded file key:------------------------------", fileKey);
    }
  };

  return (
    <View>
      <Text>Add new stuff here</Text>
      <Button title="Upload" onPress={() => handleUpload()} />
    </View>
  );
};

export default AddNewPage;

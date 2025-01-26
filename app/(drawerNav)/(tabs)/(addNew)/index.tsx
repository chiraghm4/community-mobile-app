import { Button, Text, View } from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system'
import { getAuth } from "firebase/auth";
import {decode} from 'base64-arraybuffer'

const AddNewPage = () => {
  const [imageURI, setImageURI] = useState<string | null>(null);

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
      setImageURI(result.assets[0].uri);
      return result.assets[0]
    }
  };

  const handleUpload = async () => {
    try {
      const img = await pickImage()
      const base64 = await FileSystem.readAsStringAsync(img?.uri, {encoding: 'base64'})
      const filePath = `${currUser?.uid}/${new Date().getTime()}.${img?.type==='image'?'png':'mp4'}`
      const contentType = img?.type === 'image' ? 'image/png' : 'video/mp4'
      const res = await supabase.storage.from('community-app-assets').upload(filePath, decode(base64), {contentType})
      console.log(res)
    } catch (e) {
      console.log(e, 'err caught in catch');
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

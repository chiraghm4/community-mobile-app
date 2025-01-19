import { Button, Text, View } from "react-native";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

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
      return result.assets[0].uri
    }
  };

  const handleUpload = async () => {
    try {
      const URI = await pickImage();
      console.log(URI, 'file uri')
      const {data, error} = await supabase
        .storage
        .from('community-app-assets')
        .upload(`${Date.now()}_${URI}`, URI)

    if(data) console.log(data)
    if(error) console.log(error)
    } catch (e) {
      console.log(e);
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

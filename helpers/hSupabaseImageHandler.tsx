import { db } from "@/firestore";
import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { getAuth } from "firebase/auth";
import { addDoc, collection, query, where } from "firebase/firestore";

export const pushSupabaseURL2Firebase = async (
  title,
  body,
  image,
  pickerSelect
) => {
  // handle pushing of publicURL in imageURL of firebase firestore

  const auth = getAuth();
  const currUser = auth.currentUser;

  try {
    //push in supabase logic

    const base64 = await FileSystem.readAsStringAsync(image?.uri, {
      encoding: "base64",
    });
    const filePath = `${currUser?.uid}/${new Date().getTime()}.${
      image?.type === "image" ? "png" : "mp4"
    }`;
    const contentType = image?.type === "image" ? "image/png" : "video/mp4";
    const res = await supabase.storage
      .from("community-app-assets")
      .upload(filePath, decode(base64), { contentType });
    const imagePublicURL = await supabase.storage
      .from("community-app-assets")
      .getPublicUrl(filePath);

    const imgURL = imagePublicURL.data.publicUrl

    // push in firestore logic
    if (pickerSelect === "recipes") {
      const upload2FirebaseRes = await addDoc(collection(db, pickerSelect), {
        title,
        desc: body,
        imgURL
      });
      console.log(upload2FirebaseRes)
    }

    console.log(res);
  } catch (e) {
    console.log(e, "err caught in catch");
  }
};

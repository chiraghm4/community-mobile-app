import { db } from "@/firestore";
import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";

interface Props {
  postTitle: string | undefined;
  postBody: string;
  postTags: string;
  image: any;
  pickerValue: string;
  recipeName: string;
  recipeBody: string;
  restaurantName: string;
  restaurantAddress: string;
  communityName: string;
  communityDesc: string;
}

export const pushSupabaseURL2Firebase = async (props) => {
  // handle pushing of publicURL in imageURL of firebase firestore

  //   const [publicURL, setPublicURL] = useState<string | null>(null)

  //   const {
  //     postTitle,
  //     postBody,
  //     postTags,
  //     image,
  //     pickerValue,
  //     recipeBody,
  //     recipeName,
  //     restaurantAddress,
  //     restaurantName,
  //     communityDesc,
  //     communityName,
  //   } = props;
  console.log("got here");
  const auth = getAuth();
  const currUser = auth.currentUser;

  const supabaseImageHandler = async () => {
    const base64 = await FileSystem.readAsStringAsync(props.image?.uri, {
      encoding: "base64",
    });
    const filePath = `${currUser?.uid}/${new Date().getTime()}.${
      props.image?.type === "image" ? "png" : "mp4"
    }`;
    const contentType =
      props.image?.type === "image" ? "image/png" : "video/mp4";
    const resSupa = await supabase.storage
      .from("community-app-assets")
      .upload(filePath, decode(base64), { contentType });
    console.log(resSupa, "-------------------------");
    const imagePublicURL = await supabase.storage
      .from("community-app-assets")
      .getPublicUrl(filePath);
    console.log(imagePublicURL);

    const imgURL = imagePublicURL.data.publicUrl || "";
    return imgURL;
  };

  try {
    //push in supabase logic
    // if (props.image != null) {
    let imgURL = "";
    if (props.image != null) {
      imgURL = await supabaseImageHandler();
      console.log(imgURL, "imgurl");
    }

    if (props.pickerValue === "recipes") {
      // let imgURL;
      // if(props.image != null) {
      //   imgURL = await supabaseImageHandler()
      // }
      const upload2FirebaseRes = await addDoc(collection(db, "recipes"), {
        title: props.recipeName,
        desc: props.recipeBody,
        imgURL,
      });
      console.log(upload2FirebaseRes);
    } else if (props.pickerValue === "posts") {
      const upload2FirebaseRes = await addDoc(collection(db, "posts"), {
        title: props.postTitle,
        desc: props.postBody,
        community: props.communityDropdown,
        tags: [],
        userID: currUser?.uid,
        imageURL: imgURL,
      });
      console.log(upload2FirebaseRes);
    } else if (props.pickerValue === "restaurants") {
      const upload2FirebaseRes = await addDoc(collection(db, "restaurants"), {
        restaurantName: props.restaurantName,
        address: props.restaurantAddress,
        rating: props.rating,
        imgURL,
      });
      console.log(upload2FirebaseRes);
    } else if (props.pickerValue === "communities") {
      const upload2FirebaseRes = await addDoc(collection(db, "communities"), {
        title: props.communityName,
        desc: props.communityDesc,
        subscribedUsers: [currUser?.uid],
        postsID: [],
      });

      // updating community in user's subscribed communities
      console.log(upload2FirebaseRes.id);

      const userRef = collection(db, "users");
      const q = query(userRef, where("userId", "==", currUser?.uid));

      const querySnapshot = await getDocs(q);
      const userDataRef = querySnapshot.docs[0].ref;

      await updateDoc(userDataRef, {
        communities: arrayUnion(upload2FirebaseRes.id),
      });
    } else {
      alert("invalid choice");
    }
    // } else {
    console.log("here");

    // }

    return { success: true };
  } catch (e) {
    console.log(e, "err caught in catch");
    return { success: false, e };
  }
};

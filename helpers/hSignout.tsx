import { router } from "expo-router";
import { getAuth } from "firebase/auth";

export const signMeOut = async () => {
  const auth = getAuth();
  auth
    .signOut()
    .then(() => {
      console.log("signout user successfull");
      router.replace("/(login)");
    })
    .catch((e) => {
      console.log(e, "error");
    });
};

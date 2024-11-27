import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-native";

export const ResetPassword = () => {
  const auth = getAuth(); 

  const {email} = auth.currentUser;

  sendPasswordResetEmail(auth, email)
    .then(() => Alert.alert("password reset mail sent!"))
    .catch((e) => console.log(e));
};

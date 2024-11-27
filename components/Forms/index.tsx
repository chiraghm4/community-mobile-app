import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface IFormProps {
  actionHandler: (email?: string, username?: string, password?: string) => void,
}

export const FormViewSignup = (props: IFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await props.actionHandler(email, pass, username);
    } catch (error) {
      console.log(error);
    } finally { 
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styleSheet.container}>
      <View style={styleSheet.form}>
        <Text style={styleSheet.label}>Username</Text>
        <TextInput
          placeholder="Enter your Username"
          style={styleSheet.input}
          onChangeText={setUsername}
          value={username}
        />
        <Text style={styleSheet.label}>Email</Text>
        <TextInput
          placeholder="Enter your Email"
          style={styleSheet.input}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styleSheet.label}>Password</Text>
        <TextInput
          placeholder="Enter your Password"
          style={styleSheet.input}
          secureTextEntry
          onChangeText={setPass}
          value={pass}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Signup" onPress={handleSubmit} />
        )}
      </View>
    </SafeAreaView>
  );
};

export const FormViewLogin = (props: IFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await props.actionHandler(email, pass);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styleSheet.container}>
      <View style={styleSheet.form}>
        <Text style={styleSheet.label}>Email</Text>
        <TextInput
          placeholder="Enter your Email"
          style={styleSheet.input}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styleSheet.label}>Password</Text>
        <TextInput
          placeholder="Enter your Password"
          style={styleSheet.input}
          secureTextEntry
          onChangeText={setPass}
          value={pass}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={handleSubmit} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    width: "80%",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});

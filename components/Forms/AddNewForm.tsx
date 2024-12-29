import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaFrame,
} from "react-native-safe-area-context";
import { addNewPost } from "@/firestore";
import { getAuth } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";

const AddNewForm = ({ showModal, handleClose }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [community, setCommunity] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="fade"
          visible={showModal}
          onRequestClose={handleClose}
        >
          <View style={styles.centeredView}>
            <TextInput
              placeholder="enter title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="enter body"
              value={body}
              onChangeText={setBody}
            />
            <Picker
              selectedValue={community}
              onValueChange={(itemValue: string, itemIndex: number) =>
                setCommunity(itemValue)
              }
            >
              <Picker value="public" label="Public" />
              <Picker value="abc" label="Abc" />
              <Picker value="private" label="Private" />
            </Picker>
            <Pressable
              onPress={() => {
                addNewPost(title, body, user.uid, community);
                handleClose();
              }}
            >
              <Text>Post!</Text>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: 200,
    height: 300,
    margin: 100,
  },
  modalView: {
    margin: 10,
    padding: 15,
  },
});

export default AddNewForm;

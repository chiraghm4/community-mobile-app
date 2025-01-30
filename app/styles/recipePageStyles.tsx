import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
      marginVertical: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 25,
      paddingHorizontal: 6,
      height: 50,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchField: {
      flex: 1,
      fontSize: 16,
      color: "black",
    },
    clearIconContainer: {
      marginLeft: 10,
    },
    container: {
      flex: 1,
    },
  });

  export default styles
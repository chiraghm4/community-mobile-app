import {
  View,
  // Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
// import { getAuth } from "firebase/auth";
// import Posts from "@/components/Posts";
// import AddNewForm from "@/components/Forms/AddNewForm";
// import {
//   collection,
//   getDocs,
//   onSnapshot,
//   query,
//   QuerySnapshot,
//   where,
// } from "firebase/firestore";
// import { db } from "@/firestore";
import { fetchPostsByCommunities } from "@/helpers/hGetUsersPosts";
import RecipeCard from "@/components/RecipesCard";
import { getRecipes } from "@/helpers/hGetRecipes";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesData = await getRecipes();
      setRecipes(recipesData);
      setFilteredRecipes(recipesData);
    };

    fetchRecipes();
  }, []);

  const handleSearch = (text: any) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe?.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredRecipes(recipes);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={24}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchField}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="never"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={clearSearch}
            style={styles.clearIconContainer}
          >
            <AntDesign name="closecircle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.container}>
        <RecipeCard
          Recipes={filteredRecipes}
          // community="abc"
          // onUpdatePost={handleUpdatePost}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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

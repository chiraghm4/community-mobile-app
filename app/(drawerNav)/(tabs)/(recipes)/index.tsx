import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import RecipeCard from "@/components/RecipesCard";
import { getRecipes } from "@/helpers/hGetRecipes";
import { AntDesign, Feather } from "@expo/vector-icons";
import {styles} from '@/app/styles/recipePageStyles'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firestore";

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    const recipesRef = collection(db, "recipes"); // Reference to Firestore collection

    const unsubscribe = onSnapshot(recipesRef, (snapshot) => {
      const updatedRecipes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
    });

    return () => unsubscribe(); // Clean up listener on unmount
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
        />
      </View>
    </View>
  );
}


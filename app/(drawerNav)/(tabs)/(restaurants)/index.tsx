import { ActivityIndicator, FlatList } from "react-native";
import React, { useEffect,  useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantData from "@/assets/Data/fakeRestaurant.json";
import { RestaurantCard } from "@/components/RestaurantCard";
import {styles} from '@/app/styles/restaurantCardStyles'
import { getRestaurants } from "@/helpers/hGetRestaurants";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firestore";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a query for the restaurants collection
    const restaurantsRef = collection(db, 'restaurants');
    const q = query(restaurantsRef);

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const restaurantsData = [];
      querySnapshot.forEach((doc) => {
        restaurantsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setRestaurants(restaurantsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={restaurants}
        numColumns={2}
        renderItem={({ item }) => (
          <RestaurantCard
            key={item.id}
            name={item.restaurantName}
            address={item.address}
            imageURL={item.imgURL}
            rating={3}
          />
        )}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default RestaurantsPage;

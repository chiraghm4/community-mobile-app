import { View, Text, FlatList } from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantData from "@/assets/Data/fakeRestaurant.json";
import { RestaurantCard } from "@/components/RestaurantCard";

const RestaurantsPage = () => {
  const Restaurants = useMemo(() => RestaurantData.fakeRestaurant, []);

  return (
    <SafeAreaView>
      <FlatList
        data={Restaurants}
        numColumns={2}
        renderItem={({ item }) => (
          <RestaurantCard
            key={item.id}
            name={item.restaurantName}
            address={item.location}
            imageURL=""
            rating={item.rating}
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default RestaurantsPage;

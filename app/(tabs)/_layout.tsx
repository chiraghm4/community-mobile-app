import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="(posts)" />
      <Tabs.Screen name="(communities)" />
      <Tabs.Screen name="(restaurants)" />
      <Tabs.Screen name="(recipes)" />
    </Tabs>
  );
};

export default TabsLayout;

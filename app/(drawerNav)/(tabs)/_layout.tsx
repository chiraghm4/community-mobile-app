import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Alert, Button, Pressable } from "react-native";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


export default function TabLayout() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [onAuthStateChanged]);

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <>
          <Tabs.Screen name="(posts)" />
          <Tabs.Screen name="(communities)" />
          <Tabs.Screen name="(addNew)" />
          <Tabs.Screen name="(restaurants)" />
          <Tabs.Screen name="(recipes)" />
          <Tabs.Screen name="(drawerNav)" options={{ headerShown : true}}/>
        </>
      ) : (
        <Tabs.Screen name="/_not_authenticated" />
      )}
    </Tabs>
  );
};


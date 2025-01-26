import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Alert, Button, Pressable } from "react-native";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { Layout } from "react-native-reanimated";
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
      {/* {!isAuthenticated ? (
        <> */}
          <Tabs.Screen name="(posts)/index" />
          <Tabs.Screen name="(communities)/index" />
          <Tabs.Screen name="(addNew)/index" />
          <Tabs.Screen name="(restaurants)/index" />
          <Tabs.Screen name="(recipes)/index" />
          {/* <Tabs.Screen name="(drawerNav)" options={{ headerShown: true }} /> */}
        {/* </>
      ) : // <Tabs.Screen name="/_not_authenticated" />
      null} */}
    </Tabs>
  );
}

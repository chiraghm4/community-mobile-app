import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Alert, Button, Pressable } from "react-native";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { Layout } from "react-native-reanimated";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
      headerShown: false,
      tabBarStyle: {
        height: 60,
        paddingBottom: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: 'manro',
      },
      // Set default (unselected) color
      tabBarInactiveTintColor: '#666',
      // Set selected color
      tabBarActiveTintColor: '#000',
      // Add background styling for selected tab
      tabBarItemStyle: {
        paddingVertical: 5,
      },
    }}
    >
      {/* {!isAuthenticated ? (
        <> */}
          <Tabs.Screen name="(posts)/index" 
             options={
              {
                title : "Posts",
                tabBarIcon : ({focused, color, size}) => (
                  focused ? <MaterialIcons name="chat-bubble" size={22} color='#00000'/> : <MaterialIcons name="chat-bubble-outline" size={22} color='#00000'/>
                )
              }
            }
          />
          <Tabs.Screen name="(communities)/index" 
            options={{
              title : 'Communities',
              tabBarIcon: ({ focused, color, size }) => (

                focused ? <MaterialIcons name="people" size={24} color='#00000'/> : <MaterialIcons name="people-outline" size={24} color='#00000'/>

              )

          }}
          />
          <Tabs.Screen name="(addNew)/index" 
            options={
              {
                title : "Add",
                tabBarIcon : ({focused, color, size}) => (
                  focused ? <AntDesign name="pluscircle" size={22} color='#00000'/> : <AntDesign name="pluscircleo" size={22} color='#00000'/>
                )
              }
            }
          />
          <Tabs.Screen name="(restaurants)/index" 
            options={
              {
                title : "Restaurants",
                tabBarIcon : ({focused, color, size}) => (
                  focused ? <MaterialCommunityIcons name="food" size={22} color='#00000'/> : <MaterialCommunityIcons name="food-outline" size={22} color='#00000'/>
                )
              }
            }
          />
          <Tabs.Screen name="(recipes)/index" 
            options={
              {
                title : "Recipes",
                tabBarIcon : ({focused, color, size}) => (
                  focused ? <MaterialCommunityIcons name="bowl-mix" size={22} color='#00000'/> : <MaterialCommunityIcons name="bowl-mix-outline" size={22} color='#00000'/>
                )
              }
            }
          />
          {/* <Tabs.Screen name="(drawerNav)" options={{ headerShown: true }} /> */}
        {/* </>
      ) : // <Tabs.Screen name="/_not_authenticated" />
      null} */}
    </Tabs>
  );
}

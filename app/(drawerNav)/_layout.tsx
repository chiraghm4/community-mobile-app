import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Feather } from '@expo/vector-icons';
import CustomDrawerComponent from '@/components/customDrawer/CustomDrawerComponent';



const DrawerNavigation = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{drawerPosition : 'left',drawerHideStatusBarOnOpen:true}} drawerContent={CustomDrawerComponent}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            headerTitle : 'Posts',
            drawerIcon: ({size, color}) => (
              <Feather name='home' size={16} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="(Profile)/index"
          options={{
            drawerLabel: 'Profile',
            headerTitle : 'Profile',
            drawerIcon: ({size, color}) => (
              <Feather name='user' size={16} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="(Favourites)/index"
          options={{
            drawerLabel: 'Favourites',
            headerTitle : 'Favourites',
            drawerIcon: ({size, color}) => (
              <Feather name='star' size={16} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerNavigation;

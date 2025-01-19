import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect } from "react";




export default function RootLayout() {
  const [loaded, error] = useFonts({
    'manro' : require('@/assets/fonts/Manrope/static/Manrope-Regular.ttf'),
    'manro-sb' : require('@/assets/fonts/Manrope/static/Manrope-SemiBold.ttf'),
    'manro-b' : require('@/assets/fonts/Manrope/static/Manrope-ExtraBold.ttf'),
  })
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}


function RootLayoutNav() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" />
    </Stack>
  )
}

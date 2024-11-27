import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { getAuth } from "@firebase/auth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

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
  const colorScheme = useColorScheme();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) setIsAuthenticated(false);
    else setIsAuthenticated(true);
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" />
        {isAuthenticated ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(profile)/ProfilePage" />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </ThemeProvider>
  );
}

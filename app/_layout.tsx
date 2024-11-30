import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Bricolage-Light": require("../assets/fonts/BricolageGrotesque-Light.ttf"),
    Bricolage: require("../assets/fonts/BricolageGrotesque-Regular.ttf"),
    "Bricolage-Medium": require("../assets/fonts/BricolageGrotesque-Medium.ttf"),
    "Bricolage-SemiBold": require("../assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    "Bricolage-Bold": require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

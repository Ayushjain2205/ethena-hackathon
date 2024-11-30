import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Home, CreditCard, Gift, User } from "lucide-react-native";

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
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#8B5CF6",
            borderTopWidth: 0,
            paddingBottom: 10,
            paddingTop: 10,
            height: 70,
          },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        }}
      >
        <Tabs.Screen
          name="homepage"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="card"
          options={{
            title: "Card",
            tabBarIcon: ({ color }) => <CreditCard size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="rewards"
          options={{
            title: "Rewards",
            tabBarIcon: ({ color }) => <Gift size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

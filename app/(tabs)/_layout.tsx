import { Tabs } from "expo-router";
import { Home, CreditCard, Gift, User, Scan } from "lucide-react-native";

export default function TabsLayout() {
  return (
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
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => <Scan size={24} color={color} />,
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
  );
}

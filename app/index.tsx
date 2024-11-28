import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  Plus,
  Send,
  Wallet,
  Home,
  Scan,
  CreditCard,
  Grid,
} from "lucide-react-native";
import "nativewind";

export default function BankScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header - Using bold weight for greeting and regular for subtitle */}
        <View className="flex-row justify-between items-center px-4 pt-2">
          <View className="flex-row items-center space-x-3">
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              className="w-10 h-10 rounded-full"
            />
            <View>
              {/* Using bold for main greeting */}
              <Text className="text-2xl font-bold font-sans">
                Morning Jude,
              </Text>
              {/* Using regular weight for secondary text */}
              <Text className="text-gray-500 font-sans font-normal">
                Free Account
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Bell size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Card Section - Using medium weight for card numbers */}
        <View className="px-4 py-6">
          <View className="rounded-lg overflow-hidden shadow-lg">
            <LinearGradient
              colors={["#FF4B2B", "#FF416C", "#A445B2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View className="p-6">
                <View className="h-48 justify-between">
                  <Image
                    source={{ uri: "https://via.placeholder.com/30" }}
                    className="w-8 h-8"
                  />
                  <View>
                    {/* Using medium weight for card number */}
                    <Text className="text-white text-xl tracking-wider font-sans font-medium">
                      2781 8191 6671 3190
                    </Text>
                    <View className="flex-row justify-between mt-4">
                      {/* Using regular weight for card details */}
                      <Text className="text-white font-sans font-normal">
                        Jude Kylian Jr.
                      </Text>
                      <Text className="text-white font-sans font-normal">
                        Exp 09/29
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Action Buttons - Using medium weight for button labels */}
        <View className="flex-row justify-around px-4 py-2">
          {[
            { icon: <Plus size={24} color="#FF416C" />, label: "Add" },
            { icon: <Send size={24} color="#FF416C" />, label: "Send" },
            { icon: <Wallet size={24} color="#FF416C" />, label: "Pay" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white px-6 py-3 rounded-full shadow-sm flex-row items-center space-x-2"
            >
              {item.icon}
              {/* Using medium weight for action buttons */}
              <Text className="text-gray-800 font-sans font-medium">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Transactions - Using semibold for section title */}
        <View className="px-4 py-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold font-sans">
              Recent Transaction
            </Text>
            {/* Using medium weight for action link */}
            <Text className="text-pink-500 font-sans font-medium">
              View All
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["Thibaut", "David", "Antoni", "Fade", "Lucas"].map(
              (name, index) => (
                <View key={index} className="items-center mr-6">
                  <Image
                    source={{ uri: `https://via.placeholder.com/50` }}
                    className="w-12 h-12 rounded-full mb-1"
                  />
                  {/* Using light weight for names */}
                  <Text className="text-gray-600 font-sans font-light">
                    {name}
                  </Text>
                </View>
              )
            )}
          </ScrollView>
        </View>

        {/* Card Details - Using varying weights for different text elements */}
        <View className="px-4 py-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-light ">Card Detail</Text>
            <Text className="text-pink-500 font-sans font-medium">Show</Text>
          </View>
          <View className="space-y-4">
            <View className="flex-row justify-between">
              {/* Using light weight for labels */}
              <Text className="text-gray-500 font-bold">Holder Name</Text>
              {/* Using normal weight for values */}
              <Text className="font-sans font-normal">Jude Kylian Jr</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-sans font-light">
                Card Number
              </Text>
              <Text className="font-sans font-normal">2781 8191 6671 3190</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation remains unchanged */}
      <View className="flex-row justify-around py-4 bg-white border-t border-gray-100">
        {[
          { icon: <Home size={24} color="#FF416C" /> },
          { icon: <Scan size={24} color="#666" /> },
          { icon: <CreditCard size={24} color="#666" /> },
          { icon: <Grid size={24} color="#666" /> },
        ].map((item, index) => (
          <TouchableOpacity key={index} className="p-2">
            {item.icon}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

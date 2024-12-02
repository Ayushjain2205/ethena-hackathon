import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { ChevronRight, CreditCard } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const transactions = [
  {
    id: "1",
    merchant: "Starbucks",
    logo: "☕️",
    date: "Dec 1, 2024",
    amount: 11.0,
    location: "New York, NY",
  },
  {
    id: "2",
    merchant: "Amazon",
    logo: "📦",
    date: "Nov 30, 2024",
    amount: 316.0,
    location: "Online",
  },
  {
    id: "3",
    merchant: "Walmart",
    logo: "🏪",
    date: "Nov 29, 2024",
    amount: 327.0,
    location: "Queens, NY",
  },
];

export default function Card() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="p-5">
          <Text className="text-2xl font-semibold text-gray-800 font-sans">
            Buy Now, Pay Later
          </Text>
          <Text className="text-base text-gray-600 font-sans mt-1">
            Manage your payments
          </Text>
        </View>

        {/* Card Preview */}
        <View className="px-4 py-6">
          <View className="rounded-lg overflow-hidden shadow-lg">
            <LinearGradient
              colors={["#FF4B2B", "#FF416C", "#A445B2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View className="p-6">
                <View className="h-48 justify-between">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white text-xl font-sans font-bold">
                      ALTURA
                    </Text>
                    <CreditCard size={24} color="white" />
                  </View>
                  <View>
                    <Text className="text-white text-xl tracking-wider font-sans font-medium">
                      2781 8191 6671 3190
                    </Text>
                    <View className="flex-row justify-between mt-4">
                      <Text className="text-white font-sans font-normal">
                        Rahul M
                      </Text>
                      <Text className="text-white font-sans font-normal">
                        Exp 12/25
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Payment Summary */}
        <View className="mx-5 bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
                <Text>🗓</Text>
              </View>
              <View>
                <Text className="text-base font-semibold text-gray-800 font-sans">
                  Due Payments
                </Text>
                <Text className="text-sm text-gray-600 font-sans">
                  3 Payments
                </Text>
              </View>
            </View>
          </View>

          <Text className="text-4xl font-semibold text-gray-800 font-sans mb-2">
            $642.00
          </Text>
          <Text className="text-gray-600 font-sans mb-4">
            Total Due Payment: $753.00
          </Text>

          <TouchableOpacity className="bg-purple-600 rounded-full py-3 mb-6">
            <Text className="text-white text-center font-sans font-medium">
              Pay Now
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-between">
            <View>
              <Text className="text-xl font-semibold text-gray-800 font-sans">
                $327.00
              </Text>
              <Text className="text-sm text-gray-600 font-sans">
                Due in 15 days
              </Text>
            </View>
            <View>
              <Text className="text-xl font-semibold text-gray-400 font-sans">
                $316.00
              </Text>
              <Text className="text-sm text-gray-400 font-sans">
                Due in 30 days
              </Text>
            </View>
            <View>
              <Text className="text-xl font-semibold text-gray-400 font-sans">
                $11.00
              </Text>
              <Text className="text-sm text-gray-400 font-sans">
                Due in 60 days
              </Text>
            </View>
          </View>
        </View>

        {/* Transactions */}
        <View className="mx-5">
          <View className="flex-row justify-between mb-4">
            <Text className="text-xl font-semibold text-gray-800 font-sans">
              All Payments
            </Text>
          </View>

          {transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
            >
              <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
                <Text className="text-xl">{transaction.logo}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800 font-sans">
                  {transaction.merchant}
                </Text>
                <Text className="text-sm text-gray-600 font-sans">
                  {transaction.date} • {transaction.location}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-base font-semibold text-gray-800 font-sans mr-2">
                  ${transaction.amount.toFixed(2)}
                </Text>
                <ChevronRight size={20} color="#666666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

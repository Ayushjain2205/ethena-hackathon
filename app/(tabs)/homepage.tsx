import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Smartphone,
  Grid,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
} from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;

const chartData = {
  labels: ["", "", "", "", "", ""],
  datasets: [
    {
      data: [180, 220, 290, 250, 300, 283.72],
      color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
    },
  ],
};

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="p-5 flex-row justify-between items-center">
          <View>
            <Text className="text-base text-gray-600 font-sans">Hi Rahul,</Text>
            <Text className="text-2xl font-semibold text-gray-800 font-sans">
              Welcome back
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/altura.png")}
              className="w-10 h-10 "
            />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View className="mx-5 bg-purple-600 rounded-3xl overflow-hidden">
          <View className="p-6">
            <Text className="text-white/90 text-lg font-sans mb-2">
              Your Balance is
            </Text>
            <Text className="text-white text-4xl font-semibold font-sans mb-2">
              $45,934.00
            </Text>
            <View className="flex-row items-center">
              <ArrowUp size={16} color="#4ADE80" strokeWidth={2.5} />
              <Text className="text-[#4ADE80] ml-1 text-sm font-sans">
                8.82%{" "}
              </Text>
              <Text className="text-white/80 text-sm font-sans">(+$876)</Text>
            </View>
          </View>
          <View className="flex-row bg-purple-700">
            <TouchableOpacity className="flex-1 py-3 items-center justify-center flex-row">
              <ArrowDownLeft size={18} color="white" />
              <Text className="text-white font-sans ml-2 text-sm">Deposit</Text>
            </TouchableOpacity>
            <View className="w-px bg-purple-500" />
            <TouchableOpacity className="flex-1 py-3 items-center justify-center flex-row">
              <ArrowUpRight size={18} color="white" />
              <Text className="text-white font-sans ml-2 text-sm">
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mx-5 my-6">
          {[
            { icon: ArrowUpRight, label: "Send" },
            { icon: Receipt, label: "Bill" },
            { icon: Smartphone, label: "Mobile" },
            { icon: Grid, label: "All" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-purple-50 p-5 rounded-[24px] items-center justify-center w-[23%] aspect-square"
              style={{
                shadowColor: "#7C3AED",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <item.icon size={24} color="#7C3AED" strokeWidth={1.5} />
              <Text className="text-purple-700 mt-2 text-sm font-sans font-medium">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Cards */}
        <View className="flex-row mx-5 mb-5">
          {/* Portfolio Growth Card */}
          <View className="flex-1 bg-white rounded-2xl p-4 mr-2.5 shadow">
            <Text className="text-base text-gray-800 mb-2 font-sans">
              Portfolio Growth
            </Text>
            <LineChart
              data={chartData}
              width={140}
              height={100}
              chartConfig={{
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
                strokeWidth: 2,
                propsForDots: {
                  r: "0",
                },
              }}
              bezier
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={false}
              style={{ paddingRight: 0 }}
            />
            <Text className="text-xl font-semibold text-gray-800 font-sans">
              $283.72
            </Text>
            <View className="flex-row items-center">
              <ArrowUp size={16} color="#22C55E" />
              <Text className="text-green-500 ml-1 font-sans">+1.7%</Text>
            </View>
          </View>

          {/* Yield Earned Card */}
          <View className="flex-1 bg-white rounded-2xl p-4 ml-2.5 shadow">
            <Text className="text-base text-gray-800 mb-2 font-sans">
              Yield Earned
            </Text>
            <View className="flex-1 justify-center">
              <Text className="text-3xl font-semibold text-gray-800 mb-2 font-sans">
                $892.50
              </Text>
              <View className="h-1 bg-purple-600/10 rounded">
                <View className="w-[68%] h-full bg-purple-600 rounded" />
              </View>
            </View>
          </View>
        </View>

        {/* Transactions */}
        <View className="mx-5">
          <Text className="text-xl font-semibold text-gray-800 mb-4 font-sans">
            Transactions
          </Text>
          {[
            {
              name: "Sarah Johnson",
              date: "Nov 8, 16:32",
              amount: 190.54,
              change: 2.5,
              icon: "👩🏻",
              type: "Sent to",
              positive: false,
            },
            {
              name: "Michael Chen",
              date: "Nov 5, 8:12",
              amount: 75.0,
              change: 2.5,
              icon: "👨🏻‍💼",
              type: "Received from",
              positive: true,
            },
          ].map((transaction, index) => (
            <View
              key={index}
              className="flex-row items-center p-4 bg-white rounded-xl mb-3 shadow"
            >
              <View className="w-10 h-10 rounded-full bg-purple-100 justify-center items-center mr-3">
                <Text className="text-xl">{transaction.icon}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800 font-sans">
                  {transaction.type} {transaction.name}
                </Text>
                <Text className="text-sm text-gray-600 font-sans">
                  {transaction.date}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-base font-semibold text-gray-800 font-sans">
                  {transaction.positive ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </Text>
                <View className="flex-row items-center">
                  {transaction.positive ? (
                    <ArrowDown size={12} color="#22C55E" />
                  ) : (
                    <ArrowUp size={12} color="#EF4444" />
                  )}
                  <Text
                    className={`text-sm ml-0.5 font-sans ${
                      transaction.positive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.change}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

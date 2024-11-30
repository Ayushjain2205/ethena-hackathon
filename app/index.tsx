import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MessageCircle,
  Scan,
  Menu,
  ArrowLeft,
  QrCode,
  Scissors,
} from "lucide-react-native";
import "nativewind";

const numPad = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "<"],
];

export default function PaymentScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#9333EA]">
      {/* Header */}

      <View className="flex-row justify-between items-center px-6 pt-2">
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity className="bg-white/10 rounded-full px-4 py-2">
            <Text className="text-white font-sans">Check balance</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
      </View>

      {/* Balance Display */}
      <View className="items-center justify-center mt-16">
        <Text className="text-white/60 font-sans text-lg mb-2">Balance</Text>
        <View className="flex-row items-center">
          <Text className="text-white font-sans text-6xl">₹</Text>
          <Text className="text-white font-sans text-6xl">0</Text>
        </View>
        <Text className="text-white/60 font-sans text-sm mt-4">
          UPI ID: skadoosh@slice
        </Text>
      </View>

      {/* Number Pad */}
      <View className="flex-1 justify-end px-6 pb-20">
        <View className="grid grid-cols-3 gap-8">
          {numPad.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-between">
              {row.map((num) => (
                <TouchableOpacity
                  key={num}
                  className="w-16 h-16 items-center justify-center"
                >
                  <Text className="text-white font-sans text-2xl">{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-8">
          <TouchableOpacity className="bg-white/20 rounded-full px-12 py-4 flex-1 mr-4">
            <Text className="text-white font-sans text-center">Request</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white/20 rounded-full px-12 py-4 flex-1">
            <Text className="text-white font-sans text-center">Pay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View className="flex-row justify-around items-center pb-8 px-6">
        <TouchableOpacity>
          <MessageCircle size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <QrCode size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white/20 p-4 rounded-full -mt-8">
          <Scan size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Scissors size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Menu size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

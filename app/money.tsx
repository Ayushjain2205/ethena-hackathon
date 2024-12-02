import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

const numPad = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "<"],
];

function MoneyScreen() {
  const [amount, setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNumberPress = (num: string) => {
    setAmount((prev) => {
      if (num === "<") return prev.slice(0, -1) || "0";
      if (num === "." && prev.includes(".")) return prev;
      if (prev === "0" && num !== ".") return num;
      return prev + num;
    });
  };

  const handlePay = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleDone = () => {
    setShowSuccess(false);
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#9333EA]">
      <View className="flex-row justify-between items-center px-6 pt-2">
        <TouchableOpacity
          className="bg-white/10 rounded-full p-2"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          className="w-10 h-10 rounded-full"
        />
      </View>

      <View className="items-center mt-8">
        <Image
          source={{ uri: "https://via.placeholder.com/60" }}
          className="w-14 h-14 rounded-full mb-2"
        />
        <Text className="text-white font-sans text-xl">Rahul.altura</Text>
      </View>

      <View className="items-center justify-center mt-8">
        <Text className="text-white/60 font-sans text-lg mb-2">Paying</Text>
        <Text className="text-white font-sans text-6xl">${amount}</Text>
      </View>

      <View className="flex-1 justify-end px-6 pb-20">
        <View className="grid grid-cols-3 gap-8">
          {numPad.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-between">
              {row.map((num) => (
                <TouchableOpacity
                  key={num}
                  className="w-16 h-16 items-center justify-center"
                  onPress={() => handleNumberPress(num)}
                >
                  <Text className="text-white font-sans text-2xl">{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity
          className="bg-white/20 rounded-full px-12 py-4 mt-8"
          onPress={handlePay}
        >
          <Text className="text-white font-sans text-center text-lg">Pay</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isLoading || showSuccess}
        transparent
        animationType="fade"
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl w-[80%]">
            {isLoading ? (
              <>
                <ActivityIndicator size="large" color="#9333EA" />
                <Text className="text-lg font-sans text-center mt-4">
                  Processing payment...
                </Text>
              </>
            ) : (
              <View className="items-center ">
                <Text className="text-7xl text-center">✔️</Text>
                <Text className="text-2xl font-sans text-center mb-4">
                  Payment Successful!
                </Text>
                <Text className="text-lg font-sans text-center mb-2">
                  You paid ${amount}
                </Text>
                <Text className="text-base font-sans text-center text-gray-600 mb-6">
                  to Rahul.altura
                </Text>
                <TouchableOpacity
                  className="bg-[#9333EA] rounded-full px-12 py-4 w-full"
                  onPress={handleDone}
                >
                  <Text className="text-white font-sans text-center text-lg">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default MoneyScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import * as LocalAuthentication from "expo-local-authentication";

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
  const [isFaceIDSupported, setIsFaceIDSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setIsFaceIDSupported(
        compatible &&
          types.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
          )
      );
    })();
  }, []);

  const handleNumberPress = (num: string) => {
    setAmount((prev) => {
      if (num === "<") return prev.slice(0, -1) || "0";
      if (num === "." && prev.includes(".")) return prev;
      if (prev === "0" && num !== ".") return num;
      return prev + num;
    });
  };

  const simulateBiometricAuth = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Simulated Face ID",
        "This is a simulated Face ID prompt. In production, this would trigger the actual Face ID.",
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "Authenticate",
            onPress: () => resolve(true),
          },
        ]
      );
    });
  };

  const handleBiometricAuth = async () => {
    try {
      // For development in Expo Go, use simulated authentication
      const authResult = await simulateBiometricAuth();

      if (authResult) {
        handlePayment();
      } else {
        Alert.alert(
          "Authentication Cancelled",
          "You cancelled the authentication. Please try again when ready."
        );
      }

      // For production, uncomment the following code and remove the simulation above
      /*
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: `Confirm payment of $${amount} using Face ID`,
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });
      
      if (biometricAuth.success) {
        handlePayment();
      } else if (biometricAuth.error === 'user_cancel') {
        Alert.alert('Authentication Cancelled', 'Face ID authentication was cancelled. Please try again.');
      } else {
        Alert.alert('Authentication Failed', 'Face ID authentication failed. Please try again.');
      }
      */
    } catch (error) {
      console.error("Face ID authentication error:", error);
      Alert.alert(
        "Error",
        "There was an error with Face ID authentication. Please try again."
      );
    }
  };

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handlePay = () => {
    if (isFaceIDSupported) {
      handleBiometricAuth();
    } else {
      Alert.alert(
        "Face ID Not Available",
        "Your device does not support Face ID. Please use an alternative payment method.",
        [{ text: "OK" }]
      );
    }
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
          <Text className="text-white font-sans text-center text-lg">
            {isFaceIDSupported ? "Pay " : "Pay"}
          </Text>
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
              <View className="items-center">
                <Text className="text-7xl text-center mb-4">✔️</Text>
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

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Linking,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Share, Printer, X, ExternalLink } from "lucide-react-native";
import { WebView } from "react-native-webview";

const WALLET_ADDRESS = "0x37fcE72a7397E5FDdEe880F9AAafC26d0F751782";
const EXPLORER_BASE_URL = "https://testnet.explorer.ethena.fi/address/";

const transactions = [
  {
    id: "1",
    type: "Received",
    amount: "0.5 ETH",
    date: "2024-12-01",
    hash: "0x123...abc",
  },
  {
    id: "2",
    type: "Sent",
    amount: "0.2 ETH",
    date: "2024-11-30",
    hash: "0x456...def",
  },
  {
    id: "3",
    type: "Received",
    amount: "100 ALTURA",
    date: "2024-11-29",
    hash: "0x789...ghi",
  },
];

export default function Profile() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("");

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My Altura wallet address: ${WALLET_ADDRESS}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {
    // Implement print functionality here
    console.log("Print QR Code");
  };

  const openTransaction = (hash: string) => {
    const url = `${EXPLORER_BASE_URL}${WALLET_ADDRESS}`;
    setWebViewUrl(url);
    setShowWebView(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Rahul M</Text>
          <Text className="text-lg text-gray-600 mb-4">altura.id/rahul</Text>

          <TouchableOpacity
            onPress={() => setShowQRCode(true)}
            className="bg-purple-600 p-4 rounded-lg items-center mb-6"
          >
            <Text className="text-white font-semibold text-lg">
              Show QR Code
            </Text>
          </TouchableOpacity>

          <View className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <Text className="text-xl font-semibold mb-2">Wallet Balance</Text>
            <Text className="text-2xl font-bold text-purple-600">2.5 ETH</Text>
            <Text className="text-lg text-gray-600">≈ $4,250.00 USD</Text>
          </View>

          <View>
            <Text className="text-xl font-semibold mb-4">
              Recent Transactions
            </Text>
            {transactions.map((tx) => (
              <TouchableOpacity
                key={tx.id}
                className="flex-row justify-between items-center bg-white p-4 rounded-lg mb-3 shadow-sm"
                onPress={() => openTransaction(tx.hash)}
              >
                <View>
                  <Text className="font-semibold text-lg">{tx.type}</Text>
                  <Text className="text-gray-600">{tx.date}</Text>
                </View>
                <View className="items-end">
                  <Text
                    className={`text-lg ${
                      tx.type === "Received" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.type === "Received" ? "+" : "-"}
                    {tx.amount}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-gray-400 mr-1">{tx.hash}</Text>
                    <ExternalLink size={16} color="#9CA3AF" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal visible={showQRCode} transparent={true} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg items-center">
            <QRCode
              value={WALLET_ADDRESS}
              size={200}
              color="black"
              backgroundColor="white"
            />
            <Text className="mt-4 text-center text-gray-600">
              {WALLET_ADDRESS}
            </Text>
            <View className="flex-row justify-around w-full mt-6">
              <TouchableOpacity onPress={handleShare} className="items-center">
                <Share size={24} color="#4B5563" />
                <Text className="mt-1 text-gray-600">Share</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePrint} className="items-center">
                <Printer size={24} color="#4B5563" />
                <Text className="mt-1 text-gray-600">Print</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setShowQRCode(false)}
              className="mt-6 bg-gray-200 p-2 rounded-full"
            >
              <X size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showWebView} animationType="slide">
        <SafeAreaView className="flex-1">
          <View className="flex-row justify-between items-center p-4 bg-purple-600">
            <Text className="text-white font-semibold text-lg">
              Transaction Details
            </Text>
            <TouchableOpacity onPress={() => setShowWebView(false)}>
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          <WebView source={{ uri: webViewUrl }} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
